"""Contact-form email delivery via Microsoft Graph (OAuth 2.0 client credentials).

Two backends, selected with ``MAIL_BACKEND``:

* ``graph`` (default): POST https://graph.microsoft.com/v1.0/users/{MAIL_FROM}/sendMail
  authenticated with an app-only token from Entra ID. The token is cached in memory
  and refreshed shortly before it expires.
* ``log``: renders the message and writes it to the application log. For local
  development and tests, where no Entra ID secret is available.
"""

from __future__ import annotations

import asyncio
import html
import logging
import time
from typing import Any, Protocol

import httpx

from app.config import Settings
from app.schemas import ContactRequest

logger = logging.getLogger("gct.email")

GRAPH_SCOPE = "https://graph.microsoft.com/.default"
TOKEN_URL = "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token"
SENDMAIL_URL = "https://graph.microsoft.com/v1.0/users/{mailbox}/sendMail"

# Refresh the cached token this many seconds before Entra ID says it expires.
TOKEN_REFRESH_MARGIN_SECONDS = 300
# Longest Retry-After we are willing to honour before giving up on a 429.
MAX_RETRY_AFTER_SECONDS = 10.0
# Delay before the single retry on a 5xx (or a 429 without Retry-After).
DEFAULT_RETRY_DELAY_SECONDS = 1.0


class MailDeliveryError(Exception):
    """The message could not be handed over to the mail provider."""


# --------------------------------------------------------------------------- #
# Rendering
# --------------------------------------------------------------------------- #


def _render_body(payload: ContactRequest) -> tuple[str, str]:
    """Return (plain_text, html) representations of the contact submission.

    Every user-supplied value is HTML-escaped before being placed in the HTML body.
    """
    service = payload.service_interest or "—"
    company = payload.company or "—"

    text = (
        "Nuevo mensaje desde el formulario de contacto\n"
        "--------------------------------------------\n\n"
        f"Nombre:             {payload.name}\n"
        f"Email:              {payload.email}\n"
        f"Empresa:            {company}\n"
        f"Servicio de interés: {service}\n\n"
        "Mensaje:\n"
        f"{payload.message}\n"
    )

    esc = html.escape
    html_body = f"""\
<html>
  <body style="font-family: Arial, sans-serif; color: #07111f;">
    <h2 style="color:#F17D30; margin-bottom: 4px;">Nuevo mensaje de contacto</h2>
    <table cellpadding="6" style="border-collapse: collapse;">
      <tr><td style="font-weight:bold;">Nombre</td><td>{esc(payload.name)}</td></tr>
      <tr><td style="font-weight:bold;">Email</td><td>{esc(str(payload.email))}</td></tr>
      <tr><td style="font-weight:bold;">Empresa</td><td>{esc(company)}</td></tr>
      <tr><td style="font-weight:bold;">Servicio de interés</td><td>{esc(service)}</td></tr>
    </table>
    <p style="font-weight:bold; margin-bottom:4px;">Mensaje:</p>
    <p style="white-space: pre-wrap;">{esc(payload.message)}</p>
  </body>
</html>
"""
    return text, html_body


def build_graph_message(payload: ContactRequest, settings: Settings) -> dict[str, Any]:
    """Build the Graph ``message`` resource for a contact submission.

    ``replyTo`` carries the visitor's address so "Reply" in the inbox goes to them,
    while the message itself is sent from the ``MAIL_FROM`` mailbox.
    """
    _text, html_body = _render_body(payload)
    return {
        "subject": f"Nuevo contacto web — {payload.name}",
        "body": {"contentType": "HTML", "content": html_body},
        "from": {
            "emailAddress": {"address": settings.mail_from, "name": settings.mail_from_name},
        },
        "toRecipients": [{"emailAddress": {"address": settings.mail_to}}],
        "replyTo": [{"emailAddress": {"address": str(payload.email), "name": payload.name}}],
    }


# --------------------------------------------------------------------------- #
# Backends
# --------------------------------------------------------------------------- #


class Mailer(Protocol):
    async def send(self, payload: ContactRequest) -> None: ...

    async def aclose(self) -> None: ...


class LogMailer:
    """Development backend: logs the rendered message instead of sending it."""

    def __init__(self, settings: Settings) -> None:
        self._settings = settings
        logger.warning("MAIL_BACKEND=log: los correos NO se envían, solo se registran en el log.")

    async def send(self, payload: ContactRequest) -> None:
        text, _html = _render_body(payload)
        logger.info(
            "Correo NO enviado (MAIL_BACKEND=log). From=%s To=%s Reply-To=%s\n%s",
            self._settings.mail_from,
            self._settings.mail_to,
            payload.email,
            text,
        )

    async def aclose(self) -> None:  # nothing to release
        return None


class GraphMailer:
    """Sends mail through Microsoft Graph using the client credentials grant."""

    def __init__(
        self,
        settings: Settings,
        transport: httpx.AsyncBaseTransport | None = None,
    ) -> None:
        self._settings = settings
        timeout = httpx.Timeout(settings.graph_timeout_seconds, connect=5.0)
        self._client = httpx.AsyncClient(timeout=timeout, transport=transport)
        self._token: str | None = None
        self._token_expires_at = 0.0
        self._token_lock = asyncio.Lock()

    async def aclose(self) -> None:
        await self._client.aclose()

    # -- token ------------------------------------------------------------- #

    def _token_is_valid(self) -> bool:
        return self._token is not None and time.monotonic() < self._token_expires_at

    async def _get_token(self, *, force_refresh: bool = False) -> str:
        async with self._token_lock:
            if force_refresh or not self._token_is_valid():
                await self._fetch_token()
            assert self._token is not None
            return self._token

    async def _fetch_token(self) -> None:
        url = TOKEN_URL.format(tenant=self._settings.graph_tenant_id)
        data = {
            "client_id": self._settings.graph_client_id,
            "client_secret": self._settings.graph_client_secret.get_secret_value(),
            "scope": GRAPH_SCOPE,
            "grant_type": "client_credentials",
        }
        try:
            resp = await self._client.post(url, data=data)
        except httpx.HTTPError as exc:
            raise MailDeliveryError(f"Token request failed: {type(exc).__name__}") from exc

        if resp.status_code != 200:
            # Only the error code is logged; error_description may include details
            # about the app registration that we don't want in logs.
            code = _json_field(resp, "error") or "unknown"
            raise MailDeliveryError(f"Token request rejected: HTTP {resp.status_code} ({code})")

        body = resp.json()
        expires_in = int(body.get("expires_in", 3600))
        self._token = body["access_token"]
        self._token_expires_at = time.monotonic() + expires_in - TOKEN_REFRESH_MARGIN_SECONDS
        logger.info("Graph token acquired (expires in %ss)", expires_in)

    # -- send -------------------------------------------------------------- #

    async def _post_send_mail(self, url: str, body: dict[str, Any], token: str) -> httpx.Response:
        try:
            return await self._client.post(
                url, json=body, headers={"Authorization": f"Bearer {token}"}
            )
        except httpx.HTTPError as exc:
            raise MailDeliveryError(f"sendMail request failed: {type(exc).__name__}") from exc

    async def send(self, payload: ContactRequest) -> None:
        url = SENDMAIL_URL.format(mailbox=self._settings.mail_from)
        body = {"message": build_graph_message(payload, self._settings), "saveToSentItems": True}

        force_refresh = False
        resp: httpx.Response | None = None
        for attempt in (1, 2):
            token = await self._get_token(force_refresh=force_refresh)
            resp = await self._post_send_mail(url, body, token)

            if resp.status_code == 202:
                logger.info("Email sent via Graph to %s (request-id=%s)",
                            self._settings.mail_to, resp.headers.get("request-id"))
                return
            if attempt == 2:
                break

            # Decide whether a single retry is worthwhile.
            if resp.status_code == 401:
                force_refresh = True  # cached token rejected: get a fresh one
                continue
            delay = _retry_delay(resp)
            if delay is None:
                break  # 4xx configuration errors are not retried
            logger.warning("Graph sendMail returned %s; retrying in %.1fs", resp.status_code, delay)
            await asyncio.sleep(delay)

        assert resp is not None
        raise MailDeliveryError(_describe_failure(resp))


def _retry_delay(resp: httpx.Response) -> float | None:
    """Seconds to wait before retrying, or None if the response is not retryable."""
    if resp.status_code == 429:
        header = resp.headers.get("Retry-After")
        try:
            delay = float(header) if header is not None else DEFAULT_RETRY_DELAY_SECONDS
        except ValueError:
            delay = DEFAULT_RETRY_DELAY_SECONDS
        return delay if delay <= MAX_RETRY_AFTER_SECONDS else None
    if resp.status_code >= 500:
        return DEFAULT_RETRY_DELAY_SECONDS
    return None


def _json_field(resp: httpx.Response, *path: str) -> str | None:
    try:
        value: Any = resp.json()
    except ValueError:
        return None
    for key in path:
        if not isinstance(value, dict):
            return None
        value = value.get(key)
    return value if isinstance(value, str) else None


def _describe_failure(resp: httpx.Response) -> str:
    code = _json_field(resp, "error", "code") or "unknown"
    message = _json_field(resp, "error", "message") or ""
    request_id = resp.headers.get("request-id", "-")
    return f"Graph sendMail failed: HTTP {resp.status_code} {code} {message} (request-id={request_id})"


# --------------------------------------------------------------------------- #
# Entry point used by the router
# --------------------------------------------------------------------------- #

_mailer: Mailer | None = None


def get_mailer(settings: Settings) -> Mailer:
    """Return the process-wide mailer, creating it on first use."""
    global _mailer
    if _mailer is None:
        _mailer = LogMailer(settings) if settings.mail_backend == "log" else GraphMailer(settings)
    return _mailer


async def close_mailer() -> None:
    global _mailer
    if _mailer is not None:
        await _mailer.aclose()
        _mailer = None


async def send_contact_email(payload: ContactRequest, settings: Settings) -> None:
    """Send the contact submission. Raises MailDeliveryError on failure."""
    logger.info("Sending contact email for %s", payload.email)
    await get_mailer(settings).send(payload)

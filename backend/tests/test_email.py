"""Unit tests for the Microsoft Graph mailer. No network: httpx.MockTransport."""

import logging

import httpx
import pytest
from pydantic import ValidationError

from app import email as email_module
from app.config import Settings
from app.email import (
    GraphMailer,
    LogMailer,
    MailDeliveryError,
    build_graph_message,
    send_contact_email,
)
from app.schemas import ContactRequest

PAYLOAD = ContactRequest(
    name="Ada Lovelace",
    email="ada@example.com",
    company="Analytical Engines",
    serviceInterest="migracion-transformacion-sap",
    message="Quisiera coordinar una evaluación de migración a S/4HANA.",
)


def make_settings(**overrides) -> Settings:
    values = dict(
        mail_backend="graph",
        graph_tenant_id="tenant-id",
        graph_client_id="client-id",
        graph_client_secret="test-secret",
        mail_from="no-reply@gctechs.com",
        mail_from_name="Global Core Technologies",
        mail_to="info@gctechs.com",
    )
    values.update(overrides)
    return Settings(_env_file=None, **values)


class FakeGraph:
    """Answers the token endpoint and sendMail; records every request."""

    def __init__(self, send_responses: list[httpx.Response] | None = None) -> None:
        self.requests: list[httpx.Request] = []
        self.token_calls = 0
        self._send_responses = list(send_responses or [])

    def handler(self, request: httpx.Request) -> httpx.Response:
        self.requests.append(request)
        if request.url.host == "login.microsoftonline.com":
            self.token_calls += 1
            return httpx.Response(
                200,
                json={"token_type": "Bearer", "expires_in": 3599, "access_token": f"tok-{self.token_calls}"},
            )
        if self._send_responses:
            return self._send_responses.pop(0)
        return httpx.Response(202)

    @property
    def send_requests(self) -> list[httpx.Request]:
        return [r for r in self.requests if r.url.host == "graph.microsoft.com"]


@pytest.fixture(autouse=True)
def no_retry_sleep(monkeypatch):
    monkeypatch.setattr(email_module, "DEFAULT_RETRY_DELAY_SECONDS", 0.0)


def mailer_for(fake: FakeGraph, settings: Settings | None = None) -> GraphMailer:
    return GraphMailer(settings or make_settings(), transport=httpx.MockTransport(fake.handler))


# --------------------------------------------------------------------------- #
# Message construction
# --------------------------------------------------------------------------- #


def test_message_preserves_reply_to_and_addressing():
    msg = build_graph_message(PAYLOAD, make_settings())

    assert msg["replyTo"] == [{"emailAddress": {"address": "ada@example.com", "name": "Ada Lovelace"}}]
    assert msg["toRecipients"] == [{"emailAddress": {"address": "info@gctechs.com"}}]
    assert msg["from"]["emailAddress"] == {
        "address": "no-reply@gctechs.com",
        "name": "Global Core Technologies",
    }
    assert "Ada Lovelace" in msg["subject"]
    assert msg["body"]["contentType"] == "HTML"


def test_html_body_escapes_user_input():
    hostile = ContactRequest(
        name='<script>alert("x")</script>',
        email="eve@example.com",
        company="Tom & Jerry <Ltd>",
        serviceInterest="<img src=x onerror=alert(1)>",
        message="Hola <b>mundo</b> & chau",
    )
    content = build_graph_message(hostile, make_settings())["body"]["content"]

    assert "<script>" not in content
    assert "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;" in content
    assert "Tom &amp; Jerry &lt;Ltd&gt;" in content
    assert "<img" not in content
    assert "Hola &lt;b&gt;mundo&lt;/b&gt; &amp; chau" in content


# --------------------------------------------------------------------------- #
# Sending
# --------------------------------------------------------------------------- #


async def test_send_success_calls_token_then_sendmail():
    fake = FakeGraph()
    mailer = mailer_for(fake)

    await mailer.send(PAYLOAD)

    token_req, send_req = fake.requests
    assert token_req.url == "https://login.microsoftonline.com/tenant-id/oauth2/v2.0/token"
    form = dict(pair.split("=", 1) for pair in token_req.content.decode().split("&"))
    assert form["grant_type"] == "client_credentials"
    assert form["client_id"] == "client-id"
    assert form["client_secret"] == "test-secret"
    assert form["scope"] == "https%3A%2F%2Fgraph.microsoft.com%2F.default"

    assert send_req.url == "https://graph.microsoft.com/v1.0/users/no-reply@gctechs.com/sendMail"
    assert send_req.headers["Authorization"] == "Bearer tok-1"
    assert send_req.headers["Content-Type"] == "application/json"
    body = httpx.Response(200, content=send_req.content).json()
    assert body["saveToSentItems"] is True
    assert body["message"]["replyTo"][0]["emailAddress"]["address"] == "ada@example.com"


async def test_token_is_cached_between_sends():
    fake = FakeGraph()
    mailer = mailer_for(fake)

    await mailer.send(PAYLOAD)
    await mailer.send(PAYLOAD)

    assert fake.token_calls == 1
    assert len(fake.send_requests) == 2


async def test_concurrent_sends_fetch_token_once():
    import asyncio

    fake = FakeGraph()
    mailer = mailer_for(fake)

    await asyncio.gather(*(mailer.send(PAYLOAD) for _ in range(5)))

    assert fake.token_calls == 1
    assert len(fake.send_requests) == 5


async def test_expired_token_is_refreshed():
    fake = FakeGraph()
    mailer = mailer_for(fake)

    await mailer.send(PAYLOAD)
    mailer._token_expires_at = 0.0  # simulate expiry
    await mailer.send(PAYLOAD)

    assert fake.token_calls == 2
    assert fake.send_requests[-1].headers["Authorization"] == "Bearer tok-2"


async def test_401_refreshes_token_and_retries_once():
    unauthorized = httpx.Response(
        401, json={"error": {"code": "InvalidAuthenticationToken", "message": "expired"}}
    )
    fake = FakeGraph(send_responses=[unauthorized])
    mailer = mailer_for(fake)

    await mailer.send(PAYLOAD)

    assert fake.token_calls == 2
    assert [r.headers["Authorization"] for r in fake.send_requests] == ["Bearer tok-1", "Bearer tok-2"]


async def test_403_is_not_retried():
    denied = httpx.Response(
        403,
        json={"error": {"code": "ErrorAccessDenied", "message": "Access is denied."}},
        headers={"request-id": "req-123"},
    )
    fake = FakeGraph(send_responses=[denied, httpx.Response(202)])
    mailer = mailer_for(fake)

    with pytest.raises(MailDeliveryError) as exc_info:
        await mailer.send(PAYLOAD)

    assert len(fake.send_requests) == 1
    assert "403" in str(exc_info.value)
    assert "ErrorAccessDenied" in str(exc_info.value)
    assert "req-123" in str(exc_info.value)


async def test_404_is_not_retried():
    fake = FakeGraph(send_responses=[httpx.Response(404, json={"error": {"code": "ResourceNotFound"}})])
    mailer = mailer_for(fake)

    with pytest.raises(MailDeliveryError):
        await mailer.send(PAYLOAD)
    assert len(fake.send_requests) == 1


async def test_429_with_short_retry_after_is_retried():
    throttled = httpx.Response(429, headers={"Retry-After": "0"})
    fake = FakeGraph(send_responses=[throttled])
    mailer = mailer_for(fake)

    await mailer.send(PAYLOAD)

    assert len(fake.send_requests) == 2


async def test_429_with_long_retry_after_gives_up():
    throttled = httpx.Response(429, headers={"Retry-After": "120"})
    fake = FakeGraph(send_responses=[throttled])
    mailer = mailer_for(fake)

    with pytest.raises(MailDeliveryError):
        await mailer.send(PAYLOAD)
    assert len(fake.send_requests) == 1


async def test_5xx_is_retried_once_then_fails():
    fake = FakeGraph(send_responses=[httpx.Response(503), httpx.Response(503), httpx.Response(202)])
    mailer = mailer_for(fake)

    with pytest.raises(MailDeliveryError) as exc_info:
        await mailer.send(PAYLOAD)

    assert len(fake.send_requests) == 2
    assert "503" in str(exc_info.value)


async def test_timeout_raises_mail_delivery_error():
    def handler(request: httpx.Request) -> httpx.Response:
        if request.url.host == "login.microsoftonline.com":
            return httpx.Response(200, json={"access_token": "tok", "expires_in": 3599})
        raise httpx.ReadTimeout("timed out", request=request)

    mailer = GraphMailer(make_settings(), transport=httpx.MockTransport(handler))

    with pytest.raises(MailDeliveryError) as exc_info:
        await mailer.send(PAYLOAD)
    assert "ReadTimeout" in str(exc_info.value)


async def test_token_endpoint_error_does_not_leak_secret():
    def handler(request: httpx.Request) -> httpx.Response:
        return httpx.Response(
            401,
            json={"error": "invalid_client", "error_description": "AADSTS7000215: Invalid client secret"},
        )

    mailer = GraphMailer(make_settings(), transport=httpx.MockTransport(handler))

    with pytest.raises(MailDeliveryError) as exc_info:
        await mailer.send(PAYLOAD)

    text = str(exc_info.value)
    assert "invalid_client" in text
    assert "test-secret" not in text
    assert "AADSTS7000215" not in text


# --------------------------------------------------------------------------- #
# Log backend and entry point
# --------------------------------------------------------------------------- #


async def test_log_backend_does_not_send_and_logs_message(caplog):
    settings = make_settings(mail_backend="log", graph_tenant_id="", graph_client_id="", graph_client_secret="")
    mailer = LogMailer(settings)

    with caplog.at_level(logging.INFO, logger="gct.email"):
        await mailer.send(PAYLOAD)

    assert "ada@example.com" in caplog.text
    assert "Quisiera coordinar" in caplog.text


async def test_send_contact_email_uses_configured_backend(monkeypatch):
    monkeypatch.setattr(email_module, "_mailer", None)
    fake = FakeGraph()
    settings = make_settings()
    monkeypatch.setattr(
        email_module,
        "GraphMailer",
        lambda s: GraphMailer(s, transport=httpx.MockTransport(fake.handler)),
    )

    await send_contact_email(PAYLOAD, settings)

    assert len(fake.send_requests) == 1
    await email_module.close_mailer()
    assert email_module._mailer is None


# --------------------------------------------------------------------------- #
# Settings validation
# --------------------------------------------------------------------------- #


def test_graph_backend_requires_credentials(monkeypatch):
    for var in ("GRAPH_TENANT_ID", "GRAPH_CLIENT_ID", "GRAPH_CLIENT_SECRET"):
        monkeypatch.delenv(var, raising=False)

    with pytest.raises(ValidationError) as exc_info:
        Settings(_env_file=None, mail_backend="graph")

    text = str(exc_info.value)
    assert "GRAPH_TENANT_ID" in text and "GRAPH_CLIENT_ID" in text and "GRAPH_CLIENT_SECRET" in text


def test_log_backend_needs_no_credentials():
    settings = Settings(_env_file=None, mail_backend="log")
    assert settings.mail_backend == "log"


def test_secret_is_not_exposed_in_repr():
    settings = make_settings()
    assert "test-secret" not in repr(settings)

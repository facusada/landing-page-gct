from email.message import EmailMessage

import aiosmtplib

from app.config import Settings
from app.schemas import ContactRequest


def _render_body(payload: ContactRequest) -> tuple[str, str]:
    """Return (plain_text, html) representations of the contact submission."""
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

    html = f"""\
<html>
  <body style="font-family: Arial, sans-serif; color: #07111f;">
    <h2 style="color:#F17D30; margin-bottom: 4px;">Nuevo mensaje de contacto</h2>
    <table cellpadding="6" style="border-collapse: collapse;">
      <tr><td style="font-weight:bold;">Nombre</td><td>{payload.name}</td></tr>
      <tr><td style="font-weight:bold;">Email</td><td>{payload.email}</td></tr>
      <tr><td style="font-weight:bold;">Empresa</td><td>{company}</td></tr>
      <tr><td style="font-weight:bold;">Servicio de interés</td><td>{service}</td></tr>
    </table>
    <p style="font-weight:bold; margin-bottom:4px;">Mensaje:</p>
    <p style="white-space: pre-wrap;">{payload.message}</p>
  </body>
</html>
"""
    return text, html


def build_message(payload: ContactRequest, settings: Settings) -> EmailMessage:
    msg = EmailMessage()
    msg["From"] = f"{settings.mail_from_name} <{settings.mail_from}>"
    msg["To"] = settings.mail_to
    msg["Reply-To"] = str(payload.email)
    msg["Subject"] = f"Nuevo contacto web — {payload.name}"

    text, html = _render_body(payload)
    msg.set_content(text)
    msg.add_alternative(html, subtype="html")
    return msg


async def send_contact_email(payload: ContactRequest, settings: Settings) -> None:
    """Send the contact submission via SMTP. Raises on failure."""
    import logging
    logger = logging.getLogger("gct.email")

    logger.info("Building email message for %s", payload.email)
    message = build_message(payload, settings)

    logger.info("Connecting to SMTP: %s:%d (tls=%s, ssl=%s)",
                settings.smtp_host, settings.smtp_port,
                settings.smtp_use_tls, settings.smtp_use_ssl)

    await aiosmtplib.send(
        message,
        hostname=settings.smtp_host,
        port=settings.smtp_port,
        username=settings.smtp_user or None,
        password=settings.smtp_password or None,
        start_tls=settings.smtp_use_tls,
        use_tls=settings.smtp_use_ssl,
    )
    logger.info("Email sent successfully to %s", settings.mail_to)

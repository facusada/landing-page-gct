import logging
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status

from app.config import Settings, get_settings
from app.email import send_contact_email
from app.schemas import ContactRequest, ContactResponse

router = APIRouter(prefix="/api", tags=["contact"])
logger = logging.getLogger("gct.contact")

SettingsDep = Annotated[Settings, Depends(get_settings)]


@router.post(
    "/contact",
    response_model=ContactResponse,
    status_code=status.HTTP_202_ACCEPTED,
)
async def submit_contact(payload: ContactRequest, settings: SettingsDep) -> ContactResponse:
    # Honeypot: silently accept bot submissions without sending anything.
    if payload.website:
        logger.info("Honeypot triggered; dropping submission from %s", payload.email)
        return ContactResponse(ok=True, message="Mensaje recibido.")

    try:
        await send_contact_email(payload, settings)
    except Exception:  # noqa: BLE001 — surface a clean error to the client, log details
        logger.exception("Failed to send contact email")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="No se pudo enviar el mensaje. Intentá nuevamente más tarde.",
        )

    return ContactResponse(ok=True, message="Mensaje enviado correctamente.")

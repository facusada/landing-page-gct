import httpx
import pytest

from app import email as email_module
from app.main import app

VALID_PAYLOAD = {
    "name": "Ada Lovelace",
    "email": "ada@example.com",
    "company": "Analytical Engines",
    "serviceInterest": "migracion-transformacion-sap",
    "message": "Quisiera coordinar una evaluación de migración a S/4HANA.",
}


@pytest.fixture
def client() -> httpx.AsyncClient:
    transport = httpx.ASGITransport(app=app)
    return httpx.AsyncClient(transport=transport, base_url="http://test")


@pytest.fixture(autouse=True)
def stub_email(monkeypatch):
    """Capture sent emails instead of hitting a real SMTP server."""
    sent: list = []

    async def fake_send(payload, settings):
        sent.append(payload)

    monkeypatch.setattr(email_module, "send_contact_email", fake_send)
    # router imports the symbol directly, patch there too
    from app.routers import contact as contact_router

    monkeypatch.setattr(contact_router, "send_contact_email", fake_send)
    return sent


async def test_health(client):
    async with client:
        res = await client.get("/health")
    assert res.status_code == 200
    assert res.json() == {"status": "ok"}


async def test_contact_success(client, stub_email):
    async with client:
        res = await client.post("/api/contact", json=VALID_PAYLOAD)
    assert res.status_code == 202
    body = res.json()
    assert body["ok"] is True
    assert len(stub_email) == 1
    assert stub_email[0].email == "ada@example.com"


async def test_contact_validation_error(client):
    async with client:
        res = await client.post("/api/contact", json={"name": "x", "email": "nope", "message": "short"})
    assert res.status_code == 422


async def test_honeypot_is_silently_accepted(client, stub_email):
    payload = {**VALID_PAYLOAD, "website": "http://spam.example"}
    async with client:
        res = await client.post("/api/contact", json=payload)
    assert res.status_code == 202
    assert res.json()["ok"] is True
    # honeypot triggered -> no email sent
    assert len(stub_email) == 0

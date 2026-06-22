# GCT Landing — Backend

API en FastAPI para el formulario de contacto del sitio. No usa base de datos:
recibe el formulario, lo valida y lo reenvía por email vía SMTP.

## Stack

- FastAPI + Pydantic V2
- `aiosmtplib` para envío async de correo
- `pydantic-settings` para configuración por entorno

## Desarrollo local

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt

cp .env.example .env   # ya viene apuntado a MailHog (modo test)

uvicorn app.main:app --reload --port 8000
```

- Docs interactivas: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Modo test con MailHog (sin enviar correos reales)

En desarrollo no se envían emails de verdad: se usa **MailHog**, un servidor
SMTP falso que captura los mensajes y los muestra en una web UI.

**Opción A — todo con Docker:**

```bash
# desde la raíz del repo
docker compose -f docker-compose.dev.yml up --build
```

Levanta MailHog + el backend ya apuntado a él. Bandeja de entrada en
http://localhost:8025

**Opción B — backend con uvicorn + MailHog en Docker:**

```bash
docker run -d -p 1025:1025 -p 8025:8025 mailhog/mailhog
```

El `.env` ya apunta a `localhost:1025`, así que `uvicorn` enviará a MailHog.

Cuando se pase a producción, completar las credenciales SMTP reales en `.env`
(ver la sección "MODO PRODUCCIÓN" en `.env.example`).

## Tests

```bash
pytest
```

Los tests mockean el envío SMTP (no se manda correo real).

## Endpoint

### `POST /api/contact`

Request body:

```json
{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines",
  "serviceInterest": "migracion-transformacion-sap",
  "message": "Quisiera coordinar una evaluación de migración."
}
```

- `202 Accepted` → `{ "ok": true, "message": "..." }`
- `422` → error de validación
- `502` → falla al enviar el correo

El campo opcional `website` es un *honeypot* anti-spam: si llega con contenido,
la API responde `202` pero no envía nada.

## Variables de entorno

Ver `.env.example`. Las clave son las de SMTP (`SMTP_HOST`, `SMTP_PORT`,
`SMTP_USER`, `SMTP_PASSWORD`, `SMTP_USE_TLS`/`SMTP_USE_SSL`), las direcciones
(`MAIL_FROM`, `MAIL_TO`) y `ALLOWED_ORIGINS` para CORS.

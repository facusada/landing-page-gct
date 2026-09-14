# GCT Landing — Backend

API en FastAPI para el formulario de contacto del sitio. No usa base de datos:
recibe el formulario, lo valida y lo reenvía por email a través de
**Microsoft Graph** (`POST /users/{buzón}/sendMail`) autenticándose con
OAuth 2.0 *client credentials* contra Entra ID.

## Stack

- FastAPI + Pydantic V2
- `httpx` para llamar a Entra ID (token) y Microsoft Graph (sendMail)
- `pydantic-settings` para configuración por entorno

## Desarrollo local

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-dev.txt

cp .env.example .env   # ya viene con MAIL_BACKEND=log (no envía correos)

uvicorn app.main:app --reload --port 8000
```

- Docs interactivas: http://localhost:8000/docs
- Health check: http://localhost:8000/health

## Modo log (sin enviar correos reales)

Con `MAIL_BACKEND=log` el backend **no envía nada**: renderiza el correo y lo
escribe en el log del proceso (From, To, Reply-To y el cuerpo en texto). Sirve
para desarrollar el frontend y correr la API sin credenciales de Entra ID.

**Todo con Docker:**

```bash
# desde la raíz del repo
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.dev.yml logs -f landing-api
```

## Envío real por Microsoft Graph

Requiere una App Registration en Entra ID con el permiso
**Microsoft Graph → Mail.Send (Application)** y admin consent
(`gctechs-landing-mailer`), y que `MAIL_FROM` sea el UPN de un **buzón real**
de Exchange Online (un buzón compartido alcanza; un alias no resuelve).

Flujo por cada envío:

1. `POST https://login.microsoftonline.com/{GRAPH_TENANT_ID}/oauth2/v2.0/token`
   con `grant_type=client_credentials` y `scope=https://graph.microsoft.com/.default`.
   El token se cachea en memoria y se renueva 5 minutos antes de vencer.
2. `POST https://graph.microsoft.com/v1.0/users/{MAIL_FROM}/sendMail` con el
   mensaje en JSON: cuerpo HTML, `toRecipients=MAIL_TO` y `replyTo` con el
   email que cargó el visitante (así "Responder" va al visitante).

Manejo de errores: timeout de lectura configurable (`GRAPH_TIMEOUT_SECONDS`,
20s por defecto) y un único reintento ante 401 (token renovado), 429 (respeta
`Retry-After` hasta 10s) o 5xx. Los 400/403/404 no se reintentan: son errores
de configuración. Cualquier falla llega al endpoint como `502`.

### Probar el envío real desde local

El secret vive **solo** en `backend/.env` (gitignored). Nunca lo pases por
línea de comandos ni lo commitees.

```bash
# backend/.env
MAIL_BACKEND=graph
GRAPH_TENANT_ID=...
GRAPH_CLIENT_ID=...
GRAPH_CLIENT_SECRET=...
chmod 600 backend/.env
```

Con `uvicorn` (lee `.env` del directorio actual) o con Docker montando ese
archivo como `env_file`:

```bash
docker run --rm -p 8000:8000 --env-file backend/.env \
  $(docker build -q backend)
```

Y desde otra terminal:

```bash
curl -sS -X POST http://localhost:8000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Prueba Graph","email":"tu-mail@example.com","message":"Prueba de envío por Microsoft Graph desde local."}'
```

Verificar que el correo llegue a `MAIL_TO`, que "Responder" apunte a
`tu-mail@example.com` y que quede copia en *Enviados* del buzón `MAIL_FROM`.

## Tests

```bash
pytest
```

Los tests no tocan la red: el mailer de Graph se prueba con
`httpx.MockTransport` y el endpoint con el envío stubeado. `tests/conftest.py`
fuerza `MAIL_BACKEND=log` para que la suite no dependa de un `.env` local.

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

Ver `.env.example`. Las claves son `MAIL_BACKEND` (`graph` | `log`), las de
Graph (`GRAPH_TENANT_ID`, `GRAPH_CLIENT_ID`, `GRAPH_CLIENT_SECRET`,
`GRAPH_TIMEOUT_SECONDS`), las direcciones (`MAIL_FROM`, `MAIL_FROM_NAME`,
`MAIL_TO`) y `ALLOWED_ORIGINS` para CORS.

Las variables `SMTP_*` de la versión anterior ya no se usan; si quedan en un
`.env` viejo se ignoran.

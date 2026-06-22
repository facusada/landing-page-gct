# Deploy — Landing GCT

Guía de despliegue del sitio (`frontend/`, Nuxt) y la API de contacto
(`backend/`, FastAPI) en la VM `gct-vm`.

## Arquitectura en el servidor

- El repo vive en `/etc/GlobalCore/landing-page` (path del pipeline).
- Dos servicios definidos en `docker-compose.yml`:
  - `landing-page` (contenedor `gct-landing`) — sitio Nuxt.
  - `landing-api` (contenedor `gct-landing-api`) — API FastAPI.
- Ambos se conectan a la red Docker externa `nginx_red_compartida` y se
  resuelven **por nombre de contenedor** (no usan IPs fijas).
- `nginx` (reverse proxy) rutea el tráfico público hacia los contenedores
  por su nombre dentro de esa red.
- El backend envía los correos del formulario por SMTP. En modo test usa el
  contenedor `mailhog` que ya corre en la misma red.

```
navegador ──> nginx ──┬─> gct-landing:<port>        (sitio)
                      └─> gct-landing-api:8000/api/  (formulario)
                                  └─> SMTP (mailhog en test)
```

## Deploy automático (Azure Pipelines)

`azure-pipelines.yml` dispara en cada push a `main`:

1. `git pull origin main`
2. Verifica que existan los archivos de entorno (`.env` y `backend/.env`).
   Si falta alguno, corta con un error claro (no deja el deploy a medias).
3. `docker compose up --build -d --remove-orphans`
4. `docker image prune -f` (limpia imágenes colgadas).

No hay que correr nada a mano salvo el setup inicial de los archivos de
entorno (abajo), que viven en el servidor y son gitignored.

## Setup inicial en el servidor (una sola vez)

Los archivos de entorno NO están en git. Hay que crearlos en la VM.

### 1. `.env` (raíz) — orquestación + frontend

Ver `.env.example` para la lista de claves. En la VM debe contener, además
de las de puertos/SEO ya existentes, la URL pública de la API:

```bash
cd /etc/GlobalCore/landing-page
echo 'NUXT_PUBLIC_API_BASE=https://landing.gctechs.com' >> .env
```

> `NUXT_PUBLIC_API_BASE` es la URL **pública** (la usa el navegador). Es el
> mismo dominio del sitio; nginx se encarga de rutear `/api/` al backend.

### 2. `backend/.env` — configuración de la API

Copiar del ejemplo y completar:

```bash
cp backend/.env.example backend/.env
# editar backend/.env
```

**Modo test (MailHog en la VM)** — captura los correos, no los entrega:

```
APP_ENV=production
SMTP_HOST=mailhog
SMTP_PORT=1025
SMTP_USE_TLS=false
SMTP_USE_SSL=false
MAIL_FROM=no-reply@<dominio>
MAIL_TO=<casilla-destino>
ALLOWED_ORIGINS=https://landing.gctechs.com
```

**Modo producción** — completar con un SMTP real (host, usuario, contraseña
y TLS/SSL según el proveedor; ver la sección "MODO PRODUCCIÓN" en
`backend/.env.example`). Sin esto, los mensajes quedan atrapados en MailHog
y no llegan a la casilla real.

### 3. nginx — ruteo de la API

En el `server` de `landing.gctechs.com`, agregar un location para la API:

```nginx
location /api/ {
    proxy_pass http://gct-landing-api:8000;   # SIN barra final: preserva /api/...
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Recargar nginx luego de validar: `nginx -t && nginx -s reload`.

## Verificación post-deploy

```bash
# Contenedores arriba
docker ps | grep gct-landing        # gct-landing y gct-landing-api

# Health del backend (desde la VM)
docker exec gct-landing-api \
  python -c "import urllib.request; print(urllib.request.urlopen('http://localhost:8000/health').read())"

# Logs
docker compose logs -f landing-api
```

Probar el formulario desde el sitio y, en modo test, revisar que el mensaje
aparezca en la web UI de MailHog (puerto 8025).

## Encontrar el proyecto en la VM

Si no recordás el path, se obtiene del contenedor en ejecución:

```bash
docker inspect gct-landing \
  --format '{{ index .Config.Labels "com.docker.compose.project.working_dir" }}'
```

## Desarrollo local

- Frontend: `cd frontend && pnpm install && pnpm dev` (usa `frontend/.env`).
- Backend: ver `backend/README.md` (incluye MailHog vía
  `docker-compose.dev.yml`).

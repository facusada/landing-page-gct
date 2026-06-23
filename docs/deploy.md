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
3. `docker compose up --build -d --wait --remove-orphans`
   El flag `--wait` espera a que el contenedor pase el healthcheck antes de
   devolver: la versión vieja sigue sirviendo hasta que la nueva está lista.
4. `docker cp gct-landing:/app/.output/public/.` → `/etc/GlobalCore/landing-static`
   Extrae los estáticos al host para que **nginx los sirva directamente**.
5. `docker image prune -f` (limpia imágenes colgadas).

No hay que correr nada a mano salvo el setup inicial de los archivos de
entorno y de nginx (abajo), que viven en el servidor.

## Estáticos servidos por nginx (logos, _nuxt, etc.)

Antes, **todos** los assets (logos de clientes, JS/CSS hasheado de Nuxt) los
servía el contenedor Node. Si ese contenedor se reiniciaba o crasheaba (deploy,
OOM), los assets quedaban temporalmente inaccesibles y se veían rotos de forma
intermitente.

Ahora el deploy copia `.output/public` a `/etc/GlobalCore/landing-static` en el
host, y **nginx sirve los archivos desde ahí**. Si existe el archivo, lo
entrega nginx (rápido, y disponible aunque Nuxt esté caído); si no existe (rutas
SSR), cae al proxy hacia Nuxt. Ver el bloque de config nginx más abajo.

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

### 3. nginx — ruteo de la API + estáticos

nginx corre como contenedor en la red `nginx_red_compartida`. Necesita dos
cosas: (a) ver el directorio de estáticos del host por bind-mount, y (b) los
location blocks que sirven los estáticos y rutean la API.

**(a) Bind-mount del directorio de estáticos en el contenedor nginx.**
En la definición del contenedor nginx (su propio `docker-compose.yml` o el
`docker run`, fuera de este repo) agregar el volumen de sólo lectura:

```yaml
volumes:
  - /etc/GlobalCore/landing-static:/usr/share/nginx/landing-static:ro
```

Recrear el contenedor nginx para que tome el volumen (`docker compose up -d`
en el proyecto de nginx, o `docker run` con el `-v ...:ro` agregado).

**(b) Config del `server` de `landing.gctechs.com`:**

```nginx
# API → backend FastAPI (SIN barra final: preserva /api/...)
location /api/ {
    proxy_pass http://gct-landing-api:8000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Assets hasheados de Nuxt → servidos por nginx, cache larga e inmutable
location /_nuxt/ {
    root /usr/share/nginx/landing-static;
    expires 1y;
    add_header Cache-Control "public, immutable";
    access_log off;
}

# Resto: si el archivo existe en disco (logos, favicon, og-image), lo sirve
# nginx; si no (rutas SSR como /en, /servicios/...), cae al proxy hacia Nuxt.
location / {
    root /usr/share/nginx/landing-static;
    try_files $uri @ssr;
}

location @ssr {
    proxy_pass http://gct-landing:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

Validar y recargar: `nginx -t && nginx -s reload`.

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

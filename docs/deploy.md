# Deploy — Landing GCT

Guía de despliegue del sitio (`frontend/`, Nuxt) y la API de contacto
(`backend/`, FastAPI) en la VM `gct-vm`.

## Arquitectura en el servidor

- El repo vive en `/home/azuredevops/landing-page`.
- Dos servicios definidos en `docker-compose.yml`:
  - `landing-page` (contenedor `gct-landing`) — sitio Nuxt.
  - `landing-api` (contenedor `gct-landing-api`) — API FastAPI.
- Ambos se conectan a la red Docker externa `nginx_red_compartida` y se
  resuelven **por nombre de contenedor** (no usan IPs fijas).
- `nginx` (reverse proxy) rutea el tráfico público hacia los contenedores
  por su nombre dentro de esa red.
- El backend envía los correos del formulario por **Microsoft Graph**
  (`POST /users/no-reply@gctechs.com/sendMail`) con OAuth 2.0 client
  credentials. Con `MAIL_BACKEND=log` no envía: escribe el correo en el log.

```
navegador ──> nginx ──┬─> gct-landing:<port>        (sitio)
                      └─> gct-landing-api:8000/api/  (formulario)
                                  ├─> login.microsoftonline.com (token)
                                  └─> graph.microsoft.com (sendMail)
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

Ver `.env.example` para la lista de claves (puertos, `NUXT_PUBLIC_SITE_URL`,
`NUXT_PUBLIC_CONTACT_EMAIL`).

> El formulario de contacto hace `POST /api/contact` como ruta **relativa**
> al origin desde el que se cargó la página; nginx rutea `/api/` al backend.
> No hace falta configurar la URL del backend en el frontend. La variable
> `NUXT_PUBLIC_API_BASE` de versiones anteriores ya no se usa: si quedó en el
> `.env` del servidor, se ignora y se puede borrar.

### 2. `backend/.env` — configuración de la API

Copiar del ejemplo y completar:

```bash
cp backend/.env.example backend/.env
# editar backend/.env
```

**Modo producción (Microsoft Graph)**:

```
APP_ENV=production
MAIL_BACKEND=graph
GRAPH_TENANT_ID=<tenant id>
GRAPH_CLIENT_ID=<application (client) id de gctechs-landing-mailer>
GRAPH_CLIENT_SECRET=<valor del client secret>
GRAPH_TIMEOUT_SECONDS=20
MAIL_FROM=no-reply@gctechs.com
MAIL_FROM_NAME=Global Core Technologies
MAIL_TO=info@gctechs.com
ALLOWED_ORIGINS=https://gctechs.com,https://www.gctechs.com
```

Después de editarlo: `chmod 600 backend/.env`. El secret no debe aparecer en
git, en el pipeline ni en la línea de comandos.

Requisitos del lado de Microsoft 365:

- App Registration `gctechs-landing-mailer` con permiso **Microsoft Graph →
  Mail.Send (Application)** y admin consent.
- `MAIL_FROM` debe ser el UPN de un buzón real de Exchange Online (un buzón
  compartido sirve). Si es solo un alias, Graph responde 404.
- El client secret vence: anotar la fecha y rotarlo antes.
- Pendiente (después de validar el envío real): acotar la app al buzón
  `no-reply` con RBAC for Applications de Exchange Online. Hoy `Mail.Send`
  Application permite enviar como cualquier buzón del tenant.

Si el backend arranca con `MAIL_BACKEND=graph` y falta alguna variable
`GRAPH_*`, falla al iniciar con un mensaje que indica cuál falta.

**Modo log** (no envía; solo para diagnóstico): `MAIL_BACKEND=log` y ninguna
variable `GRAPH_*`. Los correos aparecen en `docker compose logs landing-api`.

Las variables `SMTP_*` de la versión anterior se ignoran; se pueden borrar.

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

**(b) Config del `server` de `gctechs.com` / `www.gctechs.com`:**

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

Probar el formulario desde el sitio y verificar que el correo llegue a
`MAIL_TO` con "Responder" apuntando al email del visitante. Si el envío falla,
el log del backend muestra el código de error de Graph y el `request-id`.
Los cambios en los requirements del backend requieren rebuild de la imagen;
el pipeline ya hace `docker compose up --build`, así que un push a `main`
alcanza.

Un cambio **solo** en `backend/.env` requiere recrear el contenedor: las
variables de `env_file` se inyectan al crearlo, y `docker compose restart`
**no** las vuelve a leer.

```bash
cd /home/azuredevops/landing-page
docker compose up -d --force-recreate landing-api
```

## Encontrar el proyecto en la VM

Si no recordás el path, se obtiene del contenedor en ejecución:

```bash
docker inspect gct-landing \
  --format '{{ index .Config.Labels "com.docker.compose.project.working_dir" }}'
```

## Desarrollo local

- Frontend: `cd frontend && pnpm install && pnpm dev` (usa `frontend/.env`).
- Backend: ver `backend/README.md` (`docker-compose.dev.yml` levanta la API
  con `MAIL_BACKEND=log`).

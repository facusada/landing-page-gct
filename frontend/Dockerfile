FROM node:24.11-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm@11.2.2
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
RUN pnpm install --frozen-lockfile

FROM node:24.11-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.2.2

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Nitro externalizes node_modules and recreates the circular
# vue <-> @vue/server-renderer symlinks under .output/server/node_modules.
# After the server bundle is fully built ("Nuxt Nitro server built"),
# Nitro's size-report scan follows those symlinks and aborts with ELOOP on
# Linux (>40 symlink hops). The .output is already complete and functional
# at that point, so we tolerate that post-build failure and then assert the
# build artifact exists (a real build error fails before producing it).
RUN pnpm build || true
RUN test -f .output/server/index.mjs \
  || (echo "ERROR: nuxt build failed before producing .output/server/index.mjs" >&2; exit 1)

FROM node:24.11-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=build /app/.output ./.output

EXPOSE 3000

# Health check: el contenedor sólo se marca "healthy" cuando Nuxt responde.
# El deploy usa `--wait` para no cortar la versión vieja hasta que la nueva esté lista.
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT:-3000}/" >/dev/null 2>&1 || exit 1

CMD ["node", ".output/server/index.mjs"]

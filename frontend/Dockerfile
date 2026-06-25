FROM node:24.11-alpine AS deps
WORKDIR /app

RUN npm install -g pnpm@11.2.2
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

FROM node:24.11-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@11.2.2

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

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

# Architecture Overview

## Stack

- Nuxt 4 for static prerendered delivery with Vue 3.
- TypeScript in strict mode.
- Tailwind CSS with centralized corporate tokens.
- Vitest and Vue Test Utils for component and page checks.

## Structure

- `pages/`: route-level Vue pages.
- `layouts/`: shared document layout.
- `components/sections/`: landing page sections.
- `components/ui/`: reusable presentational components.
- `data/`: editable typed content and SEO configuration.
- `docs/`: SDD, architecture notes and ADRs.
- `tests/`: focused unit and rendering tests.

## Rendering Strategy

The first version prerenders `/` as static HTML. This gives the landing strong SEO characteristics and keeps deployment flexible across Vercel, Netlify, static hosting or a Node server.

## Content Strategy

Public copy is stored in typed data files. This keeps Vue components small and makes future CMS migration easier without changing the rendering model.

## SEO Strategy

Global company metadata lives in `data/site.ts`. The home page adds page-specific title, description, social metadata and JSON-LD through Nuxt head APIs.

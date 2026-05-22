# ADR 0001: Use Nuxt for the SEO Corporate Landing

## Status

Accepted.

## Date

2026-05-22.

## Context

The client requested Vue for a public corporate landing page with strong SEO, performance and accessibility requirements. A pure Vue SPA can work for interactive applications, but it is a weaker default for public marketing content because initial HTML, metadata, crawler behavior and social previews require extra handling.

## Decision

Use Nuxt 4 with Vue 3, TypeScript and Tailwind CSS.

## Rationale

- Nuxt supports SSR, SSG and hybrid rendering.
- The landing can be prerendered as static HTML for fast initial load and crawler-friendly content.
- Page metadata, Open Graph, canonical links, robots and sitemap are first-class concerns.
- The architecture leaves room for future content routes without changing framework.
- Vue remains the component model, so the frontend requirement is preserved.

## Consequences

- The project has slightly more framework structure than a minimal Vue/Vite SPA.
- Build/deploy must run the Nuxt pipeline.
- The payoff is stronger SEO correctness, better initial HTML and cleaner future content scaling.

# AGENTS.md

## Project Standard

This repository follows the Corporate AI-First Development Standard.

## Workflow

- Start with SDD before implementation.
- Record meaningful architecture decisions as ADRs.
- Keep implementation small, typed and testable.
- Use conventional commits when committing.
- Run tests and build before handoff when feasible.

## Engineering Rules

- Prefer Nuxt static prerendering for public landing content.
- Keep content editable in `data/`.
- Centralize visual tokens in Tailwind and CSS variables.
- Avoid duplicated copy across components.
- Preserve semantic HTML and accessible navigation.
- Add tests for user-facing sections, reusable components and SEO-critical data.

## Commands

- `corepack enable`
- `pnpm install`
- `pnpm dev`
- `pnpm test`
- `pnpm build`
- `pnpm generate`

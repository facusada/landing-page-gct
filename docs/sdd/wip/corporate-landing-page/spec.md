# SDD: Corporate Landing Page

## Status

Work in progress.

## Context

Global Core Technologies needs a corporate landing page for current and future B2B clients. The visual reference is the Figma redesign supplied by the client, using a navy/blue/orange technology identity and a structure centered on SAP services, clients, trust and contact.

The implementation must improve the reference where useful: clearer commercial copy, stronger content hierarchy, better mobile layout, reusable components, technical SEO and performance from the first iteration.

## Goals

- Build a Nuxt 4 landing page optimized for SEO, performance and accessibility.
- Use the Figma as brand reference, not as a pixel-perfect constraint.
- Present SAP, security, cloud, AI and operational expertise with concise content.
- Keep content editable from typed data files.
- Prepare the repository for CI/CD and future content expansion.
- Include tests for key UI and SEO behavior.

## Non-goals

- Multi-page blog implementation.
- CMS integration.
- Pixel-perfect recreation of the Figma prototype.
- Backend contact form processing.

## Users

- Enterprise decision makers evaluating SAP modernization partners.
- IT, security and operations leaders researching implementation and support vendors.
- Existing clients looking for contact information or service scope.

## Functional Requirements

- Home landing page at `/`.
- Responsive navigation with anchor links.
- Hero with clear brand/value proposition and primary CTA.
- Sections for services, differentiators, target industries, technology focus, clients/trust, CTA/contact and footer.
- Keyboard-friendly anchors and visible focus states.
- Editable content in `data/`.

## SEO Requirements

- Static prerender for `/` with Nuxt.
- Complete metadata, Open Graph and Twitter Card tags.
- Canonical URL prepared in config.
- `robots.txt` and `sitemap.xml`.
- JSON-LD Organization schema.
- Single H1, semantic H2/H3 hierarchy.
- Descriptive alt text for meaningful imagery.
- Lightweight CSS animations that do not block rendering.

## Accessibility Requirements

- WCAG-oriented color contrast.
- HTML5 landmarks.
- Skip link.
- Keyboard navigable menu and CTAs.
- Visible focus states.
- No information conveyed only by color.

## Performance Requirements

- No heavy UI dependencies in the initial implementation.
- CSS-first animation.
- Static generation-ready.
- Image and decorative asset strategy based on CSS and optimized public assets.
- Lighthouse targets: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95.

## Design Direction

Use the captured Figma colors:

- `#07111F` / `#0B1D33`: premium corporate dark surfaces.
- `#606AF4`: technology blue accent.
- `#F17D30`: CTA and brand energy accent.
- `#FFFFFF`, `#F5F7FA`, `#D7DCE3`: content surfaces and separators.

Improve the Figma by reducing text density, tightening section hierarchy, upgrading service cards, and making the first viewport clearly communicate the company category and offer.

## Acceptance Criteria

- `pnpm build` succeeds.
- `pnpm test` succeeds.
- Main sections render from structured data.
- SEO metadata and JSON-LD are present.
- Project contains SDD, ADR, architecture overview, AGENTS.md and README.

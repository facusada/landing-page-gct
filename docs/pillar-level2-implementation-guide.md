# Guía: implementar la página Nivel 2 de un pilar

Cómo llevar un documento de diseño (tipo `CLAUDE DESIGN PROMPT – LEVEL 2`) a la
página Nivel 2 de un pilar, reutilizando la estructura ya construida para
**Transform** y **Secure**. No hay que crear componentes ni rediseñar: la
página es 100 % data-driven y todo el contenido vive en i18n.

## 1. Cómo está armada la página Nivel 2

Una sola página dinámica sirve a todos los pilares:
`frontend/pages/pilares/[slug]/index.vue` (ruta `/pilares/<slug>`).

El "tratamiento completo de documento Nivel 2" se activa por pilar mediante el
array `docPillars` y unos mapas de configuración dentro de ese `.vue`. El
**contenido** vive en i18n (`frontend/locales/en.json` y `es.json`) bajo
`pillarDetail.*`. Los **servicios** (grilla + wiring a Nivel 3) viven en
`frontend/data/landing.ts`.

Bloques que renderiza la página, en orden:

| # | Bloque | Fuente de contenido | Config en `index.vue` |
|---|--------|---------------------|-----------------------|
| 1 | Hero (headline/sub/CTAs) | `pillarDetail.hero.<slug>` | `docPillars` (habilita el override) |
| 2 | Featured Innovation | `featuredByPillar[slug]` (en el `.vue`) | `featuredByPillar` |
| 3 | The Challenge ("por qué") | `pillarDetail.imperative.<slug>` | `pressuresByPillar[slug]` (keys + iconos) |
| 4 | Services grid | `pillarServiceKeys[slug]` + `pillarDetail.items.<slug>` + `pillarL3Services` | `servicesTitleByPillar` override |
| 5 | Business Outcomes | `pillarDetail.outcomes.<slug>` | `outcomeKeysByPillar[slug]` (orden de keys) |
| 6 | Other pillars | automático (`pillars`) | — |

> Los documentos de diseño suelen incluir además secciones **Framework
> (Assess/Design/…)**, **Why GCT**, **Lead Magnet** y **Final CTA**. La página
> Nivel 2 **no** tiene esos bloques (viven en las páginas Nivel 3, ver §6). Si se
> decide agregarlos, requieren componentes nuevos y quedan fuera de esta guía.

## 2. Checklist paso a paso

Reemplazá `<slug>` por el id del pilar (`secure`, `operate`, `govern`,
`innovate`). Cada texto va **en los dos locales** (`en.json` y `es.json`).

### Paso 1 — Activar el pilar
En `frontend/pages/pilares/[slug]/index.vue`:
```ts
const docPillars = ['transform', 'secure', '<slug>']
```

### Paso 2 — Hero (Sección 1 del doc)
En ambos locales, dentro de `pillarDetail.hero`, agregá el bloque `<slug>` con
`headline`, `subheadline`, `primaryCta`, `secondaryCta`.

### Paso 3 — Challenge / Imperative (Sección 2 del doc)
1. En ambos locales, dentro de `pillarDetail.imperative`, agregá el bloque
   `<slug>` con `title`, `intro`, `pressures` (un key por bullet del doc),
   `closing` y `highlight`. `closing`/`highlight` normalmente no vienen en el
   doc: redactá copy ejecutivo consistente con el tono del pilar.
2. En `index.vue`, agregá `<slug>` a `pressuresByPillar` mapeando cada key a un
   icono. **Iconos soportados** (en `components/sections/TransformationImperative.vue`):
   `server`, `layers`, `alert`, `shield`, `cloud`, `chart`. Cualquier otro valor
   cae al icono por defecto (estrella). Se pueden repetir iconos.

### Paso 4 — Services grid (Sección 4 del doc)
1. **Título de la sección** (opcional): en ambos locales, `pillarDetail.servicesTitleByPillar.<slug>`.
   Si no se define, usa el genérico `pillarDetail.servicesTitle`.
2. **Cards**: en ambos locales, dentro de `pillarDetail.items.<slug>`, un objeto
   por servicio con `title` y `description`. El doc da "executive summary" +
   "business value"; **fusionalos en una sola `description`** (las cards siguen
   el molde de Transform: título + una descripción, sin campo separado de business value).
3. **Orden y wiring** en `frontend/data/landing.ts`:
   - `pillarServiceKeys.<slug>` = array de keys **en el orden del doc**. Estos
     keys deben coincidir con los de `pillarDetail.items.<slug>`.
   - Para que una card **enlace** a su página Nivel 3, tiene que existir una
     entrada en `pillarL3Services` con el mismo `pillar` + `key` (que aporta el
     `slug` del Nivel 3). **Si no existe entrada L3, la card se renderiza sin
     link** (el código lo maneja solo). Es la vía correcta cuando todavía no hay
     contenido L3 para ese servicio.

### Paso 5 — Business Outcomes (Sección 5 del doc)
1. En ambos locales, dentro de `pillarDetail.outcomes`, agregá el bloque `<slug>`
   con `title` e `items` (un objeto `{ title, description }` por outcome).
2. En `index.vue`, agregá `<slug>` a `outcomeKeysByPillar` con las keys **en el
   orden deseado**.

### Paso 6 — Assets del hero (si falta)
El hero usa `public/backgrounds/<slug>-hero.svg` (o `.png`) y un `ParticleField`.
Verificá que el asset exista; los cinco pilares ya lo tienen.

## 3. Servicios y Nivel 3: reglas de reconciliación

El doc puede listar servicios distintos a los que ya existen en el código. Reglas:

- **Reutilizar** la entrada L3 existente cuando el concepto coincide: mantené el
  `key`/`slug` y solo actualizá el `title`/`description` de la card L2. El
  `title` de la card (L2) es independiente del `slug` de la URL (L3): pueden diferir.
- **Servicio nuevo sin contenido L3**: agregalo a `pillarServiceKeys` y a
  `pillarDetail.items` (para que aparezca la card), **sin** entrada en
  `pillarL3Services`. Queda como card sin link hasta que llegue el contenido L3.
- **Servicio que sale de la grilla**: quitalo de `pillarServiceKeys`. **No borres**
  su entrada en `pillarL3Services` ni su bloque `serviceDetail.items.<slug>`: la
  página L3 sigue accesible por URL directa y evitás un 404 / pérdida de SEO.
- **Renombrar un slug** (p. ej. para alinear a keywords SEO del doc): cambiá el
  `slug` en `pillarL3Services` **y** renombrá el key correspondiente en
  `serviceDetail.items.<slug>` (ambos locales). Como cambia la URL pública,
  agregá un redirect 301 del slug viejo al nuevo (Nuxt route rules / Vercel) si
  la página ya está indexada.

## 4. Contenido de Nivel 3 (páginas de servicio individuales)

Las páginas L3 (`/pilares/<slug>/<serviceSlug>`) son otro entregable, más
profundo, y **no** se cubren con el documento de Nivel 2. Cada una consume
`serviceDetail.items.<serviceSlug>` con esta estructura (ver ejemplos existentes
en `locales/*.json`): `metaTitle`, `metaDescription`, `eyebrow`, `h1`,
`heroSubtitle`, `ctaPrimary`, `ctaSecondary`, `metrics`, `problem`, `howWeHelp`,
`benefits`, `methodology`, `whyGct`, `leadMagnet`, `finalCta`. Cuando llegue el
contenido L3 de un servicio nuevo, creá su bloque `serviceDetail.items.<slug>` +
su entrada en `pillarL3Services`, y la card L2 pasa a enlazar automáticamente.

## 5. Validación

Desde `frontend/`:
```bash
python3 -c "import json;json.load(open('locales/en.json'));json.load(open('locales/es.json'));print('JSON OK')"
npm run typecheck   # ignorar errores preexistentes en PageContextIndicator.vue y StickyContextBar.vue
npm test            # el fallo del H1 del home (index.test.ts) es preexistente
npm run dev         # revisar /pilares/<slug> y /es/pilares/<slug>
```
Revisá visualmente: hero con override, challenge con iconos, 7 cards en el orden
del doc (las nuevas sin link), outcomes, y paridad en/es.

## 6. Ejemplo aplicado: pilar Secure (2026-07)

Referencia real de esta guía. Archivos tocados:
`pages/pilares/[slug]/index.vue`, `data/landing.ts`, `locales/en.json`,
`locales/es.json`.

- **Decisión de alcance**: espejo estricto de Transform (solo los 6 bloques; se
  dejaron fuera Framework, Why GCT, Lead Magnet y Final CTA del doc).
- **Servicios** reconciliados a los 7 del doc, en orden:
  1. SAP Security Assessment → key `sapSecurity` (L3 `sap-security-assessment`) · enlaza
  2. SAP GRC Access Control → key `sapGrc` (L3 `sap-grc-access-control`) · enlaza
  3. SoD Risk Analysis & Remediation → key `sod` (L3 `sap-segregation-of-duties`) · enlaza
  4. SAP Role Redesign & Authorization Model → key `rbac` (L3 `sap-role-redesign`) · enlaza
  5. Emergency Access Management → key `emergencyAccess` · **sin L3 → sin link**
  6. SAP Security Managed Services → key `securityManagedServices` (L3 `sap-security-managed-services`) · enlaza
  7. SAP S/4HANA Security Readiness → key `s4hanaReadiness` · **sin L3 → sin link**
- **Slugs renombrados a keywords SEO del doc** (con redirect 301 en `nuxt.config.ts`
  para default + `/en`, y `metaTitle`/`h1` alineados en ambos locales):
  `sap-security` → `sap-security-assessment`, `sap-grc` → `sap-grc-access-control`,
  `sap-rbac` → `sap-role-redesign`. Los slugs ya alineados no se tocaron
  (`sap-segregation-of-duties`, `sap-security-managed-services`).
- **Fuera de la grilla**: `complianceMonitoring` (su página L3
  `sap-compliance-monitoring` se mantiene accesible, sin borrar).
- **Pendiente**: contenido L3 (bloque `serviceDetail.items.<slug>` + entrada en
  `pillarL3Services`) para `emergencyAccess` y `s4hanaReadiness`. El cuerpo de las
  3 páginas L3 renombradas conserva su copy original (adyacente al nuevo nombre);
  se realineará por completo cuando llegue el contenido L3 dedicado del doc.

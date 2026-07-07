import { defineNuxtConfig } from 'nuxt/config'
import { pillarL3Services, pillars, platforms, services } from './data/landing'
import { sapProducts } from './data/sap-products'
import { organizationJsonLd, siteConfig } from './data/site'

const serviceRoutes = services.map(s => `/servicios/${s.slug}`)
const solutionRoutes = sapProducts.map(p => `/soluciones/${p.id}`)
const pillarRoutes = pillars.map(p => `/pilares/${p.id}`)
const pillarServiceRoutes = pillarL3Services.map(s => `/pilares/${s.pillar}/${s.slug}`)
const platformRoutes = platforms.map(p => `/plataformas/${p.slug}`)

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://www.gctechs.com',
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL ?? 'info@gctechs.com',
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:8000'
    }
  },
  compatibilityDate: '2026-05-22',
  srcDir: '.',
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'es', language: 'es-AR', name: 'Español', file: 'es.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'es',
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    restructureDir: false,
    bundle: {
      optimizeTranslationDirective: false
    }
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  experimental: {
    payloadExtraction: false
  },
  typescript: {
    strict: true,
    typeCheck: false
  },
  app: {
    head: {
      titleTemplate: `%s | ${siteConfig.name}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#07111F' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'canonical', href: siteConfig.url },
        { rel: 'icon', href: '/favicon.png', type: 'image/png', sizes: '512x512' },
        { rel: 'shortcut icon', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/favicon.png' }
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(organizationJsonLd)
        }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/', '/servicios', '/soluciones', '/contacto', '/sitemap.xml', '/robots.txt', ...serviceRoutes, ...solutionRoutes, ...pillarRoutes, ...pillarServiceRoutes, ...platformRoutes]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/servicios': { prerender: true },
    '/servicios/**': { prerender: true },
    '/soluciones': { prerender: true },
    '/soluciones/**': { prerender: true },
    '/pilares/**': { prerender: true },
    '/plataformas/**': { prerender: true },
    '/contacto': { prerender: true },
    // 301 redirects for Secure L3 slugs renamed to match SEO keywords (2026-07).
    // Cover both the default locale (no prefix) and the English `/en` prefix.
    '/pilares/secure/sap-security': { redirect: { to: '/pilares/secure/sap-security-assessment', statusCode: 301 } },
    '/en/pilares/secure/sap-security': { redirect: { to: '/en/pilares/secure/sap-security-assessment', statusCode: 301 } },
    '/pilares/secure/sap-grc': { redirect: { to: '/pilares/secure/sap-grc-access-control', statusCode: 301 } },
    '/en/pilares/secure/sap-grc': { redirect: { to: '/en/pilares/secure/sap-grc-access-control', statusCode: 301 } },
    '/pilares/secure/sap-rbac': { redirect: { to: '/pilares/secure/sap-role-redesign', statusCode: 301 } },
    '/en/pilares/secure/sap-rbac': { redirect: { to: '/en/pilares/secure/sap-role-redesign', statusCode: 301 } },
    // 301 redirects for Govern L3 slugs replaced by the 7-service set (Block B, 2026-07).
    '/pilares/govern/sap-program-governance': { redirect: { to: '/pilares/govern/sap-program-management', statusCode: 301 } },
    '/en/pilares/govern/sap-program-governance': { redirect: { to: '/en/pilares/govern/sap-program-management', statusCode: 301 } },
    '/pilares/govern/sap-compliance': { redirect: { to: '/pilares/govern/sap-compliance-control-framework', statusCode: 301 } },
    '/en/pilares/govern/sap-compliance': { redirect: { to: '/en/pilares/govern/sap-compliance-control-framework', statusCode: 301 } },
    '/pilares/govern/sap-executive-controls': { redirect: { to: '/pilares/govern/sap-kpi-executive-reporting', statusCode: 301 } },
    '/en/pilares/govern/sap-executive-controls': { redirect: { to: '/en/pilares/govern/sap-kpi-executive-reporting', statusCode: 301 } },
    '/pilares/govern/sap-governance-advisory': { redirect: { to: '/pilares/govern/sap-pmo-project-governance', statusCode: 301 } },
    '/en/pilares/govern/sap-governance-advisory': { redirect: { to: '/en/pilares/govern/sap-pmo-project-governance', statusCode: 301 } },
    '/pilares/govern/sap-clean-core-governance': { redirect: { to: '/pilares/govern', statusCode: 301 } },
    '/en/pilares/govern/sap-clean-core-governance': { redirect: { to: '/en/pilares/govern', statusCode: 301 } },
    // 301 redirects for Innovate L3 slugs replaced by the 7-service set (Block B, 2026-07).
    // sap-ai-automation is retained in the new set, so it needs no redirect.
    '/pilares/innovate/sap-btp-automation': { redirect: { to: '/pilares/innovate/sap-btp-advisory', statusCode: 301 } },
    '/en/pilares/innovate/sap-btp-automation': { redirect: { to: '/en/pilares/innovate/sap-btp-advisory', statusCode: 301 } },
    '/pilares/innovate/predictive-monitoring': { redirect: { to: '/pilares/innovate/sap-intelligent-agents', statusCode: 301 } },
    '/en/pilares/innovate/predictive-monitoring': { redirect: { to: '/en/pilares/innovate/sap-intelligent-agents', statusCode: 301 } },
    '/pilares/innovate/intelliguard-platform': { redirect: { to: '/plataformas/intelliguard', statusCode: 301 } },
    '/en/pilares/innovate/intelliguard-platform': { redirect: { to: '/en/plataformas/intelliguard', statusCode: 301 } },
    '/pilares/innovate/operations-intelligence-platform': { redirect: { to: '/plataformas/operations-intelligence', statusCode: 301 } },
    '/en/pilares/innovate/operations-intelligence-platform': { redirect: { to: '/en/plataformas/operations-intelligence', statusCode: 301 } }
  }
})

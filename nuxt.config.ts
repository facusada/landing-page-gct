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
      contactEmail: process.env.NUXT_PUBLIC_CONTACT_EMAIL ?? 'info@gctechs.com'
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
    '/contacto': { prerender: true }
  }
})

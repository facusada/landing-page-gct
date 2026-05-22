import { defineNuxtConfig } from 'nuxt/config'
import { organizationJsonLd, siteConfig } from './data/site'

export default defineNuxtConfig({
  compatibilityDate: '2026-05-22',
  srcDir: '.',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es-AR' },
      titleTemplate: `%s | ${siteConfig.name}`,
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#07111F' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'canonical', href: siteConfig.url },
        { rel: 'icon', href: '/global-core-logo.png', type: 'image/png' }
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
      routes: ['/', '/sitemap.xml', '/robots.txt']
    }
  },
  routeRules: {
    '/': { prerender: true }
  }
})

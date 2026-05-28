<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { sapProducts } from '~/data/sap-products'
import { siteConfig } from '~/data/site'

const route = useRoute()
const id = route.params.id as string

const product = sapProducts.find(p => p.id === id)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Solución no encontrada' })
}

useSeoMeta({
  title: product.title,
  description: product.description,
  ogTitle: `${product.title} | ${siteConfig.name}`,
  ogDescription: product.description,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteConfig.url}/soluciones/${id}` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: product.title,
        description: product.description,
        provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        url: `${siteConfig.url}/soluciones/${id}`
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Portfolio SAP', item: `${siteConfig.url}/#portfolio` },
          { '@type': 'ListItem', position: 3, name: product.title, item: `${siteConfig.url}/soluciones/${id}` }
        ]
      })
    }
  ]
})
</script>

<template>
  <div v-if="product">
    <!-- Hero -->
    <section class="relative isolate overflow-hidden bg-core-ink py-24 text-white md:py-32">
      <img
        :src="product.heroImage"
        :alt="product.title"
        class="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
        loading="eager"
      >
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-core-ink/60 via-core-ink/80 to-core-ink" />
      <div class="section-shell">
        <nav class="mb-10 text-sm text-white/60" aria-label="Breadcrumb">
          <NuxtLink to="/" class="hover:text-white">Inicio</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink to="/#portfolio" class="hover:text-white">Portfolio SAP</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ product.title }}</span>
        </nav>
        <div class="max-w-3xl">
          <div class="mb-5 inline-flex items-center gap-2.5">
            <div class="flex items-center justify-center rounded-[5px] bg-[#1872CE] px-2 py-0.5">
              <span class="font-display text-[13px] font-extrabold leading-5 tracking-wide text-white">SAP</span>
            </div>
            <span class="text-sm font-bold text-white/80">{{ product.subtitle }}</span>
          </div>
          <h1 class="font-display text-5xl font-extrabold leading-tight md:text-7xl">
            {{ product.title }}
          </h1>
          <p class="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            {{ product.description }}
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton :to="`/contacto?servicio=${product.id}`">Consultar esta solución</BaseButton>
            <BaseButton to="/servicios" variant="secondary">Ver servicios SAP</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Qué es? -->
    <section class="relative overflow-hidden bg-white py-20 md:py-28">
      <div class="absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />
      <div class="section-shell relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div v-reveal>
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">¿Qué es?</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ product.title }} para organizaciones que necesitan operar con control
          </h2>
          <p class="mt-6 text-lg leading-8 text-slate-600">
            {{ product.longDescription }}
          </p>
          <div class="mt-8 flex items-center gap-3">
            <span class="rounded-full border border-core-line bg-core-mist px-4 py-1.5 text-sm font-bold text-core-navy">
              {{ product.minUsers }}
            </span>
            <span class="rounded-full border border-[#1872CE]/30 bg-[#1872CE]/5 px-4 py-1.5 text-sm font-bold text-[#1872CE]">
              {{ product.subtitle }}
            </span>
          </div>
        </div>
        <div v-reveal="{ delay: 180 }" class="relative">
          <div class="absolute -inset-4 rounded-2xl bg-core-blue/5" />
          <img
            :src="product.detailImage"
            :alt="`Implementación de ${product.title}`"
            class="relative rounded-xl shadow-premium object-cover w-full aspect-[4/3]"
            loading="lazy"
          >
        </div>
      </div>
    </section>

    <!-- Funcionalidades clave -->
    <section class="bg-core-mist py-20 md:py-28">
      <div class="section-shell">
        <div v-reveal class="max-w-2xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Funcionalidades</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            Qué incluye {{ product.title }}
          </h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(feature, index) in product.features"
            :key="feature.title"
            v-reveal="{ delay: Math.min(index * 100, 400), distance: 36, duration: 820 }"
            class="group rounded-xl border border-core-line bg-white p-6 shadow-[0_2px_12px_rgba(7,17,31,0.05)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/30 hover:shadow-lift"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-core-mist text-core-navy transition-colors group-hover:bg-core-orange/10 group-hover:text-core-orange">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path :d="feature.icon" />
              </svg>
            </div>
            <h3 class="font-display text-lg font-extrabold text-core-ink">{{ feature.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- Casos de uso -->
    <section class="relative overflow-hidden bg-core-ink py-20 text-white md:py-28">
      <div class="absolute inset-0 bg-hero-radial opacity-30" aria-hidden="true" />
      <div class="section-shell relative grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div v-reveal>
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Casos de uso</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            ¿En qué situaciones aplica {{ product.title }}?
          </h2>
          <p class="mt-4 text-white/70 leading-7">
            Estas son las situaciones donde más valor genera la implementación de {{ product.title }} acompañada por Global Core Technologies.
          </p>
        </div>
        <ul class="grid gap-4">
          <li
            v-for="(useCase, index) in product.useCases"
            :key="useCase"
            v-reveal="{ delay: Math.min(index * 120, 360), distance: 32, duration: 800 }"
            class="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-core-orange/20 text-sm font-extrabold text-core-orange">
              {{ index + 1 }}
            </span>
            <p class="leading-7 text-white/85">{{ useCase }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-white py-20 md:py-24">
      <div class="absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />
      <div v-reveal class="section-shell relative max-w-3xl text-center mx-auto">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Próximo paso</p>
        <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight text-core-ink md:text-5xl">
          ¿Es {{ product.title }} la solución para tu organización?
        </h2>
        <p class="mt-5 text-lg leading-8 text-slate-600">
          Conversemos sobre tu contexto actual, tus objetivos y cómo {{ product.subtitle }} puede acelerar tu evolución digital con el respaldo de Global Core Technologies.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <BaseButton :to="`/contacto?servicio=${product.id}`">Hablar con un especialista</BaseButton>
          <BaseButton to="/servicios" variant="secondary">Explorar servicios SAP</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

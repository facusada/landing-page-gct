<script setup lang="ts">
import ServiceIcon from '~/components/ui/ServiceIcon.vue'
import { services } from '~/data/landing'
import { siteConfig } from '~/data/site'

const pageTitle = 'Servicios SAP'
const pageDescription = 'Ocho frentes de trabajo SAP: migración S/4HANA, implementación, seguridad GRC, soporte AMS, innovación, managed services, performance y Solution Manager.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: `${pageTitle} | ${siteConfig.name}`,
  ogDescription: pageDescription,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteConfig.url}/servicios` }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${siteConfig.url}/servicios` }
        ]
      })
    }
  ]
})
</script>

<template>
  <section class="bg-core-ink py-16 text-white md:py-20">
    <div class="section-shell">
      <nav class="mb-8 text-sm text-white/60" aria-label="Breadcrumb">
        <NuxtLink to="/" class="hover:text-white">Inicio</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-white/90">Servicios</span>
      </nav>
      <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">Lo que ofrecemos</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        Servicios SAP para evolucionar sin perder control
      </h1>
      <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
        Ocho frentes de trabajo para organizaciones que necesitan transformar, asegurar y operar con continuidad.
      </p>
    </div>
  </section>

  <section class="bg-core-mist py-16 md:py-24">
    <div class="section-shell">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(service, index) in services"
          :key="service.slug"
          :to="`/servicios/${service.slug}`"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 40, duration: 820 }"
          class="group flex h-full flex-col rounded-xl border border-core-line bg-white p-6 shadow-[0_1px_0_rgba(7,17,31,0.04)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-premium"
        >
          <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-core-mist text-core-orange transition-colors duration-200 group-hover:bg-core-orange/10">
            <ServiceIcon :name="service.icon" :size="24" />
          </div>
          <h2 class="font-display text-xl font-extrabold leading-snug text-core-ink">
            {{ service.title }}
          </h2>
          <p class="mt-4 flex-1 text-base leading-7 text-slate-600">
            {{ service.description }}
          </p>
          <p class="mt-6 border-t border-core-line pt-4 text-sm font-bold text-core-navy">
            {{ service.proof }}
          </p>
          <p class="mt-4 text-sm font-bold text-core-orange transition group-hover:translate-x-1">
            Ver detalle →
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceIcon from '~/components/ui/ServiceIcon.vue'
import { services } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localizedTo = useLocalizedTo()

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

const pageTitle = computed(() => t('services.page.seoTitle'))
const pageDescription = computed(() => t('services.page.seoDescription'))

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: computed(() => `${pageTitle.value} | ${siteConfig.name}`),
  ogDescription: pageDescription,
  ogType: 'website'
})

useHead({
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
        <NuxtLink :to="localizedTo('/')" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-white/90">{{ t('breadcrumb.services') }}</span>
      </nav>
      <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ t('services.page.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        {{ t('services.page.title') }}
      </h1>
      <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
        {{ t('services.page.description') }}
      </p>
    </div>
  </section>

  <section class="bg-core-mist py-16 md:py-24">
    <div class="section-shell">
      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="(service, index) in services"
          :key="service.slug"
          :to="localizedTo(`/servicios/${service.slug}`)"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 40, duration: 820 }"
          class="group flex h-full flex-col rounded-xl border border-core-line bg-white p-6 shadow-[0_1px_0_rgba(7,17,31,0.04)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-premium"
        >
          <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-core-mist text-core-orange transition-colors duration-200 group-hover:bg-core-orange/10">
            <ServiceIcon :name="service.icon" :size="24" />
          </div>
          <h2 class="font-display text-xl font-extrabold leading-snug text-core-ink">
            {{ t(`services.items.${service.slug}.title`) }}
          </h2>
          <p class="mt-4 flex-1 text-base leading-7 text-slate-600">
            {{ t(`services.items.${service.slug}.description`) }}
          </p>
          <p class="mt-6 border-t border-core-line pt-4 text-sm font-bold text-core-navy">
            {{ t(`services.items.${service.slug}.proof`) }}
          </p>
          <p class="mt-4 text-sm font-bold text-core-orange transition group-hover:translate-x-1">
            {{ t('services.detail.viewDetail') }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

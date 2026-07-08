<script setup lang="ts">
import { sapProducts } from '~/data/sap-products'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localizedTo = useLocalizedTo()

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

const pageTitle = computed(() => t('portfolio.seoTitle'))
const pageDescription = computed(() => t('portfolio.seoDescription'))

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
          { '@type': 'ListItem', position: 2, name: 'Soluciones', item: `${siteConfig.url}/soluciones` }
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
        <span class="text-white/90">{{ t('nav.items.solutions') }}</span>
      </nav>
      <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ t('portfolio.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        {{ t('portfolio.title') }}
      </h1>
      <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
        {{ t('portfolio.description') }}
      </p>
    </div>
  </section>

  <section class="bg-core-mist py-16 md:py-24">
    <div class="section-shell">
      <div class="grid gap-6 lg:grid-cols-6">
        <NuxtLink
          v-for="(product, index) in sapProducts"
          :key="product.id"
          :to="localizedTo(`/soluciones/${product.id}`)"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 40, duration: 820 }"
          class="group flex flex-col overflow-hidden rounded-xl border border-core-line bg-white shadow-[0_2px_12px_rgba(7,17,31,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-premium lg:col-span-2"
        >
          <div class="flex flex-1 flex-col p-7">
            <div class="mb-5 inline-flex items-center gap-2.5">
              <div class="flex items-center justify-center rounded-[5px] bg-[#1872CE] px-2 py-0.5">
                <span class="font-display text-[13px] font-extrabold leading-5 tracking-wide text-white">SAP</span>
              </div>
              <span class="font-display text-base font-bold text-core-ink">{{ t(`portfolio.products.${product.id}.badge`) }}</span>
            </div>

            <h2 class="font-display text-2xl font-extrabold text-core-ink">{{ t(`portfolio.products.${product.id}.title`) }}</h2>
            <p class="mt-3 flex-1 text-base leading-7 text-slate-600">{{ t(`portfolio.products.${product.id}.description`) }}</p>
          </div>

          <div class="flex items-center justify-between border-t border-core-line px-7 py-4">
            <span class="text-sm font-bold text-slate-500">{{ t(`portfolio.products.${product.id}.minUsers`) }}</span>
            <span class="text-sm font-bold text-[#1872CE] transition group-hover:translate-x-1">{{ t('portfolio.viewDetail') }}</span>
          </div>

          <div class="h-1 bg-[#1872CE]" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

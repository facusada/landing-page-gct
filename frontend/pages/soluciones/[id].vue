<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { sapProducts } from '~/data/sap-products'
import { siteConfig } from '~/data/site'

const { t, tm, rt } = useI18n()
const localizedTo = useLocalizedTo()
const route = useRoute()
const id = route.params.id as string

const product = sapProducts.find(p => p.id === id)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Solución no encontrada' })
}

type RtMessage = Parameters<typeof rt>[0]

const productTitle = computed(() => t(`portfolio.products.${id}.title`))
const productSubtitle = computed(() => t(`portfolio.products.${id}.subtitle`))
const productDescription = computed(() => t(`portfolio.products.${id}.description`))
const productLongDescription = computed(() => t(`portfolio.products.${id}.longDescription`))
const productFeatures = computed(() =>
  (tm(`portfolio.products.${id}.features`) as Array<{ title: RtMessage; description: RtMessage }>).map(f => ({
    title: rt(f.title),
    description: rt(f.description)
  }))
)
const productUseCases = computed(() =>
  (tm(`portfolio.products.${id}.useCases`) as unknown[]).map(u => rt(u as RtMessage))
)
const productMinUsers = computed(() => t(`portfolio.products.${id}.minUsers`))

useSeoMeta({
  title: productTitle,
  description: productDescription,
  ogTitle: computed(() => `${productTitle.value} | ${siteConfig.name}`),
  ogDescription: productDescription,
  ogType: 'website'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: productTitle.value,
        description: productDescription.value,
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
          { '@type': 'ListItem', position: 2, name: 'Soluciones', item: `${siteConfig.url}/soluciones` },
          { '@type': 'ListItem', position: 3, name: productTitle.value, item: `${siteConfig.url}/soluciones/${id}` }
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
        :alt="productTitle"
        class="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
        loading="eager"
      >
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-core-ink/60 via-core-ink/80 to-core-ink" />
      <div class="section-shell">
        <nav class="mb-10 text-sm text-white/60" aria-label="Breadcrumb">
          <NuxtLink :to="localizedTo('/')" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="mx-2">/</span>
          <NuxtLink :to="localizedTo('/soluciones')" class="hover:text-white">{{ t('nav.items.solutions') }}</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ productTitle }}</span>
        </nav>
        <div class="max-w-3xl">
          <div class="mb-5 inline-flex items-center gap-2.5">
            <div class="flex items-center justify-center rounded-[5px] bg-[#1872CE] px-2 py-0.5">
              <span class="font-display text-[13px] font-extrabold leading-5 tracking-wide text-white">SAP</span>
            </div>
            <span class="text-sm font-bold text-white/80">{{ productSubtitle }}</span>
          </div>
          <h1 class="font-display text-5xl font-extrabold leading-tight md:text-7xl">
            {{ productTitle }}
          </h1>
          <p class="mt-6 max-w-2xl text-xl leading-8 text-white/80">
            {{ productDescription }}
          </p>
          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton :to="`/contacto?servicio=${product.id}`">{{ t('solutionsPage.consultSolution') }}</BaseButton>
            <BaseButton to="/servicios" variant="secondary">{{ t('solutionsPage.viewSapServices') }}</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ¿Qué es? -->
    <section class="relative overflow-hidden bg-section-light py-20 md:py-28">
      <div class="absolute inset-0 opacity-60" aria-hidden="true" />
      <div class="section-shell relative grid gap-16 lg:grid-cols-2 lg:items-center">
        <div v-reveal>
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('solutionsPage.whatIs') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t('solutionsPage.whatIsTitle', { product: productTitle }) }}
          </h2>
          <p class="mt-6 text-lg leading-8 text-slate-600">
            {{ productLongDescription }}
          </p>
          <div class="mt-8 flex items-center gap-3">
            <span class="rounded-full border border-core-line bg-core-mist px-4 py-1.5 text-sm font-bold text-core-navy">
              {{ productMinUsers }}
            </span>
            <span class="rounded-full border border-[#1872CE]/30 bg-[#1872CE]/5 px-4 py-1.5 text-sm font-bold text-[#1872CE]">
              {{ productSubtitle }}
            </span>
          </div>
        </div>
        <div v-reveal="{ delay: 180 }" class="relative">
          <div class="absolute -inset-4 rounded-2xl bg-core-blue/5" />
          <img
            :src="product.detailImage"
            :alt="`${t('solutionsPage.whatIs')} ${productTitle}`"
            :class="['relative rounded-xl shadow-premium w-full aspect-[4/3]', product.detailImage.endsWith('.svg') ? 'object-contain p-4' : 'object-cover']"
            loading="lazy"
          >
        </div>
      </div>
    </section>

    <!-- Funcionalidades clave -->
    <section class="bg-core-mist py-20 md:py-28">
      <div class="section-shell">
        <div v-reveal class="max-w-2xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('solutionsPage.featuresEyebrow') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t('solutionsPage.featuresTitle', { product: productTitle }) }}
          </h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(feature, index) in productFeatures"
            :key="feature.title"
            v-reveal="{ delay: Math.min(index * 100, 400), distance: 36, duration: 820 }"
            class="group rounded-xl border border-core-line bg-white p-6 shadow-[0_2px_12px_rgba(7,17,31,0.05)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/30 hover:shadow-lift"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-core-mist text-core-navy transition-colors group-hover:bg-core-orange/10 group-hover:text-core-orange">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
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
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('solutionsPage.useCasesEyebrow') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight md:text-4xl">
            {{ t('solutionsPage.useCasesTitle', { product: productTitle }) }}
          </h2>
          <p class="mt-4 text-white/70 leading-7">
            {{ t('solutionsPage.useCasesDescription', { product: productTitle }) }}
          </p>
        </div>
        <ul class="grid gap-4">
          <li
            v-for="(useCase, index) in productUseCases"
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
    <section class="relative overflow-hidden bg-section-light py-20 md:py-24">
      <div class="absolute inset-0 opacity-60" aria-hidden="true" />
      <div v-reveal class="section-shell relative max-w-3xl text-center mx-auto">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('solutionsPage.ctaEyebrow') }}</p>
        <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight text-core-ink md:text-5xl">
          {{ t('solutionsPage.ctaTitle', { product: productTitle }) }}
        </h2>
        <p class="mt-5 text-lg leading-8 text-slate-600">
          {{ t('solutionsPage.ctaDescription', { subtitle: productSubtitle }) }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <BaseButton :to="`/contacto?servicio=${product.id}`">{{ t('solutionsPage.talkToExpert') }}</BaseButton>
          <BaseButton to="/servicios" variant="secondary">{{ t('solutionsPage.exploreServices') }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

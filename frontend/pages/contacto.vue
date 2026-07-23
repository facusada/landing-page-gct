<script setup lang="ts">
import ContactForm from '~/components/ui/ContactForm.vue'
import StickyContextBar from '~/components/ui/StickyContextBar.vue'
import { pillars } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localizedTo = useLocalizedTo()
const route = useRoute()

// When arriving from a pillar/service page (?servicio=<relatedSlug>), the
// go-back capsule returns to that pillar; otherwise it falls back to Home.
const originPillar = computed(() =>
  pillars.find(p => p.relatedSlug === route.query.servicio) ?? null
)
const backTo = computed(() =>
  originPillar.value ? `/pilares/${originPillar.value.id}` : '/'
)
const backLabel = computed(() =>
  originPillar.value ? t(`pillars.items.${originPillar.value.id}.title`) : t('breadcrumb.home')
)

const pageTitle = computed(() => t('contactPage.seoTitle'))
const pageDescription = computed(() => t('contactPage.seoDescription'))

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
          { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${siteConfig.url}/contacto` }
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
        <span class="text-white/90">{{ t('contactPage.breadcrumb') }}</span>
      </nav>
      <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ t('contactPage.hero.eyebrow') }}</p>
      <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        {{ t('contactPage.hero.title') }}
      </h1>
      <p class="mt-4 max-w-3xl text-xl leading-8 text-white/80">
        {{ t('contactPage.hero.description') }}
      </p>
    </div>
  </section>

  <StickyContextBar
    :label="t('contactPage.breadcrumb')"
    :sublabel="originPillar ? t(`pillars.items.${originPillar.id}.title`) : undefined"
    :back-to="localizedTo(backTo)"
    :back-label="backLabel"
  />

  <section class="bg-core-mist py-16 md:py-24">
    <div class="section-shell">
      <div v-reveal class="mx-auto max-w-2xl rounded-xl border border-core-line bg-white p-8 shadow-premium">
        <h2 class="font-display text-2xl font-extrabold text-core-ink">{{ t('contactPage.form.title') }}</h2>
        <p class="mt-2 mb-6 text-slate-600">{{ t('contactPage.form.description') }}</p>
        <ContactForm />
      </div>
    </div>
  </section>
</template>

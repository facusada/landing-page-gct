<script setup lang="ts">
import BusinessOutcomes from '~/components/sections/BusinessOutcomes.vue'
import FeaturedInnovation from '~/components/sections/FeaturedInnovation.vue'
import TransformationImperative from '~/components/sections/TransformationImperative.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'
import StickyContextBar from '~/components/ui/StickyContextBar.vue'
import { findL3ServiceByKey, pillars, pillarServiceKeys } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t } = useI18n()
const localizedTo = useLocalizedTo()
const route = useRoute()
const slug = route.params.slug as string

const pillar = pillars.find(p => p.id === slug)

if (!pillar) {
  throw createError({ statusCode: 404, statusMessage: 'Pilar no encontrado' })
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

const serviceKeys = (pillarServiceKeys[slug] ?? []).map((key) => {
  const landing = findL3ServiceByKey(slug, key)
  return { key, to: landing ? `/pilares/${slug}/${landing.slug}` : undefined }
})
const title = computed(() => t(`pillars.items.${slug}.title`))
const description = computed(() => t(`pillars.items.${slug}.description`))

useSeoMeta({
  title: computed(() => `${title.value} | ${t('pillars.eyebrow')}`),
  description,
  ogTitle: computed(() => `${title.value} | ${siteConfig.name}`),
  ogDescription: description,
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: `${siteConfig.url}/pilares/${slug}` }]
})

const otherPillars = pillars.filter(p => p.id !== slug)

// One featured SAP innovation per pillar (data-driven, reusable via props)
const featuredByPillar: Record<string, { badge: string; title: string; description: string; visualType: string; accent: string }> = {
  transform: {
    badge: "What's New",
    title: 'RISE with SAP',
    description: 'A single, guided path to S/4HANA Cloud — infrastructure, migration tooling and business transformation services bundled in one subscription.',
    visualType: 'transform',
    accent: 'orange'
  },
  secure: {
    badge: "What's New",
    title: 'SAP Identity Access Governance',
    description: 'Cloud-native access governance for SAP — automated provisioning, real-time Segregation of Duties analysis and continuous risk monitoring.',
    visualType: 'identity',
    accent: 'blue'
  },
  govern: {
    badge: "What's New",
    title: 'SAP Cloud ALM',
    description: 'One lifecycle hub to plan, implement and govern every SAP solution across your landscape — with built-in best-practice processes.',
    visualType: 'governance',
    accent: 'blue'
  },
  operate: {
    badge: "What's New",
    title: 'SAP Cloud Operations',
    description: 'Proactive, AI-assisted operations for SAP — unified observability, automated remediation and SLA-driven service management out of the box.',
    visualType: 'cloud',
    accent: 'blue'
  },
  innovate: {
    badge: "What's New",
    title: 'SAP Joule',
    description: "SAP's generative-AI copilot — natural-language insights and task automation embedded directly across your SAP applications.",
    visualType: 'ai',
    accent: 'orange'
  }
}

const featured = computed(() => {
  const f = featuredByPillar[slug]
  if (!f) return null
  return { ...f, ctaLabel: 'Learn more', ctaHref: localizedTo(`/contacto?servicio=${pillar.relatedSlug}`) }
})

// Pillars that have the full Level-2 document treatment (hero copy + services
// heading override). The copy itself lives in i18n (locales/en|es.json).
const docPillars = ['transform', 'secure']

// Optional hero override: doc-specific headline / subheadline / CTAs.
const heroOverride = computed(() => {
  if (!docPillars.includes(slug)) return null
  return {
    headline: t(`pillarDetail.hero.${slug}.headline`),
    subheadline: t(`pillarDetail.hero.${slug}.subheadline`),
    primaryCta: t(`pillarDetail.hero.${slug}.primaryCta`),
    secondaryCta: t(`pillarDetail.hero.${slug}.secondaryCta`)
  }
})

// Services section heading (per-pillar override, falls back to the shared one).
const servicesHeading = computed(() =>
  docPillars.includes(slug)
    ? t(`pillarDetail.servicesTitleByPillar.${slug}`)
    : t('pillarDetail.servicesTitle')
)

// Business Outcomes (Section 6) — ordered keys live here, copy lives in i18n.
const outcomeKeysByPillar: Record<string, string[]> = {
  transform: ['risk', 'value', 'security', 'architecture', 'visibility'],
  secure: ['accessRisk', 'compliance', 'auditReady', 'emergencyAccess', 'roleArchitecture', 'operationalExposure', 'visibility']
}
const outcomesTitle = computed(() =>
  outcomeKeysByPillar[slug] ? t(`pillarDetail.outcomes.${slug}.title`) : ''
)
const outcomes = computed(() =>
  (outcomeKeysByPillar[slug] ?? []).map(k => ({
    title: t(`pillarDetail.outcomes.${slug}.items.${k}.title`),
    description: t(`pillarDetail.outcomes.${slug}.items.${k}.description`)
  }))
)

// Transformation Imperative (Section 2) — pressure keys + icons here, copy in i18n.
const pressuresByPillar: Record<string, { key: string; icon: string }[]> = {
  transform: [
    { key: 'legacy', icon: 'server' },
    { key: 'complexity', icon: 'layers' },
    { key: 'debt', icon: 'alert' },
    { key: 'security', icon: 'shield' },
    { key: 'cloud', icon: 'cloud' },
    { key: 'insights', icon: 'chart' },
    { key: 'ai', icon: 'ai' }
  ],
  secure: [
    { key: 'authorization', icon: 'layers' },
    { key: 'excessAccess', icon: 'alert' },
    { key: 'sod', icon: 'shield' },
    { key: 'provisioning', icon: 'server' },
    { key: 'emergencyAccess', icon: 'shield' },
    { key: 'audit', icon: 'chart' },
    { key: 'roleComplexity', icon: 'cloud' },
    { key: 'monitoring', icon: 'chart' }
  ]
}
const imperative = computed(() => {
  const list = pressuresByPillar[slug]
  if (!list) return null
  return {
    title: t(`pillarDetail.imperative.${slug}.title`),
    intro: t(`pillarDetail.imperative.${slug}.intro`),
    pressures: list.map(p => ({
      label: t(`pillarDetail.imperative.${slug}.pressures.${p.key}`),
      icon: p.icon
    })),
    closing: t(`pillarDetail.imperative.${slug}.closing`),
    highlight: t(`pillarDetail.imperative.${slug}.highlight`)
  }
})
</script>

<template>
  <div v-if="pillar">
    <StickyContextBar
      :label="t('pillarDetail.eyebrow')"
      :sublabel="title"
      :back-to="localizedTo('/')"
      :back-label="t('breadcrumb.home')"
    />
    <!-- Hero -->
    <section
      class="relative isolate overflow-hidden py-16 text-white md:py-32"
      :class="slug === 'transform' || slug === 'secure' || slug === 'operate' || slug === 'govern' || slug === 'innovate' ? 'bg-[#060e18]' : 'bg-core-ink'"
      :style="slug !== 'transform' && slug !== 'secure' && slug !== 'operate' && slug !== 'govern' && slug !== 'innovate' ? { backgroundImage: `url('${pillar.image}')`, backgroundSize: 'cover', backgroundPosition: pillar.bgPosition ?? 'center' } : undefined"
    >
      <img v-if="slug === 'transform'" src="/backgrounds/transform-hero.png" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'secure'" src="/backgrounds/secure-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'operate'" src="/backgrounds/operate-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'govern'" src="/backgrounds/govern-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'innovate'" src="/backgrounds/innovate-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <div v-else class="absolute inset-0 bg-core-ink/80" />
      <div class="absolute inset-0 -z-10 bg-core-orange/5" aria-hidden="true" />
      <ParticleField v-if="slug === 'transform' || slug === 'secure' || slug === 'operate' || slug === 'govern' || slug === 'innovate'" class="-z-10" />
      <div class="section-shell relative">
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ t('pillarDetail.eyebrow') }}
        </p>
        <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
          {{ heroOverride ? heroOverride.headline : title }}
        </h1>
        <p class="mt-4 max-w-2xl text-xl leading-8 text-white/80">
          {{ heroOverride ? heroOverride.subheadline : description }}
        </p>
        <div v-if="heroOverride" class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton :to="`/contacto?servicio=${pillar.relatedSlug}`">{{ heroOverride.primaryCta }}</BaseButton>
          <BaseButton href="#related-services" variant="secondary">{{ heroOverride.secondaryCta }}</BaseButton>
        </div>
      </div>
      <div id="hero-sentinel" class="absolute bottom-0" aria-hidden="true" />
    </section>

    <!-- Featured Innovation -->
    <FeaturedInnovation v-if="featured" v-bind="featured" />

    <!-- Transformation Imperative (strategic "why transform now") -->
    <TransformationImperative v-if="imperative" v-bind="imperative" />

    <!-- Services grid -->
    <section id="related-services" class="bg-section-light py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="mb-12">
          <h2 class="font-display text-3xl font-extrabold text-core-ink">
            {{ servicesHeading }}
          </h2>
          <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            {{ t('pillarDetail.servicesDescription') }}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <template v-for="(item, index) in serviceKeys" :key="item.key">
            <NuxtLink
              v-if="item.to"
              :to="localizedTo(item.to)"
              v-reveal="{ delay: Math.min(index * 90, 360), distance: 30, duration: 760 }"
              class="group flex h-full flex-col rounded-xl border border-core-line bg-white/30 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
            >
              <div class="mb-1 flex items-center gap-2">
                <span class="shrink-0 font-display text-xs font-extrabold text-core-orange/60">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <h3 class="font-display text-lg font-extrabold leading-snug text-core-ink">
                {{ t(`pillarDetail.items.${slug}.${item.key}.title`) }}
              </h3>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ t(`pillarDetail.items.${slug}.${item.key}.description`) }}
              </p>
              <p class="mt-auto pt-4 text-xs font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
                {{ t('pillarDetail.relatedServiceCta') }} →
              </p>
            </NuxtLink>
            <div
              v-else
              v-reveal="{ delay: Math.min(index * 90, 360), distance: 30, duration: 760 }"
              class="rounded-xl border border-core-line bg-white/30 p-6"
            >
              <div class="mb-1 flex items-center gap-2">
                <span class="shrink-0 font-display text-xs font-extrabold text-core-orange/60">{{ String(index + 1).padStart(2, '0') }}</span>
              </div>
              <h3 class="font-display text-lg font-extrabold leading-snug text-core-ink">
                {{ t(`pillarDetail.items.${slug}.${item.key}.title`) }}
              </h3>
              <p class="mt-3 text-sm leading-6 text-slate-600">
                {{ t(`pillarDetail.items.${slug}.${item.key}.description`) }}
              </p>
            </div>
          </template>
        </div>

        <div v-reveal="{ delay: 200 }" class="mt-12">
          <BaseButton :to="`/contacto?servicio=${pillar.relatedSlug}`">
            {{ t('pillarDetail.contactCta') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Business Outcomes (pillar-level) -->
    <BusinessOutcomes
      v-if="outcomes.length"
      :title="outcomesTitle"
      :outcomes="outcomes"
    />

    <!-- Other pillars -->
    <section class="bg-white/30 py-16 md:py-20">
      <div class="section-shell">
        <h2 v-reveal class="text-center font-display text-2xl font-extrabold text-core-ink">
          {{ t('pillars.eyebrow') }}
        </h2>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <NuxtLink
            v-for="(other, index) in otherPillars"
            :key="other.id"
            :to="localizedTo(other.to)"
            v-reveal="{ delay: Math.min(index * 80, 320), distance: 24 }"
            :style="{ backgroundImage: `url('${other.image}')`, backgroundPosition: other.bgPosition ?? 'center' }"
            class="group relative h-[180px] overflow-hidden rounded-xl bg-cover bg-center transition duration-200 hover:-translate-y-1 hover:shadow-lift"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-core-ink/80 to-core-ink/30" />
            <div class="absolute inset-0 flex flex-col justify-between p-4">
              <span class="font-display text-xs font-extrabold text-white/50">{{ other.index }}</span>
              <div>
                <h3 class="font-display text-base font-extrabold text-white">
                  {{ t(`pillars.items.${other.id}.title`) }}
                </h3>
                <p class="mt-1 text-xs font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
                  {{ t('pillars.learnMore') }}
                </p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

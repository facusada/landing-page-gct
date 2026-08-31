<script setup lang="ts">
import BusinessOutcomes from '~/components/sections/BusinessOutcomes.vue'
import FeaturedInnovation from '~/components/sections/FeaturedInnovation.vue'
import PillarFramework from '~/components/sections/PillarFramework.vue'
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

const otherPillars = pillars.filter(p => p.id !== slug)

// Pillars whose hero uses a full-bleed banner image. All banners share the
// same ~3.617:1 aspect ratio, so on desktop the hero uses that ratio and every
// pillar renders at the same height with the image filling edge to edge.
const imageHeroPillars = ['transform', 'secure', 'operate', 'govern', 'innovate']
const isImageHero = imageHeroPillars.includes(slug)
const heroAspectClass = 'md:aspect-[3936/1088]'

// One featured SAP innovation per pillar (data-driven, reusable via props)
// Three rotating "What's New" SAP innovations per pillar (carousel).
type FeaturedItem = { badge: string; title: string; description: string; accent: string }
const featuredByPillar: Record<string, FeaturedItem[]> = {
  transform: [
    {
      badge: "What's New",
      title: 'RISE with SAP',
      description: 'A single, guided path to S/4HANA Cloud — infrastructure, migration tooling and business transformation services bundled in one subscription.',
      accent: 'orange'
    },
    {
      badge: "What's New",
      title: 'GROW with SAP',
      description: 'The fast-track adoption offering for S/4HANA Cloud Public Edition — preconfigured best practices, guided onboarding and built-in extensibility.',
      accent: 'blue'
    },
    {
      badge: "What's New",
      title: 'SAP Signavio',
      description: 'Process intelligence to analyze, redesign and continuously improve business processes before and during your S/4HANA transformation.',
      accent: 'orange'
    }
  ],
  secure: [
    {
      badge: "What's New",
      title: 'SAP Identity Access Governance',
      description: 'Cloud-native access governance for SAP — automated provisioning, real-time Segregation of Duties analysis and continuous risk monitoring.',
      accent: 'blue'
    },
    {
      badge: "What's New",
      title: 'SAP Cloud Identity Services',
      description: 'Centralized authentication and provisioning for SAP cloud and hybrid landscapes, with single sign-on and full identity lifecycle management.',
      accent: 'orange'
    },
    {
      badge: "What's New",
      title: 'SAP Access Control',
      description: 'Automated access-risk analysis, role management and emergency access, keeping Segregation of Duties under continuous control.',
      accent: 'blue'
    }
  ],
  govern: [
    {
      badge: "What's New",
      title: 'SAP Cloud ALM',
      description: 'One lifecycle hub to plan, implement and govern every SAP solution across your landscape — with built-in best-practice processes.',
      accent: 'blue'
    },
    {
      badge: "What's New",
      title: 'SAP LeanIX',
      description: 'Enterprise architecture management to map your SAP and non-SAP landscape and govern transformation decisions with data.',
      accent: 'orange'
    },
    {
      badge: "What's New",
      title: 'SAP Signavio Process Governance',
      description: 'Standardize and govern process changes with workflow-driven approvals, clear ownership and full traceability.',
      accent: 'blue'
    }
  ],
  operate: [
    {
      badge: "What's New",
      title: 'SAP Cloud Operations',
      description: 'Proactive, AI-assisted operations for SAP — unified observability, automated remediation and SLA-driven service management out of the box.',
      accent: 'blue'
    },
    {
      badge: "What's New",
      title: 'SAP Cloud ALM for Operations',
      description: 'Unified operations monitoring, health checks and alerting across your SAP cloud and hybrid landscape.',
      accent: 'orange'
    },
    {
      badge: "What's New",
      title: 'SAP Focused Run',
      description: 'High-volume monitoring, alerting and root-cause analysis for large-scale, mission-critical SAP operations.',
      accent: 'blue'
    }
  ],
  innovate: [
    {
      badge: "What's New",
      title: 'SAP Joule',
      description: "SAP's generative-AI copilot — natural-language insights and task automation embedded directly across your SAP applications.",
      accent: 'orange'
    },
    {
      badge: "What's New",
      title: 'SAP Build',
      description: 'Low-code tools to build apps, automate processes and design business sites — extending SAP without deep custom code.',
      accent: 'blue'
    },
    {
      badge: "What's New",
      title: 'SAP Business AI',
      description: 'Embedded and generative AI across SAP applications, with the Generative AI Hub on SAP BTP for building trusted AI use cases.',
      accent: 'orange'
    }
  ]
}

const featured = computed(() => {
  const list = featuredByPillar[slug]
  if (!list) return null
  const ctaHref = localizedTo(`/contacto?servicio=${pillar.relatedSlug}`)
  return list.map(f => ({ ...f, ctaLabel: 'Learn more', ctaHref }))
})

// Pillars that have the full Level-2 document treatment (hero copy + services
// heading override). The copy itself lives in i18n (locales/en|es.json).
const docPillars = ['transform', 'secure', 'govern', 'innovate', 'operate']

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
  secure: ['accessRisk', 'compliance', 'auditReady', 'emergencyAccess', 'roleArchitecture', 'operationalExposure', 'visibility'],
  govern: ['visibility', 'control', 'accountability', 'risk', 'reporting', 'consumption', 'decisions'],
  innovate: ['fasterInnovation', 'cleanerArchitecture', 'betterIntegration', 'higherAutomation', 'aiAdoption', 'dataVisibility', 'scalable'],
  operate: ['availability', 'incidentResolution', 'risk', 'visibility', 'performance', 'improvement', 'scalable']
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
  ],
  govern: [
    { key: 'visibility', icon: 'chart' },
    { key: 'reporting', icon: 'layers' },
    { key: 'ownership', icon: 'shield' },
    { key: 'control', icon: 'alert' },
    { key: 'methodology', icon: 'server' },
    { key: 'decisionSupport', icon: 'star' },
    { key: 'alignment', icon: 'cloud' },
    { key: 'measurement', icon: 'chart' }
  ],
  innovate: [
    { key: 'legacyArch', icon: 'server' },
    { key: 'customCode', icon: 'alert' },
    { key: 'integration', icon: 'layers' },
    { key: 'btpAdoption', icon: 'cloud' },
    { key: 'aiUseCases', icon: 'star' },
    { key: 'cleanCore', icon: 'shield' },
    { key: 'dataProcesses', icon: 'chart' },
    { key: 'governance', icon: 'shield' }
  ],
  operate: [
    { key: 'complexity', icon: 'layers' },
    { key: 'reactive', icon: 'alert' },
    { key: 'incidentOverload', icon: 'alert' },
    { key: 'visibility', icon: 'chart' },
    { key: 'performanceRisk', icon: 'server' },
    { key: 'fragmentedSupport', icon: 'cloud' },
    { key: 'governance', icon: 'shield' },
    { key: 'measurement', icon: 'chart' }
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

// Pillar Framework (Section 3) — ordered stage keys here, copy lives in i18n.
const frameworkStagesByPillar: Record<string, string[]> = {
  govern: ['align', 'structure', 'control', 'report', 'decide'],
  innovate: ['discover', 'design', 'build', 'integrate', 'scale'],
  operate: ['stabilize', 'support', 'monitor', 'optimize', 'improve']
}
const framework = computed(() => {
  const list = frameworkStagesByPillar[slug]
  if (!list) return null
  return {
    eyebrow: t(`pillarDetail.framework.${slug}.eyebrow`),
    title: t(`pillarDetail.framework.${slug}.title`),
    intro: t(`pillarDetail.framework.${slug}.intro`),
    stages: list.map(k => ({
      name: t(`pillarDetail.framework.${slug}.stages.${k}.name`),
      description: t(`pillarDetail.framework.${slug}.stages.${k}.description`)
    }))
  }
})
</script>

<template>
  <div v-if="pillar">
    <!-- Hero -->
    <section
      class="relative isolate overflow-hidden py-16 text-white"
      :class="isImageHero ? `bg-[#060e18] md:flex md:flex-col md:justify-center md:py-0 ${heroAspectClass}` : 'bg-core-ink md:py-32'"
      :style="slug !== 'transform' && slug !== 'secure' && slug !== 'operate' && slug !== 'govern' && slug !== 'innovate' ? { backgroundImage: `url('${pillar.image}')`, backgroundSize: 'cover', backgroundPosition: pillar.bgPosition ?? 'center' } : undefined"
    >
      <img v-if="slug === 'transform'" src="/backgrounds/transform-hero.webp" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'secure'" src="/backgrounds/secure-hero.webp" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'operate'" src="/backgrounds/operate-hero.webp" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'govern'" src="/backgrounds/govern-hero.webp" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'innovate'" src="/backgrounds/innovate-hero.webp" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <div v-else class="absolute inset-0 bg-core-ink/80" />
      <div class="absolute inset-0 -z-10 bg-core-orange/5" aria-hidden="true" />
      <ParticleField v-if="slug === 'transform' || slug === 'secure' || slug === 'operate' || slug === 'govern' || slug === 'innovate'" class="-z-10" />
      <div class="section-shell relative">
        <!-- Dark scrim confined to the copy block itself so the rest of the
             imagery stays untouched. -->
        <div :class="isImageHero ? 'w-fit max-w-3xl rounded-2xl bg-[#060e18]/5 p-6 backdrop-blur-[2px] md:-ml-8 md:p-8' : ''">
          <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange [text-shadow:0_0_3px_rgba(6,14,24,1),0_0_9px_rgba(6,14,24,0.95),0_0_20px_rgba(6,14,24,0.85)]">
            {{ t('pillarDetail.eyebrow') }}
          </p>
          <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl [text-shadow:0_0_4px_rgba(6,14,24,1),0_0_14px_rgba(6,14,24,0.95),0_0_30px_rgba(6,14,24,0.9),0_0_48px_rgba(6,14,24,0.75)]">
            {{ heroOverride ? heroOverride.headline : title }}
          </h1>
          <p class="mt-4 max-w-2xl text-xl leading-8 text-white/90 [text-shadow:0_0_3px_rgba(6,14,24,1),0_0_11px_rgba(6,14,24,0.95),0_0_24px_rgba(6,14,24,0.85)]">
            {{ heroOverride ? heroOverride.subheadline : description }}
          </p>
          <div v-if="heroOverride" class="mt-9 flex flex-col gap-3 sm:flex-row">
            <BaseButton :to="`/contacto?servicio=${pillar.relatedSlug}`">{{ heroOverride.primaryCta }}</BaseButton>
            <BaseButton href="#related-services" variant="secondary">{{ heroOverride.secondaryCta }}</BaseButton>
          </div>
        </div>
      </div>
      <div id="hero-sentinel" class="absolute bottom-0" aria-hidden="true" />
    </section>

    <StickyContextBar
      :label="t('pillarDetail.eyebrow')"
      :sublabel="title"
      :back-to="localizedTo('/')"
      :back-label="t('breadcrumb.home')"
    />

    <!-- Featured Innovation -->
    <FeaturedInnovation v-if="featured" :items="featured" />

    <!-- Transformation Imperative (strategic "why transform now") -->
    <TransformationImperative v-if="imperative" v-bind="imperative" />

    <!-- Pillar Framework (Section 3 — staged operating model) -->
    <PillarFramework v-if="framework" v-bind="framework" />

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
              <p class="mt-auto pt-5">
                <span class="inline-flex items-center gap-1.5 rounded-full border border-core-orange/40 bg-core-orange/5 px-4 py-2 text-xs font-bold text-core-orange transition duration-200 group-hover:border-core-orange group-hover:bg-core-orange group-hover:text-white">
                  {{ t('pillarDetail.relatedServiceCta') }}
                  <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </span>
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

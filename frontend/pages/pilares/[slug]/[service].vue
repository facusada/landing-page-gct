<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'
import ServiceIcon from '~/components/ui/ServiceIcon.vue'
import StickyContextBar from '~/components/ui/StickyContextBar.vue'
import { findL3Service, findL3ServiceByKey, pillars, pillarServiceKeys } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t, tm, rt } = useI18n()
const localizedTo = useLocalizedTo()
const route = useRoute()

const pillarSlug = route.params.slug as string
const serviceSlug = route.params.service as string

const pillar = pillars.find(p => p.id === pillarSlug)
const service = findL3Service(pillarSlug, serviceSlug)

if (!pillar || !service) {
  throw createError({ statusCode: 404, statusMessage: 'Servicio no encontrado' })
}

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

const base = `serviceDetail.items.${serviceSlug}`

// vue-i18n returns compiled message nodes for nested object arrays; resolve each leaf with rt().
const resolve = (v: unknown): string => (typeof v === 'string' ? v : rt(v as Parameters<typeof rt>[0]))
const objectList = (key: string) =>
  (tm(`${base}.${key}`) as Record<string, unknown>[]).map(o => o)

const heroSubtitle = computed(() => t(`${base}.heroSubtitle`))
const h1 = computed(() => t(`${base}.h1`))
const eyebrow = computed(() => t(`${base}.eyebrow`))

const problemItems = computed(() =>
  objectList('problem.items').map(o => ({ title: resolve(o.title), description: resolve(o.description) }))
)
const howItems = computed(() =>
  objectList('howWeHelp.items').map(o => ({ title: resolve(o.title), description: resolve(o.description) }))
)
const benefitItems = computed(() =>
  objectList('benefits.items').map(o => ({ title: resolve(o.title), description: resolve(o.description) }))
)
const methodologyPhases = computed(() =>
  objectList('methodology.phases').map(o => ({ name: resolve(o.name), deliverable: resolve(o.deliverable) }))
)
const whyItems = computed(() =>
  objectList('whyGct.items').map(o => ({ title: resolve(o.title), description: resolve(o.description) }))
)
const engagementScenarioItems = computed(() =>
  objectList('engagementScenarios.items').map(o => ({ title: resolve(o.title), description: resolve(o.description) }))
)
const methodologyColsClass = computed(() => {
  const n = methodologyPhases.value.length
  // 6 phases render as a balanced 3x2 grid instead of an orphaned 5+1 row.
  return n === 6 ? 'md:grid-cols-3' : n === 5 ? 'md:grid-cols-5' : n === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
})

const pillarTitle = computed(() => t(`pillars.items.${pillarSlug}.title`))

const pillarHeroBg: Record<string, string> = {
  transform: '/backgrounds/transform-hero.webp',
  secure: '/backgrounds/secure-hero.webp',
  operate: '/backgrounds/operate-hero.webp',
  govern: '/backgrounds/govern-hero.webp',
  innovate: '/backgrounds/innovate-hero.webp',
}
// Per-service hero photos override the pillar default once a dedicated image exists for that service.
const serviceHeroBg: Record<string, string> = {
  'rise-with-sap': '/backgrounds/transform-rise-with-sap-hero.webp',
  's4hana-readiness-assessment': '/backgrounds/transform-readiness-assessment-hero.webp',
  'sap-s4hana-transformation': '/backgrounds/transform-s4hana-transformation-hero.webp',
  'sap-migration-governance': '/backgrounds/transform-migration-governance-hero.webp',
  'clean-core-strategy': '/backgrounds/transform-clean-core-strategy-hero.webp',
}
const heroBgSrc = serviceHeroBg[serviceSlug] ?? pillarHeroBg[pillarSlug] ?? null
// WebP heros are panoramic photos that fill the whole band (object-cover);
// the SVG heros are tall compositions pinned to the top with a bottom fade.
const heroBgCover = heroBgSrc?.endsWith('.webp') ?? false

const related = (pillarServiceKeys[pillarSlug] ?? [])
  .filter(key => key !== service.key)
  .map((key) => {
    const landing = findL3ServiceByKey(pillarSlug, key)
    return {
      key,
      to: landing ? `/pilares/${pillarSlug}/${landing.slug}` : `/pilares/${pillarSlug}`,
      hasLanding: !!landing
    }
  })

// These slugs have no downloadable PDF resource, which affects three things:
// their finalCta.ctaSecondary copy reads as "speak with an expert" rather than
// "explore the pillar" (so it must route to contact, not back to the pillar),
// their Hero must not show a "Download ..." CTA that leads nowhere, and the
// Lead Magnet section (a download pitch) is hidden entirely until a real PDF exists.
const noResourceSlugs = new Set([
  'rise-with-sap',
  's4hana-readiness-assessment',
  'sap-migration-governance',
  'clean-core-strategy',
  'sap-security-assessment',
  'sap-grc-access-control',
  'sap-segregation-of-duties',
  'sap-role-redesign',
  'sap-emergency-access-management',
  'sap-security-managed-services',
  'sap-s4hana-security-readiness',
  'sap-ams-services',
  'sap-basis-operations',
  'sap-technical-monitoring',
  'sap-incident-problem-management',
  'sap-performance-availability',
  'sap-cloud-alm-operations',
  'sap-operations-hub',
  'sap-pmo-project-governance',
  'sap-program-management',
  'sap-service-governance',
  'sap-delivery-governance',
  'sap-compliance-control-framework',
  'sap-kpi-executive-reporting',
  'sap-methodology-advisory',
  'sap-business-ai-platform-advisory',
  'sap-integration-suite',
  'sap-ai-automation',
  'sap-extension-development',
  'sap-clean-core-innovation',
  'sap-data-analytics',
  'sap-intelligent-agents'
])
const finalCtaSecondaryTo = computed(() =>
  noResourceSlugs.has(serviceSlug)
    ? `/contacto?servicio=${pillar?.relatedSlug ?? serviceSlug}`
    : `/pilares/${pillarSlug}`
)
const showHeroResourceCta = computed(() => !noResourceSlugs.has(serviceSlug))
// The Lead Magnet section is a "download this resource" pitch; hide it whenever
// there is no real downloadable PDF behind it.
const showLeadMagnet = computed(() => !noResourceSlugs.has(serviceSlug))

const canonical = `${siteConfig.url}/pilares/${pillarSlug}/${serviceSlug}`

useSeoMeta({
  title: computed(() => t(`${base}.metaTitle`)),
  description: computed(() => t(`${base}.metaDescription`)),
  ogTitle: computed(() => t(`${base}.metaTitle`)),
  ogDescription: computed(() => t(`${base}.metaDescription`)),
  ogType: 'website'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: h1.value,
        serviceType: t(`pillarDetail.items.${pillarSlug}.${service.key}.title`),
        description: t(`${base}.metaDescription`),
        provider: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
        areaServed: 'Latin America',
        url: canonical
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: siteConfig.url },
          { '@type': 'ListItem', position: 2, name: pillarTitle.value, item: `${siteConfig.url}/pilares/${pillarSlug}` },
          { '@type': 'ListItem', position: 3, name: h1.value, item: canonical }
        ]
      })
    }
  ]
})
</script>

<template>
  <div v-if="service">
    <!-- 1. Hero -->
    <section
      class="relative isolate overflow-hidden py-16 text-white md:py-32"
      :class="heroBgSrc ? 'bg-[#060e18]' : 'bg-core-ink'"
      :style="!heroBgSrc ? { backgroundImage: `url('${service.image}')`, backgroundSize: 'cover', backgroundPosition: service.bgPosition ?? pillar?.bgPosition ?? 'center' } : undefined"
    >
      <img v-if="heroBgCover" :src="heroBgSrc!" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <div v-else-if="heroBgSrc" class="absolute inset-x-0 top-0 -z-20">
        <img :src="heroBgSrc" class="w-full" aria-hidden="true" />
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#060e18]" />
      </div>
      <div v-else class="absolute inset-0 bg-core-ink/85" />
      <ParticleField v-if="heroBgSrc" class="-z-10" />
      <div class="section-shell relative">
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange [text-shadow:0_0_3px_rgba(6,14,24,1),0_0_9px_rgba(6,14,24,0.95),0_0_20px_rgba(6,14,24,0.85)]">{{ eyebrow }}</p>
        <h1 class="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-tight md:text-6xl [text-shadow:0_0_4px_rgba(6,14,24,1),0_0_14px_rgba(6,14,24,0.95),0_0_30px_rgba(6,14,24,0.9),0_0_48px_rgba(6,14,24,0.75)]">
          {{ h1 }}
        </h1>
        <p class="mt-5 max-w-3xl text-xl leading-8 text-white/90 [text-shadow:0_0_3px_rgba(6,14,24,1),0_0_11px_rgba(6,14,24,0.95),0_0_24px_rgba(6,14,24,0.85)]">
          {{ heroSubtitle }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton :to="`/contacto?servicio=${pillar?.relatedSlug ?? serviceSlug}`">{{ t(`${base}.ctaPrimary`) }}</BaseButton>
          <BaseButton v-if="showHeroResourceCta" href="#recurso" variant="secondary">{{ t(`${base}.ctaSecondary`) }}</BaseButton>
        </div>
      </div>
      <div id="hero-sentinel" class="absolute bottom-0" aria-hidden="true" />
    </section>

    <StickyContextBar
      :label="pillarTitle"
      :sublabel="t(`pillarDetail.items.${pillarSlug}.${service.key}.title`)"
      :back-to="localizedTo(`/pilares/${pillarSlug}`)"
      :back-label="pillarTitle"
    />

    <!-- 2. Problem -->
    <section id="s-problem" class="bg-white/30 py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal>
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.problem') }}</p>
          <h2 class="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.problem.title`) }}
          </h2>
        </div>

        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <div
            v-for="(item, index) in problemItems"
            :key="item.title"
            v-reveal="{ delay: Math.min(index * 90, 360), distance: 30 }"
            class="rounded-xl border border-core-line bg-white p-6"
          >
            <h3 class="font-display text-lg font-extrabold text-core-ink">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>

        <blockquote v-reveal="{ delay: 200 }" class="mt-12 max-w-3xl border-l-4 border-core-orange pl-6 font-display text-xl font-bold leading-8 text-core-ink md:text-2xl">
          {{ t(`${base}.problem.closing`) }}
        </blockquote>
      </div>
    </section>

    <!-- 3. How We Help -->
    <section id="s-how" class="bg-section-light py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.howWeHelp') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.howWeHelp.title`) }}
          </h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">{{ t(`${base}.howWeHelp.description`) }}</p>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2">
          <div
            v-for="(item, index) in howItems"
            :key="item.title"
            v-reveal="{ delay: Math.min(index * 90, 360), distance: 30 }"
            class="rounded-xl border border-core-line bg-white/30 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
          >
            <span class="font-display text-xs font-extrabold text-core-orange/60">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-1 font-display text-lg font-extrabold leading-snug text-core-ink">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Business Benefits -->
    <section id="s-benefits" class="bg-white/30 py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.benefits') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.benefits.title`) }}
          </h2>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(item, index) in benefitItems"
            :key="item.title"
            v-reveal="{ delay: Math.min(index * 80, 320), distance: 28 }"
            class="rounded-xl border border-core-line bg-white p-6"
          >
            <span class="flex h-9 w-9 items-center justify-center rounded-lg bg-core-cyan/10 text-core-cyan">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
            </span>
            <h3 class="mt-4 font-display text-base font-extrabold leading-snug text-core-ink">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Methodology -->
    <section id="s-methodology" class="bg-section-light py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.methodology') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.methodology.title`) }}
          </h2>
          <p class="mt-4 text-lg leading-8 text-slate-600">{{ t(`${base}.methodology.description`) }}</p>
        </div>

        <ol class="mt-12 grid gap-4" :class="methodologyColsClass">
          <li
            v-for="(phase, index) in methodologyPhases"
            :key="phase.name"
            v-reveal="{ delay: Math.min(index * 90, 400), distance: 24 }"
            class="relative rounded-xl border border-core-line bg-white/30 p-5"
          >
            <span class="font-display text-2xl font-extrabold text-core-orange">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-2 font-display text-lg font-extrabold text-core-ink">{{ phase.name }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ phase.deliverable }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 6. Engagement Scenarios -->
    <section class="bg-white/30 py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.engagementScenarios') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.engagementScenarios.title`) }}
          </h2>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in engagementScenarioItems"
            :key="item.title"
            v-reveal="{ delay: Math.min(index * 80, 360), distance: 28 }"
            class="rounded-xl border border-core-line bg-white p-6"
          >
            <h3 class="font-display text-base font-extrabold text-core-ink">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Why Global Core Technologies -->

    <section class="bg-section-light py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="max-w-3xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('serviceDetail.labels.whyGct') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t(`${base}.whyGct.title`) }}
          </h2>
        </div>

        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in whyItems"
            :key="item.title"
            v-reveal="{ delay: Math.min(index * 80, 360), distance: 28 }"
            class="rounded-xl border border-core-line bg-white p-6"
          >
            <h3 class="font-display text-base font-extrabold text-core-ink">{{ item.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>

        <div v-if="service.platformLink" v-reveal="{ delay: 200 }" class="mt-8">
          <BaseButton :to="service.platformLink" variant="ghost">{{ t('serviceDetail.labels.platformCta') }} →</BaseButton>
        </div>
      </div>
    </section>

    <!-- 8. Lead Magnet -->
    <section v-if="showLeadMagnet" id="recurso" class="relative overflow-hidden bg-core-midnight py-16 text-white md:py-20">
      <div class="absolute inset-0 -z-10 bg-core-grid opacity-30" aria-hidden="true" />
      <div class="section-shell">
        <div v-reveal class="grid gap-8 lg:grid-cols-[1.4fr_.6fr] lg:items-center">
          <div>
            <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t(`${base}.leadMagnet.eyebrow`) }}</p>
            <h2 class="mt-3 max-w-2xl font-display text-2xl font-extrabold leading-tight md:text-3xl">
              {{ t(`${base}.leadMagnet.title`) }}
            </h2>
            <p class="mt-4 max-w-2xl text-lg leading-8 text-white/75">{{ t(`${base}.leadMagnet.description`) }}</p>
          </div>
          <div class="lg:justify-self-end">
            <BaseButton :to="`/contacto?servicio=${pillar?.relatedSlug ?? serviceSlug}&recurso=${serviceSlug}`" class="w-full text-center">
              {{ t(`${base}.leadMagnet.cta`) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. Related services -->
    <section class="bg-section-light py-16 md:py-20">
      <div class="section-shell">
        <h2 v-reveal class="font-display text-2xl font-extrabold text-core-ink md:text-3xl">
          {{ t('serviceDetail.labels.related') }}
        </h2>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NuxtLink
            v-for="(item, index) in related"
            :key="item.key"
            :to="localizedTo(item.to)"
            v-reveal="{ delay: Math.min(index * 80, 320), distance: 24 }"
            class="group flex h-full flex-col rounded-xl border border-core-line bg-white/30 p-5 transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-lift"
          >
            <h3 class="font-display text-base font-extrabold text-core-ink">
              {{ t(`pillarDetail.items.${pillarSlug}.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              {{ t(`pillarDetail.items.${pillarSlug}.${item.key}.description`) }}
            </p>
            <p class="mt-auto pt-5">
              <span class="inline-flex items-center gap-1.5 rounded-full border border-core-orange/40 bg-core-orange/5 px-4 py-2 text-xs font-bold text-core-orange transition duration-200 group-hover:border-core-orange group-hover:bg-core-orange group-hover:text-white">
                {{ item.hasLanding ? t('serviceDetail.labels.relatedCta') : t('serviceDetail.labels.backToPillar') }}
                <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </span>
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 10. Final CTA -->
    <section class="relative overflow-hidden bg-core-ink py-20 text-white md:py-24">
      <div class="absolute inset-0 -z-10 bg-gradient-to-b from-core-ink to-core-midnight" aria-hidden="true" />
      <div v-reveal class="section-shell max-w-3xl text-center">
        <h2 class="font-display text-3xl font-extrabold leading-tight md:text-5xl">
          {{ t(`${base}.finalCta.title`) }}
        </h2>
        <p class="mx-auto mt-5 max-w-2xl text-xl leading-8 text-white/80">
          {{ t(`${base}.finalCta.description`) }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <BaseButton :to="`/contacto?servicio=${pillar?.relatedSlug ?? serviceSlug}`">{{ t(`${base}.finalCta.ctaPrimary`) }}</BaseButton>
          <BaseButton :to="finalCtaSecondaryTo" variant="secondary">{{ t(`${base}.finalCta.ctaSecondary`) }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

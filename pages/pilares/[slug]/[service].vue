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
const methodologyColsClass = computed(() => {
  const n = methodologyPhases.value.length
  return n >= 5 ? 'md:grid-cols-5' : n === 4 ? 'md:grid-cols-4' : 'md:grid-cols-3'
})

const pillarTitle = computed(() => t(`pillars.items.${pillarSlug}.title`))

const pillarHeroBg: Record<string, string> = {
  transform: '/backgrounds/transform-hero.svg',
  secure: '/backgrounds/secure-hero.svg',
  operate: '/backgrounds/operate-hero.svg',
  govern: '/backgrounds/govern-hero.svg',
  innovate: '/backgrounds/innovate-hero.svg',
}
const heroBgSrc = pillarHeroBg[pillarSlug] ?? null

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

const canonical = `${siteConfig.url}/pilares/${pillarSlug}/${serviceSlug}`

useSeoMeta({
  title: computed(() => t(`${base}.metaTitle`)),
  description: computed(() => t(`${base}.metaDescription`)),
  ogTitle: computed(() => t(`${base}.metaTitle`)),
  ogDescription: computed(() => t(`${base}.metaDescription`)),
  ogType: 'website'
})

useHead({
  link: [{ rel: 'canonical', href: canonical }],
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
    <StickyContextBar
      :label="pillarTitle"
      :sublabel="t(`pillarDetail.items.${pillarSlug}.${service.key}.title`)"
      :back-to="localizedTo(`/pilares/${pillarSlug}`)"
      :back-label="pillarTitle"
    />
    <!-- 1. Hero -->
    <section
      class="relative isolate overflow-hidden py-16 text-white md:py-24"
      :class="heroBgSrc ? 'bg-[#060e18]' : 'bg-core-ink'"
      :style="!heroBgSrc ? { backgroundImage: `url('${service.image}')`, backgroundSize: 'cover', backgroundPosition: service.bgPosition ?? pillar?.bgPosition ?? 'center' } : undefined"
    >
      <div v-if="heroBgSrc" class="absolute inset-x-0 top-0 -z-20">
        <img :src="heroBgSrc" class="w-full" aria-hidden="true" />
        <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#060e18]" />
      </div>
      <div v-else class="absolute inset-0 bg-core-ink/85" />
      <ParticleField v-if="heroBgSrc" class="-z-10" />
      <div class="section-shell relative">
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">{{ eyebrow }}</p>
        <h1 class="mt-3 max-w-4xl font-display text-4xl font-extrabold leading-tight md:text-6xl">
          {{ h1 }}
        </h1>
        <p class="mt-5 max-w-3xl text-xl leading-8 text-white/80">
          {{ heroSubtitle }}
        </p>

        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <BaseButton :to="`/contacto?servicio=${serviceSlug}`">{{ t(`${base}.ctaPrimary`) }}</BaseButton>
          <BaseButton href="#recurso" variant="secondary">{{ t(`${base}.ctaSecondary`) }}</BaseButton>
        </div>
      </div>
      <div id="hero-sentinel" class="absolute bottom-0" aria-hidden="true" />
    </section>

    <!-- 2. Problem -->
    <section id="s-problem" class="bg-core-mist py-16 md:py-24">
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
    <section id="s-how" class="bg-white py-16 md:py-24">
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
            class="rounded-xl border border-core-line bg-core-mist p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
          >
            <span class="font-display text-xs font-extrabold text-core-orange/60">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-1 font-display text-lg font-extrabold leading-snug text-core-ink">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Business Benefits -->
    <section id="s-benefits" class="bg-core-mist py-16 md:py-24">
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
    <section id="s-methodology" class="bg-white py-16 md:py-24">
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
            class="relative rounded-xl border border-core-line bg-core-mist p-5"
          >
            <span class="font-display text-2xl font-extrabold text-core-orange">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3 class="mt-2 font-display text-lg font-extrabold text-core-ink">{{ phase.name }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ phase.deliverable }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 6. Why GCT -->

    <section class="bg-core-mist py-16 md:py-24">
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

    <!-- 7. Lead Magnet -->
    <section id="recurso" class="relative overflow-hidden bg-core-midnight py-16 text-white md:py-20">
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
            <BaseButton :to="`/contacto?servicio=${serviceSlug}&recurso=guia-s4hana`" class="w-full text-center">
              {{ t(`${base}.leadMagnet.cta`) }}
            </BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Related services -->
    <section class="bg-white py-16 md:py-20">
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
            class="group flex h-full flex-col rounded-xl border border-core-line bg-core-mist p-5 transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-lift"
          >
            <h3 class="font-display text-base font-extrabold text-core-ink">
              {{ t(`pillarDetail.items.${pillarSlug}.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">
              {{ t(`pillarDetail.items.${pillarSlug}.${item.key}.description`) }}
            </p>
            <p class="mt-auto pt-4 text-xs font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
              {{ item.hasLanding ? t('serviceDetail.labels.relatedCta') : t('serviceDetail.labels.backToPillar') }} →
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 9. Final CTA -->
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
          <BaseButton :to="`/contacto?servicio=${serviceSlug}`">{{ t(`${base}.finalCta.ctaPrimary`) }}</BaseButton>
          <BaseButton :to="`/pilares/${pillarSlug}`" variant="secondary">{{ t(`${base}.finalCta.ctaSecondary`) }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>

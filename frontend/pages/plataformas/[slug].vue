<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'
import { platforms } from '~/data/landing'
import { siteConfig } from '~/data/site'

const { t, tm, rt } = useI18n()
const localizedTo = useLocalizedTo()
const route = useRoute()
const slug = route.params.slug as string

const platform = platforms.find(p => p.slug === slug)

if (!platform) {
  throw createError({ statusCode: 404, statusMessage: 'Plataforma no encontrada' })
}

const id = platform.id

onMounted(() => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
})

type RtMessage = Parameters<typeof rt>[0]

const name = computed(() => t(`platforms.items.${id}.name`))
const type = computed(() => t(`platforms.items.${id}.type`))
const description = computed(() => t(`platforms.items.${id}.description`))
const longDescription = computed(() => t(`platforms.items.${id}.longDescription`))
const capabilities = computed(() =>
  (tm(`platforms.items.${id}.capabilities`) as Array<{ title: RtMessage; description: RtMessage }>).map(c => ({
    title: rt(c.title),
    description: rt(c.description)
  }))
)

const accentText: Record<string, string> = { orange: 'text-core-orange', cyan: 'text-core-cyan' }
const accentTile: Record<string, string> = { orange: 'bg-core-orange/15 text-core-orange', cyan: 'bg-core-cyan/15 text-core-cyan' }
const accentDot: Record<string, string> = { orange: 'bg-core-orange', cyan: 'bg-core-cyan' }

const otherPlatforms = platforms.filter(p => p.slug !== slug)

useSeoMeta({
  title: name,
  description: computed(() => `${description.value} ${t('platformsPage.seoDescriptionSuffix')}`),
  ogTitle: computed(() => `${name.value} | ${siteConfig.name}`),
  ogDescription: description,
  ogType: 'website'
})
</script>

<template>
  <div v-if="platform">
    <!-- Hero -->
    <section class="relative isolate overflow-hidden py-20 text-white md:py-28" :class="slug === 'intelliguard' || slug === 'operations-intelligence' ? 'bg-[#060e18]' : 'bg-core-ink'">
      <img v-if="slug === 'intelliguard'" src="/backgrounds/intelliguard-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <img v-else-if="slug === 'operations-intelligence'" src="/backgrounds/operations-intelligence-hero.svg" class="absolute inset-0 -z-20 h-full w-full object-cover" aria-hidden="true" />
      <div v-else class="absolute inset-0 -z-10 bg-hero-radial opacity-40" aria-hidden="true" />
      <ParticleField v-if="slug === 'intelliguard' || slug === 'operations-intelligence'" class="-z-10" />
      <div class="section-shell">
        <nav class="mb-10 text-sm text-white/60" aria-label="Breadcrumb">
          <NuxtLink :to="localizedTo('/')" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ t('platformsPage.breadcrumb') }}</span>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ name }}</span>
        </nav>

        <div class="max-w-3xl">
          <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white/80">
            <span :class="['h-1.5 w-1.5 rounded-full', accentDot[platform.accent]]" />
            {{ t('platformsPage.statusBadge') }}
          </span>

          <div class="mt-7 flex items-center gap-4">
            <span :class="['flex h-14 w-14 shrink-0 items-center justify-center rounded-xl', accentTile[platform.accent]]">
              <svg class="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-for="path in platform.iconPaths" :key="path" :d="path" />
              </svg>
            </span>
            <div>
              <h1 class="font-display text-4xl font-extrabold leading-tight md:text-6xl">{{ name }}</h1>
              <p :class="['mt-1 text-sm font-bold', accentText[platform.accent]]">{{ type }}</p>
            </div>
          </div>

          <p class="mt-6 max-w-2xl text-xl leading-8 text-white/80">{{ description }}</p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row">
            <BaseButton to="/contacto">{{ t('platformsPage.primaryCta') }}</BaseButton>
            <BaseButton to="/servicios" variant="secondary">{{ t('platformsPage.secondaryCta') }}</BaseButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision / what is it -->
    <section class="relative overflow-hidden bg-white py-20 md:py-28">
      <div class="absolute inset-0 bg-dot-grid opacity-60" aria-hidden="true" />
      <div class="section-shell relative max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('platformsPage.aboutEyebrow') }}</p>
        <h2 v-reveal class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
          {{ t('platformsPage.aboutTitle', { product: name }) }}
        </h2>
        <p v-reveal="{ delay: 120 }" class="mt-6 text-lg leading-8 text-slate-600">
          {{ longDescription }}
        </p>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="bg-core-mist py-20 md:py-28">
      <div class="section-shell">
        <div v-reveal class="max-w-2xl">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('platformsPage.capabilitiesEyebrow') }}</p>
          <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-4xl">
            {{ t('platformsPage.capabilitiesTitle', { product: name }) }}
          </h2>
        </div>
        <div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(capability, index) in capabilities"
            :key="capability.title"
            v-reveal="{ delay: Math.min(index * 100, 400), distance: 36, duration: 820 }"
            class="group rounded-xl border border-core-line bg-white p-6 shadow-[0_2px_12px_rgba(7,17,31,0.05)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/30 hover:shadow-lift"
          >
            <div :class="['mb-4 flex h-11 w-11 items-center justify-center rounded-lg transition-colors', accentTile[platform.accent]]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 class="font-display text-lg font-extrabold text-core-ink">{{ capability.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-slate-600">{{ capability.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-core-ink py-20 text-white md:py-24">
      <div class="absolute inset-0 bg-hero-radial opacity-30" aria-hidden="true" />
      <div v-reveal class="section-shell relative mx-auto max-w-3xl text-center">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('platformsPage.ctaEyebrow') }}</p>
        <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-5xl">
          {{ t('platformsPage.ctaTitle', { product: name }) }}
        </h2>
        <p class="mt-5 text-lg leading-8 text-white/75">
          {{ t('platformsPage.ctaDescription', { product: name }) }}
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <BaseButton to="/contacto">{{ t('platformsPage.primaryCta') }}</BaseButton>
          <BaseButton to="/servicios" variant="secondary">{{ t('platformsPage.secondaryCta') }}</BaseButton>
        </div>
      </div>
    </section>

    <!-- Other platforms -->
    <section v-if="otherPlatforms.length" class="bg-core-mist py-16 md:py-20">
      <div class="section-shell">
        <h2 v-reveal class="text-center font-display text-2xl font-extrabold text-core-ink">
          {{ t('platformsPage.otherTitle') }}
        </h2>
        <div class="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
          <NuxtLink
            v-for="(other, index) in otherPlatforms"
            :key="other.id"
            :to="localizedTo(`/plataformas/${other.slug}`)"
            v-reveal="{ delay: Math.min(index * 90, 360), distance: 24 }"
            class="group flex items-center gap-4 rounded-xl border border-core-line bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-core-orange/40 hover:shadow-lift"
          >
            <span :class="['flex h-11 w-11 shrink-0 items-center justify-center rounded-lg', accentTile[other.accent]]">
              <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path v-for="path in other.iconPaths" :key="path" :d="path" />
              </svg>
            </span>
            <div>
              <h3 class="font-display text-base font-extrabold text-core-ink">{{ t(`platforms.items.${other.id}.name`) }}</h3>
              <p class="mt-0.5 text-sm text-slate-600">{{ t(`platforms.items.${other.id}.type`) }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { pillars, pillarServiceKeys } from '~/data/landing'
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

const serviceKeys = pillarServiceKeys[slug] ?? []
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
</script>

<template>
  <div v-if="pillar">
    <!-- Hero -->
    <section
      class="relative overflow-hidden bg-core-ink py-16 text-white md:py-24"
      :style="{ backgroundImage: `url('${pillar.image}')`, backgroundSize: 'cover', backgroundPosition: pillar.bgPosition ?? 'center' }"
    >
      <div class="absolute inset-0 bg-core-ink/80" />
      <div class="section-shell relative">
        <nav class="mb-8 text-sm text-white/60" aria-label="Breadcrumb">
          <NuxtLink :to="localizedTo('/')" class="hover:text-white">{{ t('breadcrumb.home') }}</NuxtLink>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ t('pillarDetail.breadcrumb') }}</span>
          <span class="mx-2">/</span>
          <span class="text-white/90">{{ title }}</span>
        </nav>
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ t('pillarDetail.eyebrow', { index: pillar.index }) }}
        </p>
        <h1 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
          {{ title }}
        </h1>
        <p class="mt-4 max-w-2xl text-xl leading-8 text-white/80">
          {{ description }}
        </p>
      </div>
    </section>

    <!-- Services grid -->
    <section class="bg-white py-16 md:py-24">
      <div class="section-shell">
        <div v-reveal class="mb-12">
          <h2 class="font-display text-3xl font-extrabold text-core-ink">
            {{ t('pillarDetail.servicesTitle') }}
          </h2>
          <p class="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            {{ t('pillarDetail.servicesDescription') }}
          </p>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(key, index) in serviceKeys"
            :key="key"
            v-reveal="{ delay: Math.min(index * 90, 360), distance: 30, duration: 760 }"
            class="rounded-xl border border-core-line bg-core-mist p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
          >
            <div class="mb-1 flex items-center gap-2">
              <span class="shrink-0 font-display text-xs font-extrabold text-core-orange/60">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <h3 class="font-display text-lg font-extrabold leading-snug text-core-ink">
              {{ t(`pillarDetail.items.${slug}.${key}.title`) }}
            </h3>
            <p class="mt-3 text-sm leading-6 text-slate-600">
              {{ t(`pillarDetail.items.${slug}.${key}.description`) }}
            </p>
          </div>
        </div>

        <div v-reveal="{ delay: 200 }" class="mt-12">
          <BaseButton to="/contacto">
            {{ t('pillarDetail.contactCta') }}
          </BaseButton>
        </div>
      </div>
    </section>

    <!-- Other pillars -->
    <section class="bg-core-mist py-16 md:py-20">
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

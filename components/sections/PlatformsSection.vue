<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { platforms } from '~/data/landing'

const { t, tm, rt } = useI18n()
const localizedTo = useLocalizedTo()

const featuresFor = (id: string): string[] =>
  (tm(`platforms.items.${id}.features`) as unknown[]).map(feature => rt(feature as never))

const accentText: Record<string, string> = {
  orange: 'text-core-orange',
  cyan: 'text-core-cyan'
}

const accentTile: Record<string, string> = {
  orange: 'bg-core-orange/15 text-core-orange',
  cyan: 'bg-core-cyan/15 text-core-cyan'
}
</script>

<template>
  <section id="plataformas" class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        :eyebrow="t('platforms.eyebrow')"
        :title="t('platforms.title')"
        :description="t('platforms.description')"
      />

      <div class="mt-14 grid gap-6 lg:grid-cols-2">
        <article
          v-for="(platform, index) in platforms"
          :key="platform.id"
          v-reveal="{ delay: index * 140, distance: 42, duration: 840 }"
          class="relative overflow-hidden rounded-2xl bg-core-ink p-8 text-white shadow-premium md:p-10"
        >
          <div class="absolute inset-0 bg-hero-radial opacity-40" aria-hidden="true" />
          <div class="relative">
            <span class="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide text-white/80">
              <span :class="['h-1.5 w-1.5 rounded-full', platform.accent === 'orange' ? 'bg-core-orange' : 'bg-core-cyan']" />
              {{ t('platforms.badge') }}
            </span>

            <div class="mt-7 flex items-center gap-4">
              <span :class="['flex h-12 w-12 shrink-0 items-center justify-center rounded-xl', accentTile[platform.accent]]">
                <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path v-for="path in platform.iconPaths" :key="path" :d="path" />
                </svg>
              </span>
              <div>
                <h3 class="font-display text-2xl font-extrabold">{{ t(`platforms.items.${platform.id}.name`) }}</h3>
                <p :class="['mt-0.5 text-sm font-bold', accentText[platform.accent]]">
                  {{ t(`platforms.items.${platform.id}.type`) }}
                </p>
              </div>
            </div>

            <p class="mt-5 leading-7 text-white/75">
              {{ t(`platforms.items.${platform.id}.description`) }}
            </p>

            <ul class="mt-6 grid gap-2.5 sm:grid-cols-2">
              <li
                v-for="feature in featuresFor(platform.id)"
                :key="feature"
                class="flex items-center gap-2.5 text-sm font-bold text-white/85"
              >
                <svg :class="['h-4 w-4 shrink-0', accentText[platform.accent]]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {{ feature }}
              </li>
            </ul>

            <NuxtLink
              :to="localizedTo('/contacto')"
              :class="['group mt-8 inline-flex items-center gap-1.5 text-sm font-bold transition hover:text-white', accentText[platform.accent]]"
            >
              {{ t(`platforms.items.${platform.id}.cta`) }}
              <svg class="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

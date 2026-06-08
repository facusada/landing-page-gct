<script setup lang="ts">
import { technologyPillars } from '~/data/landing'

const { t } = useI18n()

const accentColors: Record<string, string> = {
  'core-blue': 'bg-core-blue',
  'core-orange': 'bg-core-orange',
  'core-cyan': 'bg-core-cyan'
}
</script>

<template>
  <section id="tecnologia" class="bg-[#EEF3FA] py-20 text-core-ink md:py-28">
    <div class="section-shell">
      <div v-reveal class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('technology.eyebrow') }}</p>
        <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
          {{ t('technology.title') }}
        </h2>
      </div>

      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <article
          v-for="(pillar, index) in technologyPillars"
          :key="pillar.id"
          v-reveal="{ delay: Math.min(index * 120, 420), distance: 42, duration: 840 }"
          class="group overflow-hidden rounded-xl border border-core-line bg-white shadow-[0_6px_26px_rgba(7,17,31,0.07)] transition duration-200 hover:-translate-y-1 hover:shadow-premium"
        >
          <div :class="[accentColors[pillar.accent] ?? 'bg-core-blue', 'h-1']" />
          <div class="p-6">
            <h3 class="font-display text-2xl font-extrabold">{{ t(`technology.pillars.${pillar.id}.title`) }}</h3>
            <p class="mt-4 leading-7 text-slate-600">{{ t(`technology.pillars.${pillar.id}.description`) }}</p>
            <div class="mt-6 flex flex-wrap gap-2">
              <span
                v-for="tag in pillar.tags"
                :key="tag"
                class="rounded-md bg-core-mist px-3 py-1 text-sm font-bold text-core-navy transition-colors hover:bg-core-navy hover:text-white"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

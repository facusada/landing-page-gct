<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { industries } from '~/data/landing'

const { t } = useI18n()

const iconPaths: Record<string, string> = {
  bolt: 'M13 2L3 14h9l-1 10 10-12h-9l1-10z',
  factory: 'M2 20V8l5 4V8l5 4V4l4 4h4v12H2zM6 16h3v4H6v-4zm5 0h3v4h-3v-4z',
  cart: 'M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6M9 22a1 1 0 100-2 1 1 0 000 2zM20 22a1 1 0 100-2 1 1 0 000 2z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  truck: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  package: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12',
  pharma: 'M12 8v8M8 12h8M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}
</script>

<template>
  <section id="industrias" class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="relative grid gap-12 px-6 md:px-10 lg:grid-cols-[.8fr_1.2fr] lg:px-28">
      <SectionHeading
        v-reveal
        :eyebrow="t('industries.eyebrow')"
        :title="t('industries.title')"
        :description="t('industries.description')"
      />
      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="(industry, index) in industries"
          :key="industry.id"
          v-tilt
          v-reveal="{ delay: Math.min(index * 110, 420), distance: 38, duration: 820 }"
          class="group rounded-xl border border-core-line bg-white p-6 transition duration-200 hover:border-core-orange/40 hover:shadow-lift"
        >
          <div class="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-core-mist text-core-navy transition-colors group-hover:bg-core-orange/10 group-hover:text-core-orange">
            <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path :d="iconPaths[industry.icon] ?? iconPaths.shield" />
            </svg>
          </div>
          <h3 class="font-display text-xl font-extrabold">{{ t(`industries.items.${industry.id}.name`) }}</h3>
          <p class="mt-3 leading-7 text-slate-600">{{ t(`industries.items.${industry.id}.description`) }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

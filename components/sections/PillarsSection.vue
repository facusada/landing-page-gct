<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { pillars } from '~/data/landing'

const { t } = useI18n()
</script>

<template>
  <section id="pilares" class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        :eyebrow="t('pillars.eyebrow')"
        :title="t('pillars.title')"
        :description="t('pillars.description')"
      />

      <div class="mt-14 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <NuxtLink
          v-for="(pillar, index) in pillars"
          :key="pillar.id"
          :to="pillar.to"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 38, duration: 820 }"
          :style="{ backgroundImage: `url('${pillar.image}')` }"
          class="group relative h-[300px] overflow-hidden rounded-xl bg-cover bg-center transition duration-200 hover:-translate-y-1 hover:shadow-lift"
        >
          <!-- top gradient for title readability -->
          <div class="absolute inset-x-0 top-0 h-[42%] bg-gradient-to-b from-core-ink/80 to-transparent" />
          <!-- bottom gradient for description readability -->
          <div class="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-core-ink/90 via-core-ink/50 to-transparent" />

          <!-- title + number at top -->
          <div class="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <h3 class="font-display text-base font-extrabold leading-snug text-white">
              {{ t(`pillars.items.${pillar.id}.title`) }}
            </h3>
            <span class="ml-2 shrink-0 font-display text-sm font-extrabold text-white/50">{{ pillar.index }}</span>
          </div>

          <!-- description + CTA at bottom -->
          <div class="absolute inset-x-0 bottom-0 p-4">
            <p class="text-xs leading-5 text-white/75 line-clamp-2">
              {{ t(`pillars.items.${pillar.id}.description`) }}
            </p>
            <p class="mt-2.5 text-xs font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
              {{ t('pillars.learnMore') }} →
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

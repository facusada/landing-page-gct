<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { pillars } from '~/data/landing'

const { t } = useI18n()
const localizedTo = useLocalizedTo()
</script>

<template>
  <section id="pilares" class="relative overflow-hidden py-20 md:py-28">
    <div class="relative px-6 md:px-10 lg:px-16">
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
          :to="localizedTo(pillar.to)"
          v-tilt
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 38, duration: 820 }"
          :style="{ backgroundImage: `url('${pillar.image}')`, backgroundPosition: pillar.bgPosition ?? 'center' }"
          class="group relative h-[300px] overflow-hidden rounded-xl border border-core-line bg-white bg-contain bg-center bg-no-repeat transition duration-200 hover:-translate-y-1 hover:shadow-lift"
        >
          <!-- bottom gradient for description readability -->
          <div class="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-core-ink/90 via-core-ink/50 to-transparent" />

          <!-- title at top -->
          <div class="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            <h3 class="font-display text-base font-extrabold leading-snug text-core-ink">
              {{ t(`pillars.items.${pillar.id}.title`) }}
            </h3>
          </div>

          <!-- description + CTA at bottom -->
          <div class="absolute inset-x-0 bottom-0 p-4">
            <p class="text-sm leading-6 text-white/85 line-clamp-2">
              {{ t(`pillars.items.${pillar.id}.description`) }}
            </p>
            <p class="mt-2.5 text-sm font-bold text-core-orange transition-transform duration-200 group-hover:translate-x-1">
              {{ t('pillars.learnMore') }} →
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

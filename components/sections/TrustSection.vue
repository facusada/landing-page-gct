<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { trustCards } from '~/data/landing'

const { t, tm, rt } = useI18n()

const certs = computed(() =>
  (tm('trust.certs') as unknown[]).map(cert => rt(cert as never))
)
</script>

<template>
  <section class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        :eyebrow="t('trust.eyebrow')"
        :title="t('trust.title')"
      />

      <div class="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="(card, index) in trustCards"
          :key="card.id"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 36, duration: 820 }"
          class="rounded-xl border border-core-line bg-white p-6 shadow-[0_2px_12px_rgba(7,17,31,0.05)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/30 hover:shadow-lift"
        >
          <p class="font-display text-3xl font-extrabold text-core-navy">{{ card.tag }}</p>
          <h3 class="mt-3 font-display text-lg font-extrabold text-core-ink">
            {{ t(`trust.cards.${card.id}.title`) }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            {{ t(`trust.cards.${card.id}.description`) }}
          </p>
        </article>
      </div>

      <div v-reveal="{ delay: 200 }" class="mt-10 flex flex-wrap justify-center gap-3">
        <span
          v-for="cert in certs"
          :key="cert"
          class="inline-flex items-center gap-2 rounded-full border border-core-line bg-core-mist px-4 py-1.5 text-sm font-bold text-core-navy"
        >
          <span class="h-1.5 w-1.5 rounded-full bg-core-orange" />
          {{ cert }}
        </span>
      </div>
    </div>
  </section>
</template>

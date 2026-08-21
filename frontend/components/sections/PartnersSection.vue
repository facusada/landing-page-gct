<script setup lang="ts">
import { partnerLogos } from '~/data/landing'

const { t } = useI18n()
</script>

<template>
  <section id="partners" class="relative overflow-hidden py-16 md:py-20">
    <div class="section-shell relative">
      <h2 v-reveal class="text-center font-display text-3xl font-extrabold md:text-5xl">{{ t('partners.title') }}</h2>
      <p v-reveal="{ delay: 120, distance: 26 }" class="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
        {{ t('partners.description') }}
      </p>

      <div v-reveal="{ delay: 200 }" class="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-12">
        <div
          v-for="partner in partnerLogos"
          :key="partner.name"
          v-tilt
          class="relative grid h-36 w-[18rem] place-items-center overflow-hidden rounded-2xl border border-white/70 bg-white/60 px-10 shadow-lift backdrop-blur-md transition duration-200 hover:-translate-y-1 hover:border-core-orange/30 md:h-40 md:w-[20rem]"
        >
          <span class="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-core-orange via-core-blue to-core-cyan" />
          <img
            :src="partner.src"
            :alt="t('partners.logoAlt', { name: partner.name })"
            :width="partner.width"
            :height="partner.height"
            loading="lazy"
            class="max-h-16 w-full object-contain md:max-h-20"
          >
        </div>
      </div>
    </div>
  </section>
</template>

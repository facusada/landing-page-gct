<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'

const { t } = useI18n()
</script>

<template>
  <section class="relative isolate overflow-hidden bg-core-ink py-20 text-white md:py-28">
    <div class="absolute inset-0 -z-20 bg-gradient-to-b from-core-ink to-core-midnight" aria-hidden="true" />
    <div class="absolute inset-0 -z-10 bg-hero-radial opacity-50" aria-hidden="true" />
    <ParticleField class="-z-10" />
    <div v-reveal class="section-shell relative max-w-4xl text-center">
      <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">{{ t('contactCta.eyebrow') }}</p>
      <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        {{ t('contactCta.title') }}
      </h2>
      <p class="mx-auto mt-5 max-w-2xl text-xl leading-8 text-white/80">
        {{ t('contactCta.description') }}
      </p>
      <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <BaseButton to="/contacto">{{ t('contactCta.cta') }}</BaseButton>
        <BaseButton to="/contacto" variant="secondary">{{ t('contactCta.secondaryCta') }}</BaseButton>
      </div>
    </div>
  </section>
</template>

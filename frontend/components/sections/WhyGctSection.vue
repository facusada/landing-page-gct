<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { whyItemIds } from '~/data/landing'

const { t } = useI18n()
</script>

<template>
  <section id="por-que-gct" class="relative overflow-hidden py-20 md:py-28">
    <div class="section-shell relative grid gap-12 lg:gap-20 lg:grid-cols-[1.15fr_.85fr] lg:items-start">
      <div v-reveal>
        <SectionHeading
          :eyebrow="t('why.eyebrow')"
          :title="t('why.title')"
          :description="t('why.description')"
        />
        <div class="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
          <div v-for="(id, index) in whyItemIds" :key="id" class="flex gap-4">
            <span class="font-display text-lg font-extrabold leading-7 text-core-orange">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <div>
              <h3 class="font-display text-lg font-extrabold text-core-ink">
                {{ t(`why.items.${id}.title`) }}
              </h3>
              <p class="mt-1.5 text-sm leading-6 text-slate-600">
                {{ t(`why.items.${id}.description`) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <aside
        v-reveal="{ delay: 160, distance: 42, duration: 840 }"
        class="relative overflow-hidden rounded-2xl bg-core-ink p-8 text-white shadow-premium lg:sticky lg:top-28 md:p-10"
      >
        <div class="absolute inset-0 bg-hero-radial opacity-50" aria-hidden="true" />
        <div class="relative">
          <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">
            {{ t('why.aside.eyebrow') }}
          </p>
          <h3 class="mt-3 font-display text-3xl font-extrabold leading-tight">
            {{ t('why.aside.title') }}
          </h3>
          <p class="mt-4 leading-7 text-white/75">
            {{ t('why.aside.description') }}
          </p>
          <div class="mt-7">
            <BaseButton to="/contacto">{{ t('why.aside.cta') }}</BaseButton>
          </div>
          <div class="mt-9 grid grid-cols-2 gap-6">
            <div class="border-l border-white/20 pl-5">
              <p class="font-display text-3xl font-extrabold">{{ t('why.aside.stats.time.value') }}</p>
              <p class="mt-1 text-sm font-bold text-white/70">{{ t('why.aside.stats.time.label') }}</p>
            </div>
            <div class="border-l border-white/20 pl-5">
              <p class="font-display text-3xl font-extrabold">{{ t('why.aside.stats.pillars.value') }}</p>
              <p class="mt-1 text-sm font-bold text-white/70">{{ t('why.aside.stats.pillars.label') }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

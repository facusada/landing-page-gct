<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { hero } from '~/data/landing'
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-core-ink text-white">
    <img
      class="absolute inset-0 -z-20 h-full w-full object-cover opacity-48"
      src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
      alt="Circuitos electronicos y tecnologia empresarial para representar plataformas SAP modernas"
      fetchpriority="high"
    >
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,17,31,.95),rgba(7,17,31,.78)_48%,rgba(7,17,31,.55))]" />
    <div class="absolute inset-0 -z-10 bg-core-grid bg-[length:42px_42px] opacity-35" />

    <div class="section-shell grid min-h-[calc(100vh-5rem)] content-center py-20 md:min-h-[640px]">
      <div class="max-w-4xl">
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ hero.eyebrow }}
        </p>
        <h1 class="mt-5 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
          {{ hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-xl leading-8 text-white/82 md:text-2xl md:leading-9">
          {{ hero.description }}
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="#contacto">{{ hero.primaryCta }}</BaseButton>
          <BaseButton href="#servicios" variant="secondary">{{ hero.secondaryCta }}</BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

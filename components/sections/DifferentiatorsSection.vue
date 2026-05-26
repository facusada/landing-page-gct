<script setup lang="ts">
import { differentiators } from '~/data/landing'
</script>

<template>
  <section class="relative overflow-hidden bg-white py-16 text-core-ink md:py-20">
    <div class="absolute inset-0 bg-hero-radial opacity-35" />
    <div class="section-shell relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article
        v-for="(item, index) in differentiators"
        :key="item.label"
        v-reveal="{ delay: Math.min(index * 120, 420), distance: 38, duration: 820 }"
        class="border-l border-core-line pl-5"
      >
        <p class="font-display text-5xl font-extrabold">{{ item.value }}</p>
        <h3 class="mt-2 text-xl font-bold">{{ item.label }}</h3>
        <p class="mt-3 text-slate-600">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { differentiators } from '~/data/landing'
</script>

<template>
  <section class="relative overflow-hidden bg-core-ink py-16 text-white md:py-20">
    <div class="absolute inset-0 bg-hero-radial opacity-70" />
    <div class="section-shell relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article v-for="item in differentiators" :key="item.label" class="border-l border-white/20 pl-5">
        <p class="font-display text-5xl font-extrabold">{{ item.value }}</p>
        <h3 class="mt-2 text-xl font-bold">{{ item.label }}</h3>
        <p class="mt-3 text-white/68">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>

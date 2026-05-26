<script setup lang="ts">
import { technologyPillars } from '~/data/landing'
</script>

<template>
  <section id="tecnologia" class="bg-[#EEF3FA] py-20 text-core-ink md:py-28">
    <div class="section-shell">
      <div v-reveal class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Tecnologia</p>
        <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
          SAP, seguridad, cloud e AI conectados al resultado operativo
        </h2>
      </div>

      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <article
          v-for="(pillar, index) in technologyPillars"
          :key="pillar.title"
          v-reveal="{ delay: Math.min(index * 120, 420), distance: 42, duration: 840 }"
          class="border border-core-line bg-white p-6 shadow-[0_6px_26px_rgba(7,17,31,0.07)]"
        >
          <h3 class="font-display text-2xl font-extrabold">{{ pillar.title }}</h3>
          <p class="mt-4 leading-7 text-slate-600">{{ pillar.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in pillar.tags" :key="tag" class="rounded-md bg-core-mist px-3 py-1 text-sm font-bold text-core-navy">
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

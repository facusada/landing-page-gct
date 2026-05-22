<script setup lang="ts">
import { technologyPillars } from '~/data/landing'
</script>

<template>
  <section id="tecnologia" class="bg-core-ink py-20 text-white md:py-28">
    <div class="section-shell">
      <div class="max-w-3xl">
        <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Tecnologia</p>
        <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight md:text-5xl">
          SAP, seguridad, cloud e AI conectados al resultado operativo
        </h2>
      </div>

      <div class="mt-12 grid gap-5 lg:grid-cols-3">
        <article v-for="pillar in technologyPillars" :key="pillar.title" class="border border-white/14 bg-white/[0.04] p-6">
          <h3 class="font-display text-2xl font-extrabold">{{ pillar.title }}</h3>
          <p class="mt-4 leading-7 text-white/72">{{ pillar.description }}</p>
          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="tag in pillar.tags" :key="tag" class="rounded-md bg-white/10 px-3 py-1 text-sm font-bold text-white/80">
              {{ tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

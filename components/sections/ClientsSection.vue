<script setup lang="ts">
import { clientLogos } from '~/data/landing'
</script>

<template>
  <section id="clientes" class="bg-white py-16 md:py-20">
    <div class="section-shell">
      <h2 class="text-center font-display text-3xl font-extrabold md:text-5xl">Clientes que confian</h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
        Organizaciones de energia, industria, retail, salud, infraestructura y servicios confian en equipos con experiencia SAP de alta criticidad.
      </p>
      <div class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <figure
          v-for="client in clientLogos"
          :key="client.name"
          class="grid h-32 place-items-center border border-core-line px-5 py-6 transition duration-200 hover:border-core-orange/50 hover:shadow-lift"
          :class="client.tone === 'dark' ? 'bg-core-ink' : 'bg-white'"
        >
          <img
            v-if="client.src"
            class="max-h-20 w-full max-w-[13rem] object-contain"
            :src="client.src"
            :alt="`Logo de ${client.name}`"
            :width="client.width"
            :height="client.height"
            loading="lazy"
          >
          <figcaption v-else class="font-display text-3xl font-extrabold tracking-wide text-slate-600">
            {{ client.name }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

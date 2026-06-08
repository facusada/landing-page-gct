<script setup lang="ts">
import { clientLogos } from '~/data/landing'

const { t } = useI18n()
</script>

<template>
  <section id="clientes" class="relative overflow-hidden bg-white py-16 md:py-20">
    <div class="absolute inset-0 bg-dot-grid" aria-hidden="true" />
    <div class="section-shell relative">
      <h2 v-reveal class="text-center font-display text-3xl font-extrabold md:text-5xl">{{ t('clients.title') }}</h2>
      <p v-reveal="{ delay: 120, distance: 26 }" class="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
        {{ t('clients.description') }}
      </p>
      <div class="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <figure
          v-for="(client, index) in clientLogos"
          :key="client.name"
          v-reveal="{ delay: Math.min(index * 90, 540), distance: 36, duration: 820 }"
          class="grid h-32 place-items-center rounded-xl border border-core-line px-5 py-6 transition duration-200 hover:border-core-orange/50 hover:shadow-lift"
          :class="client.tone === 'dark' ? 'bg-core-ink' : 'bg-white'"
        >
          <img
            v-if="client.src"
            class="max-h-20 w-full max-w-[13rem] object-contain"
            :src="client.src"
            :alt="t('clients.logoAlt', { name: client.name })"
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

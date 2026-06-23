<script setup lang="ts">
import { clientLogos } from '~/data/landing'

const { t } = useI18n()
const doubled = [...clientLogos, ...clientLogos]
</script>

<template>
  <section id="clientes" class="relative overflow-hidden py-16 md:py-20">

    <div class="section-shell relative">
      <h2 v-reveal class="text-center font-display text-3xl font-extrabold md:text-5xl">{{ t('clients.title') }}</h2>
      <p v-reveal="{ delay: 120, distance: 26 }" class="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
        {{ t('clients.description') }}
      </p>
    </div>

    <div class="carousel-mask relative mt-10 overflow-hidden px-10 md:px-16 lg:px-28">
      <div class="carousel-track flex w-max gap-4">
        <figure
          v-for="(client, index) in doubled"
          :key="`${client.name}-${index}`"
          class="grid h-28 w-48 flex-shrink-0 place-items-center rounded-xl border border-core-line px-5 py-5 transition duration-200 hover:border-core-orange/50 hover:shadow-lift"
          :class="client.tone === 'dark' ? 'bg-core-ink' : 'bg-white'"
          :aria-hidden="index >= clientLogos.length ? 'true' : undefined"
        >
          <img
            v-if="client.src"
            :class="['w-full object-contain', client.prominent ? 'max-h-20 max-w-[7rem]' : 'max-h-14 max-w-[9rem]']"
            :src="client.src"
            :alt="t('clients.logoAlt', { name: client.name })"
            :width="client.width"
            :height="client.height"
            loading="lazy"
          >
          <figcaption v-else class="font-display text-2xl font-extrabold tracking-wide text-slate-600">
            {{ client.name }}
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel-mask {
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.carousel-track {
  animation: marquee 32s linear infinite;
}

.carousel-track:hover {
  animation-play-state: paused;
}
</style>

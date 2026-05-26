<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
</script>

<template>
  <section class="relative isolate overflow-hidden bg-white py-20 text-core-ink md:py-28">
    <img
      class="absolute inset-0 -z-20 h-full w-full object-cover opacity-14"
      src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2200&q=80"
      alt="Infraestructura cloud y servidores para servicios SAP empresariales"
      loading="lazy"
    >
    <div class="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,.96),rgba(255,255,255,.86))]" />
    <div v-reveal class="section-shell max-w-4xl text-center">
      <p class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">Proximo paso</p>
      <h2 class="mt-3 font-display text-4xl font-extrabold leading-tight md:text-6xl">
        Tu estrategia SAP deberia estar alineada al crecimiento del negocio
      </h2>
      <p class="mx-auto mt-5 max-w-2xl text-xl leading-8 text-slate-700">
        Revisemos migracion, seguridad y operacion con un enfoque que reduzca riesgos y habilite una evolucion sostenible.
      </p>
      <div class="mt-8">
        <BaseButton href="mailto:info@gctechs.com">Contactar a Global Core</BaseButton>
      </div>
    </div>
  </section>
</template>

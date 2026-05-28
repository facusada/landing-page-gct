<script setup lang="ts">
import FeatureCard from '~/components/ui/FeatureCard.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { services } from '~/data/landing'
</script>

<template>
  <section id="servicios" class="relative overflow-hidden bg-core-mist py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid opacity-50" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        align="center"
        eyebrow="Lo que ofrecemos"
        title="Servicios SAP para evolucionar sin perder control"
        description="Ocho frentes de trabajo para organizaciones que necesitan transformar, asegurar y operar con continuidad."
      />

      <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="(service, index) in services"
          :key="service.slug"
          v-reveal="{ delay: Math.min(index * 110, 440), distance: 40, duration: 820 }"
          :title="service.title"
          :description="service.description"
          :proof="service.proof"
          :icon="service.icon"
          :to="`/servicios/${service.slug}`"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

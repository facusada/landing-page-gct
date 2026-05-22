<script setup lang="ts">
import FeatureCard from '~/components/ui/FeatureCard.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { services } from '~/data/landing'
</script>

<template>
  <section id="servicios" class="bg-core-mist py-20 md:py-28">
    <div class="section-shell">
      <SectionHeading
        align="center"
        eyebrow="Lo que ofrecemos"
        title="Servicios SAP para evolucionar sin perder control"
        description="Cinco frentes de trabajo pensados para organizaciones que necesitan transformar, asegurar y operar con continuidad."
      />

      <div class="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          v-for="(service, index) in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :proof="service.proof"
          :index="index"
        />
      </div>
    </div>
  </section>
</template>

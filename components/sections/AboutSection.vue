<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import TabPanel from '~/components/ui/TabPanel.vue'
import { aboutTabs } from '~/data/about-tabs'
</script>

<template>
  <section id="nosotros" class="relative overflow-hidden bg-white py-20 md:py-28">
    <div class="absolute inset-0 bg-dot-grid" aria-hidden="true" />
    <div class="section-shell relative grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-start">
      <div v-reveal>
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Estrategia, seguridad y operación para ecosistemas SAP críticos"
        />
      </div>
      <div v-reveal="{ delay: 160 }">
        <TabPanel :tabs="aboutTabs" />
      </div>
    </div>
  </section>
</template>

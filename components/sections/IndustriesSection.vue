<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { industries } from '~/data/landing'
</script>

<template>
  <section class="bg-white py-20 md:py-28">
    <div class="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
      <SectionHeading
        eyebrow="Industrias"
        title="Experiencia para empresas con operaciones exigentes"
        description="El foco esta en sectores donde SAP, seguridad, auditoria y continuidad operativa impactan directamente en el negocio."
      />
      <div class="grid gap-4 sm:grid-cols-2">
        <article v-for="industry in industries" :key="industry.name" class="border border-core-line p-6">
          <h3 class="font-display text-xl font-extrabold">{{ industry.name }}</h3>
          <p class="mt-3 leading-7 text-slate-600">{{ industry.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

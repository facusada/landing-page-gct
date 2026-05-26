<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="nosotros" class="bg-white py-20 md:py-28">
    <div class="section-shell grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-center">
      <div v-reveal>
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Estrategia, seguridad y operación para ecosistemas SAP críticos"
          description="Global Core Technologies combina consultoría funcional, arquitectura técnica y gobierno de riesgo para que cada evolución SAP llegue con control, adopción y continuidad."
        />
      </div>
      <div class="grid gap-4">
        <div v-reveal="{ delay: 120, distance: 34 }" class="rounded-xl border-l-4 border-core-orange bg-core-mist p-6">
          <h3 class="font-display text-xl font-extrabold">Del diagnóstico a la ejecución</h3>
          <p class="mt-3 leading-7 text-slate-600">
            Priorizamos decisiones accionables: roadmap, controles, arquitectura objetivo, equipos responsables y métricas de avance.
          </p>
        </div>
        <div v-reveal="{ delay: 260, distance: 34 }" class="rounded-xl border-l-4 border-core-blue bg-core-mist p-6">
          <h3 class="font-display text-xl font-extrabold">Menos complejidad comercial, más claridad técnica</h3>
          <p class="mt-3 leading-7 text-slate-600">
            Reordenamos la propuesta del Figma para que el valor sea escaneable, directo y útil para búsquedas orgánicas.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

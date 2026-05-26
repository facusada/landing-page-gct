<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
</script>

<template>
  <section id="nosotros" class="bg-white py-20 md:py-28">
    <div class="section-shell grid gap-12 md:grid-cols-[1.05fr_.95fr] md:items-center">
      <div v-reveal>
        <SectionHeading
          eyebrow="Sobre nosotros"
          title="Estrategia, seguridad y operacion para ecosistemas SAP criticos"
          description="Global Core Technologies combina consultoria funcional, arquitectura tecnica y gobierno de riesgo para que cada evolucion SAP llegue con control, adopcion y continuidad."
        />
      </div>
      <div class="grid gap-4">
        <div v-reveal="{ delay: 120, distance: 34 }" class="border-l-4 border-core-orange bg-core-mist p-6">
          <h3 class="font-display text-xl font-extrabold">Del diagnostico a la ejecucion</h3>
          <p class="mt-3 leading-7 text-slate-600">
            Priorizamos decisiones accionables: roadmap, controles, arquitectura objetivo, equipos responsables y metricas de avance.
          </p>
        </div>
        <div v-reveal="{ delay: 260, distance: 34 }" class="border-l-4 border-core-blue bg-core-mist p-6">
          <h3 class="font-display text-xl font-extrabold">Menos complejidad comercial, mas claridad tecnica</h3>
          <p class="mt-3 leading-7 text-slate-600">
            Reordenamos la propuesta del Figma para que el valor sea escaneable, directo y util para busquedas organicas.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

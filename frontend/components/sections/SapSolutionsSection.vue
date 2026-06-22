<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { sapSolutions } from '~/data/sap-solutions'
</script>

<template>
  <section class="relative overflow-hidden bg-core-ink py-20 text-white md:py-28">
    <div class="absolute inset-0 bg-hero-radial opacity-40" aria-hidden="true" />
    <div class="section-shell relative">
      <SectionHeading
        v-reveal
        dark
        align="center"
        eyebrow="Soluciones SAP"
        title="Una solución adecuada al tamaño de tu organización"
        description="Desde la migración hasta la seguridad, cada solución se adapta a tus necesidades y escala con tu negocio."
      />

      <div class="mt-14 grid gap-6 lg:grid-cols-3">
        <article
          v-for="(solution, index) in sapSolutions"
          :key="solution.slug"
          v-reveal="{ delay: Math.min(index * 140, 420), distance: 44, duration: 860 }"
          class="group rounded-xl border border-white/10 bg-white/5 p-7 backdrop-blur-sm transition duration-300 hover:border-white/25 hover:bg-white/10"
        >
          <h3 class="font-display text-2xl font-extrabold">{{ solution.title }}</h3>
          <p class="mt-4 leading-7 text-white/75">{{ solution.description }}</p>
          <ul class="mt-6 grid gap-2.5">
            <li v-for="feature in solution.features" :key="feature" class="flex items-start gap-2.5 text-sm text-white/70">
              <svg class="mt-0.5 h-4 w-4 shrink-0 text-core-cyan" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
              </svg>
              <span>{{ feature }}</span>
            </li>
          </ul>
          <div class="mt-8">
            <BaseButton :to="solution.ctaTo" variant="secondary">
              {{ solution.cta }}
            </BaseButton>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

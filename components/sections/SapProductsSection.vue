<script setup lang="ts">
import SectionHeading from '~/components/ui/SectionHeading.vue'
import { sapProducts } from '~/data/sap-products'
</script>

<template>
  <section class="bg-core-mist py-20 md:py-28">
    <div class="section-shell">
      <SectionHeading
        v-reveal
        align="center"
        eyebrow="Portfolio SAP"
        title="Soluciones SAP que implementamos"
        description="Como SAP Silver Partner, acompañamos a cada organización en la elección e implementación de la solución más adecuada para su tamaño y madurez digital."
      />

      <div class="mt-14 grid gap-6 lg:grid-cols-3">
        <article
          v-for="(product, index) in sapProducts"
          :key="product.id"
          v-reveal="{ delay: Math.min(index * 130, 400), distance: 40, duration: 840 }"
          class="group flex flex-col rounded-xl border border-core-line bg-white overflow-hidden shadow-[0_2px_12px_rgba(7,17,31,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-premium"
        >
          <div class="p-7 flex-1 flex flex-col">
            <div class="mb-5 inline-flex items-center gap-2.5">
              <div class="flex items-center justify-center rounded-[5px] bg-[#1872CE] px-2 py-0.5">
                <span class="font-display text-[13px] font-extrabold leading-5 tracking-wide text-white">SAP</span>
              </div>
              <span class="font-display text-base font-bold text-core-ink">{{ product.badge }}</span>
            </div>

            <h3 class="font-display text-2xl font-extrabold text-core-ink">{{ product.title }}</h3>
            <p class="mt-3 text-base leading-7 text-slate-600 flex-1">{{ product.description }}</p>

            <ul class="mt-6 grid gap-2.5">
              <li
                v-for="feature in product.features"
                :key="feature"
                class="flex items-start gap-2.5 text-sm text-slate-700"
              >
                <svg class="mt-0.5 h-4 w-4 shrink-0 text-[#1872CE]" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <div class="flex items-center justify-between border-t border-core-line px-7 py-4">
            <span class="text-sm font-bold text-slate-500">{{ product.minUsers }}</span>
            <span class="text-sm font-bold text-[#1872CE] transition group-hover:translate-x-1">Consultar →</span>
          </div>

          <div class="h-1 bg-[#1872CE]" />
        </article>
      </div>
    </div>
  </section>
</template>

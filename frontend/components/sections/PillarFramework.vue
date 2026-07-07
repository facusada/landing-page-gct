<template>
  <section class="bg-section-light py-16 md:py-24">
    <div class="section-shell">
      <div v-reveal class="mb-10 max-w-2xl">
        <p v-if="eyebrow" class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ eyebrow }}
        </p>
        <h2 class="mt-3 font-display text-3xl font-extrabold text-core-ink">
          {{ title }}
        </h2>
        <p v-if="intro" class="mt-3 text-lg leading-8 text-slate-600">
          {{ intro }}
        </p>
      </div>

      <ol class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <li
          v-for="(stage, index) in stages"
          :key="stage.name"
          v-reveal="{ delay: Math.min(index * 90, 450), distance: 26, duration: 720 }"
          class="relative flex h-full flex-col rounded-xl border border-core-line bg-white p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
        >
          <span class="font-display text-2xl font-extrabold text-core-orange">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="mt-2 font-display text-lg font-extrabold text-core-ink">
            {{ stage.name }}
          </h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            {{ stage.description }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  intro: { type: String, default: '' },
  stages: { type: Array, default: () => [] },
})
</script>

<template>
  <section class="bg-section-light py-16 md:py-24">
    <div class="section-shell">
      <div v-reveal class="mb-12 max-w-2xl">
        <p v-if="eyebrow" class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ eyebrow }}
        </p>
        <h2 class="mt-3 font-display text-3xl font-extrabold text-core-ink">
          {{ title }}
        </h2>
        <p v-if="description" class="mt-3 text-lg leading-8 text-slate-600">
          {{ description }}
        </p>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(outcome, index) in outcomes"
          :key="outcome.title"
          v-reveal="{ delay: Math.min(index * 90, 360), distance: 30, duration: 760 }"
          class="flex h-full flex-col rounded-xl border border-core-line bg-white/30 p-6 transition duration-200 hover:-translate-y-0.5 hover:border-core-orange/40 hover:shadow-lift"
        >
          <span class="font-display text-xs font-extrabold text-core-orange/60">
            {{ String(index + 1).padStart(2, '0') }}
          </span>
          <h3 class="mt-2 font-display text-lg font-extrabold leading-snug text-core-ink">
            {{ outcome.title }}
          </h3>
          <p class="mt-3 text-sm leading-6 text-slate-600">
            {{ outcome.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: 'Outcomes That Matter' },
  description: { type: String, default: '' },
  outcomes: { type: Array, default: () => [] },
})
</script>

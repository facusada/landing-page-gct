<script setup lang="ts">
defineProps<{
  title: string
  description: string
  proof?: string
  index?: number
}>()
</script>

<template>
  <article
    class="group flex h-full flex-col rounded-xl border border-core-line bg-white p-6 shadow-[0_1px_0_rgba(7,17,31,0.04)] transition duration-200 hover:-translate-y-1 hover:border-core-orange/50 hover:shadow-premium"
  >
    <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-core-mist text-lg font-extrabold text-core-orange">
      {{ String((index ?? 0) + 1).padStart(2, '0') }}
    </div>
    <h3 class="font-display text-xl font-extrabold leading-snug text-core-ink">
      {{ title }}
    </h3>
    <p class="mt-4 flex-1 text-base leading-7 text-slate-600">
      {{ description }}
    </p>
    <p v-if="proof" class="mt-6 border-t border-core-line pt-4 text-sm font-bold text-core-navy">
      {{ proof }}
    </p>
  </article>
</template>

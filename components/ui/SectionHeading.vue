<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div :class="['max-w-3xl', align === 'center' ? 'mx-auto text-center' : '']">
    <p v-if="eyebrow" class="text-sm font-extrabold uppercase tracking-[0.18em] text-core-orange">
      {{ eyebrow }}
    </p>
    <h2 class="mt-3 font-display text-3xl font-extrabold leading-tight text-core-ink md:text-5xl">
      {{ title }}
    </h2>
    <p v-if="description" class="mt-4 text-lg leading-8 text-slate-600">
      {{ description }}
    </p>
  </div>
</template>

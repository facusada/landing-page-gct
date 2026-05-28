<script setup lang="ts">
defineProps<{
  quote: string
  personName: string
  role: string
  company: string
}>()
</script>

<template>
  <article class="flex h-full flex-col rounded-xl border border-core-line bg-white p-8 shadow-[0_6px_26px_rgba(7,17,31,0.07)]">
    <svg class="mb-4 h-8 w-8 text-core-orange/30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
    </svg>
    <blockquote class="flex-1 text-lg italic leading-8 text-slate-700">
      "{{ quote }}"
    </blockquote>
    <div class="mt-6 border-t border-core-line pt-4">
      <p class="font-display font-extrabold text-core-ink">{{ personName }}</p>
      <p class="text-sm text-slate-500">{{ role }} · {{ company }}</p>
    </div>
  </article>
</template>

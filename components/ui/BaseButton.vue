<script setup lang="ts">
withDefaults(
  defineProps<{
    href: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  {
    variant: 'primary'
  }
)
</script>

<template>
  <a
    :href="href"
    class="inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition duration-200"
    :class="{
      'bg-core-orange text-white shadow-lift hover:bg-[#D9661F]': variant === 'primary',
      'border border-core-line bg-white text-core-ink shadow-[0_4px_16px_rgba(7,17,31,0.08)] hover:bg-core-mist': variant === 'secondary',
      'text-core-orange underline decoration-2 underline-offset-4 hover:text-[#C95718]': variant === 'ghost'
    }"
  >
    <slot />
  </a>
</template>

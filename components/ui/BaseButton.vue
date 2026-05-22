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
      'border border-white/35 bg-white/10 text-white hover:bg-white/18': variant === 'secondary',
      'text-core-orange underline decoration-2 underline-offset-4 hover:text-[#C95718]': variant === 'ghost'
    }"
  >
    <slot />
  </a>
</template>

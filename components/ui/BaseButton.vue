<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost'
  }>(),
  {
    variant: 'primary'
  }
)

const isInternal = computed(() => !!props.to)

const sharedClasses = computed(() => [
  'inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold transition duration-200',
  {
    'bg-core-orange text-white shadow-lift hover:bg-[#D9661F]': props.variant === 'primary',
    'border border-core-line bg-white text-core-ink shadow-[0_4px_16px_rgba(7,17,31,0.08)] hover:bg-core-mist': props.variant === 'secondary',
    'text-core-orange underline decoration-2 underline-offset-4 hover:text-[#C95718]': props.variant === 'ghost'
  }
])
</script>

<template>
  <NuxtLink v-if="isInternal && to" :to="to" :class="sharedClasses">
    <slot />
  </NuxtLink>
  <a v-else :href="href" :class="sharedClasses">
    <slot />
  </a>
</template>

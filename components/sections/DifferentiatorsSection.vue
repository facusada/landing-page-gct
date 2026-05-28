<script setup lang="ts">
import AnimatedCounter from '~/components/ui/AnimatedCounter.vue'
import { differentiators } from '~/data/landing'
import { useParallax } from '~/composables/useParallax'

const bgRef = ref<HTMLElement | null>(null) as Ref<HTMLElement | null>
useParallax(bgRef, 0.08)
</script>

<template>
  <section class="relative overflow-hidden bg-core-ink py-16 text-white md:py-20">
    <div ref="bgRef" class="absolute inset-0 bg-hero-radial opacity-35" aria-hidden="true" />
    <div class="section-shell relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <AnimatedCounter
        v-for="item in differentiators"
        :key="item.label"
        v-reveal="{ delay: 0, distance: 38, duration: 820 }"
        :value="item.numericValue"
        :prefix="item.prefix ?? ''"
        :suffix="item.suffix ?? ''"
        :label="item.label"
        :detail="item.detail"
      />
    </div>
  </section>
</template>

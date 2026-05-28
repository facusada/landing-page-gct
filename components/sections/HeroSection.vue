<script setup lang="ts">
import AnimatedCounter from '~/components/ui/AnimatedCounter.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import { differentiators, hero } from '~/data/landing'
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-core-ink text-white">
    <div class="hero-mesh absolute inset-0 -z-20" aria-hidden="true" />
    <div class="hero-grid absolute inset-0 -z-10 opacity-[0.04]" aria-hidden="true" />

    <div class="section-shell grid min-h-[60vh] content-center py-14 md:min-h-[68vh] md:py-16 lg:min-h-[62vh]">
      <div class="max-w-4xl drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span class="h-2 w-2 rounded-full bg-core-orange" />
          <span class="text-sm font-bold text-white/90">{{ hero.eyebrow }}</span>
        </div>

        <h1 class="font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
          {{ hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-xl leading-8 text-white/86 md:text-2xl md:leading-9">
          {{ hero.description }}
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton to="/contacto">{{ hero.primaryCta }}</BaseButton>
          <BaseButton to="/servicios" variant="secondary">{{ hero.secondaryCta }}</BaseButton>
        </div>
      </div>

      <div class="mt-14 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <AnimatedCounter
          v-for="item in differentiators"
          :key="item.label"
          :value="item.numericValue"
          :prefix="item.prefix ?? ''"
          :suffix="item.suffix ?? ''"
          :label="item.label"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-mesh {
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(47, 184, 212, 0.18), transparent),
    radial-gradient(ellipse 70% 50% at 75% 25%, rgba(96, 106, 244, 0.22), transparent),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(18, 59, 102, 0.3), transparent),
    linear-gradient(180deg, #07111f 0%, #0b1d33 100%);
  background-size: 200% 200%, 200% 200%, 100% 100%, 100% 100%;
  animation: meshDrift 24s ease-in-out infinite;
}

.hero-grid {
  background-image:
    linear-gradient(rgba(255, 255, 255, 1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 1) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes meshDrift {
  0%, 100% {
    background-position: 0% 50%, 100% 50%, 0% 0%, 0% 0%;
  }
  33% {
    background-position: 50% 0%, 50% 100%, 0% 0%, 0% 0%;
  }
  66% {
    background-position: 100% 50%, 0% 50%, 0% 0%, 0% 0%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-mesh {
    animation: none;
  }
}
</style>

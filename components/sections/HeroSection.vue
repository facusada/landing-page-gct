<script setup lang="ts">
import BaseButton from '~/components/ui/BaseButton.vue'
import { hero, heroSlides } from '~/data/landing'

const currentSlide = ref(0)
const autoplayIntervalMs = 5200
const hasMultipleSlides = computed(() => heroSlides.length > 1)
const fallbackSlide = {
  src: '',
  alt: '',
  label: ''
}
const activeSlide = computed(() => heroSlides[currentSlide.value] ?? fallbackSlide)
let autoplayTimer: ReturnType<typeof setInterval> | null = null

const clearAutoplay = () => {
  if (!autoplayTimer) {
    return
  }

  clearInterval(autoplayTimer)
  autoplayTimer = null
}

const goToSlide = (index: number) => {
  const totalSlides = heroSlides.length

  if (totalSlides === 0) {
    return
  }

  currentSlide.value = (index + totalSlides) % totalSlides
}

const nextSlide = () => {
  goToSlide(currentSlide.value + 1)
}

const startAutoplay = () => {
  if (!import.meta.client || import.meta.test || !hasMultipleSlides.value) {
    return
  }

  clearAutoplay()
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, autoplayIntervalMs)
}

const goToSlideFromUi = (index: number) => {
  goToSlide(index)
  startAutoplay()
}

onMounted(() => {
  startAutoplay()
})

onBeforeUnmount(() => {
  clearAutoplay()
})
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-core-ink text-white">
    <div class="absolute inset-0 -z-20 overflow-hidden">
      <img
        v-for="(slide, index) in heroSlides"
        :key="slide.src"
        class="absolute inset-0 h-full w-full object-cover transition-all duration-[1150ms] ease-out"
        :class="index === currentSlide ? 'scale-100 opacity-22' : 'scale-[1.04] opacity-0'"
        :src="slide.src"
        :alt="slide.alt"
        :fetchpriority="index === 0 ? 'high' : undefined"
        :loading="index === 0 ? 'eager' : 'lazy'"
        :aria-hidden="index === currentSlide ? 'false' : 'true'"
      >
    </div>
    <div class="section-shell grid min-h-[54vh] content-center py-10 md:min-h-[62vh] md:py-12 lg:min-h-[58vh]">
      <div class="max-w-4xl drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
        <p class="text-sm font-extrabold uppercase tracking-[0.2em] text-core-orange">
          {{ hero.eyebrow }}
        </p>
        <h1 class="mt-5 font-display text-5xl font-extrabold leading-[1.02] md:text-7xl">
          {{ hero.title }}
        </h1>
        <p class="mt-6 max-w-2xl text-xl leading-8 text-white/86 md:text-2xl md:leading-9">
          {{ hero.description }}
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row">
          <BaseButton href="#contacto">{{ hero.primaryCta }}</BaseButton>
          <BaseButton href="#servicios" variant="secondary">{{ hero.secondaryCta }}</BaseButton>
        </div>

        <div v-if="hasMultipleSlides" class="mt-8 flex flex-col gap-3">
          <p class="text-sm font-semibold text-white/82">
            {{ activeSlide.label }}
          </p>
          <div class="flex items-center gap-2">
            <button
              v-for="(slide, index) in heroSlides"
              :key="slide.alt"
              type="button"
              class="h-2 rounded-full transition"
              :class="index === currentSlide ? 'w-10 bg-core-orange' : 'w-6 bg-white/38 hover:bg-white/62'"
              :aria-label="`Ir a imagen ${index + 1}`"
              :aria-current="index === currentSlide ? 'true' : 'false'"
              @click="goToSlideFromUi(index)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

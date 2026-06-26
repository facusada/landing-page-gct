<script setup lang="ts">
import AnimatedCounter from '~/components/ui/AnimatedCounter.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'
import logoSapPartner from '~/assets/Logo_SAP_Partner.png'
import autonomousEnterpriseImg from '~/assets/carrusel/autonomous_enterprise_gct.png'
import lifeScienceImg from '~/assets/carrusel/life_science_gct.png'
import { heroMetrics } from '~/data/landing'

const { t } = useI18n()

useHead({
  script: [
    {
      src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
      type: 'text/javascript',
      tagPosition: 'bodyClose',
    }
  ]
})

const imageSlides = [
  {
    id: 'autonomousEnterprise',
    image: autonomousEnterpriseImg,
    key: 'hero.slides.autonomousEnterprise',
    position: 'center center',
  },
  {
    id: 'lifeScience',
    image: lifeScienceImg,
    key: 'hero.slides.lifeScience',
    position: 'center 28%',
  },
] as const

const SLIDE_COUNT = imageSlides.length + 1
const AUTOPLAY_MS = 6000

const current = ref(0)
const isPaused = ref(false)
let timer: ReturnType<typeof setInterval> | null = null
let prefersReducedMotion = false

function goTo(index: number) {
  current.value = (index + SLIDE_COUNT) % SLIDE_COUNT
}

function next() {
  goTo(current.value + 1)
}

function prev() {
  goTo(current.value - 1)
}

function startAutoplay() {
  if (prefersReducedMotion || timer) return
  timer = setInterval(() => {
    if (!isPaused.value) next()
  }, AUTOPLAY_MS)
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  startAutoplay()
})

onBeforeUnmount(stopAutoplay)
</script>

<template>
  <section
    id="inicio"
    class="relative isolate overflow-hidden bg-core-ink text-white"
    aria-roledescription="carousel"
    @mouseenter="isPaused = true"
    @mouseleave="isPaused = false"
    @focusin="isPaused = true"
    @focusout="isPaused = false"
  >
    <div class="hero-mesh absolute inset-0 -z-20" aria-hidden="true" />
    <ParticleField class="-z-10" />

    <!-- Track -->
    <div
      class="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
      :style="{ transform: `translateX(-${current * 100}%)` }"
    >
      <!-- Slide 1: original hero -->
      <div
        class="w-full shrink-0"
        role="group"
        aria-roledescription="slide"
        :aria-hidden="current !== 0"
      >
        <div class="section-shell py-14 md:py-16 lg:py-20">
          <div class="grid min-h-[60vh] items-center gap-10 lg:min-h-[62vh] lg:grid-cols-[1fr_340px] lg:gap-10 xl:grid-cols-[1fr_380px]">

            <!-- Text content -->
            <div class="drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
              <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span class="h-2 w-2 shrink-0 rounded-full bg-core-cyan" />
                <span class="text-sm font-bold text-white/90">{{ t('hero.eyebrow') }}</span>
              </div>

              <h1 class="font-display text-4xl font-extrabold leading-[1.04] text-balance md:text-5xl">
                {{ t('hero.title') }}
              </h1>
              <p class="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl md:leading-9">
                {{ t('hero.description') }}
              </p>
              <div class="mt-9 flex flex-col gap-3 sm:flex-row">
                <BaseButton to="/contacto">{{ t('hero.primaryCta') }}</BaseButton>
                <BaseButton to="/servicios" variant="secondary">{{ t('hero.secondaryCta') }}</BaseButton>
              </div>

              <div class="mt-14 grid gap-6 sm:grid-cols-3 md:gap-8">
                <AnimatedCounter
                  v-for="item in heroMetrics"
                  :key="item.id"
                  :value="item.numericValue"
                  :prefix="item.prefix ?? ''"
                  :suffix="item.suffix ?? ''"
                  :label="t(`hero.metrics.${item.id}.label`)"
                />
              </div>

              <!-- SAP partner logo -->
              <img
                :src="logoSapPartner"
                alt="SAP Silver Partner"
                class="mt-12 h-auto w-[140px]"
              />
            </div>

            <!-- Lottie animation -->
            <div class="flex items-center justify-center">
              <ClientOnly>
                <!-- @ts-ignore: lottie-player is a web component loaded via CDN -->
                <lottie-player
                  src="/animations/hero.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  class="lottie-hero"
                />
                <template #fallback>
                  <div class="lottie-placeholder" />
                </template>
              </ClientOnly>
            </div>

          </div>
        </div>
      </div>

      <!-- Image slides -->
      <div
        v-for="(slide, i) in imageSlides"
        :key="slide.id"
        class="relative w-full shrink-0"
        role="group"
        aria-roledescription="slide"
        :aria-hidden="current !== i + 1"
      >
        <!-- Background image -->
        <img
          :src="slide.image"
          :alt="t(`${slide.key}.title`)"
          class="absolute inset-0 -z-10 h-full w-full object-cover"
          :style="{ objectPosition: slide.position }"
          loading="lazy"
        />

        <div class="section-shell py-14 md:py-16 lg:py-20">
          <div class="flex min-h-[60vh] items-start lg:min-h-[62vh]">
            <div class="slide-text max-w-2xl">
              <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                <span class="h-2 w-2 shrink-0 rounded-full bg-core-cyan" />
                <span class="text-sm font-bold text-white/90">{{ t(`${slide.key}.eyebrow`) }}</span>
              </div>

              <h2 class="font-display text-4xl font-extrabold leading-[1.04] text-balance md:text-5xl">
                {{ t(`${slide.key}.title`) }}
              </h2>
              <p class="mt-6 max-w-xl text-lg leading-8 text-white/80 md:text-xl md:leading-9">
                {{ t(`${slide.key}.description`) }}
              </p>
              <div class="mt-9">
                <BaseButton to="/servicios">{{ t(`${slide.key}.cta`) }}</BaseButton>
              </div>

              <!-- SAP partner logo -->
              <img
                :src="logoSapPartner"
                alt="SAP Silver Partner"
                class="mt-12 h-auto w-[140px] drop-shadow-[0_4px_14px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Arrows -->
    <button
      type="button"
      class="carousel-arrow left-3 md:left-6"
      :aria-label="t('common.prev')"
      @click="prev"
    >
      <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <button
      type="button"
      class="carousel-arrow right-3 md:right-6"
      :aria-label="t('common.next')"
      @click="next"
    >
      <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5">
      <button
        v-for="n in SLIDE_COUNT"
        :key="n"
        type="button"
        class="h-2.5 rounded-full transition-all duration-300"
        :class="current === n - 1 ? 'w-7 bg-core-orange' : 'w-2.5 bg-white/40 hover:bg-white/70'"
        :aria-label="`Slide ${n}`"
        :aria-current="current === n - 1"
        @click="goTo(n - 1)"
      />
    </div>
  </section>
</template>

<style scoped>
.lottie-hero {
  width: 100%;
  max-width: 480px;
  height: auto;
  aspect-ratio: 33 / 20;
  filter: drop-shadow(0 0 32px rgba(47, 184, 212, 0.25));
}

.lottie-placeholder {
  width: 100%;
  max-width: 480px;
  aspect-ratio: 33 / 20;
}

/* Legibilidad del texto sobre fotos claras sin oscurecer la imagen */
.slide-text :is(h2, p) {
  text-shadow:
    0 2px 6px rgba(7, 17, 31, 0.7),
    0 0 24px rgba(7, 17, 31, 0.55);
}

.hero-mesh {
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(47, 184, 212, 0.18), transparent),
    radial-gradient(ellipse 70% 50% at 75% 25%, rgba(96, 106, 244, 0.22), transparent),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(18, 59, 102, 0.3), transparent),
    linear-gradient(180deg, #07111f 0%, #0b1d33 100%);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  color: #fff;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(7, 17, 31, 0.45);
  backdrop-filter: blur(6px);
  transform: translateY(-50%);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.carousel-arrow:hover {
  background: rgba(7, 17, 31, 0.7);
  border-color: rgba(255, 255, 255, 0.4);
}

@media (prefers-reduced-motion: reduce) {
  lottie-player { display: none; }
}
</style>

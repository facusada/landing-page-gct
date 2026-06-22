<script setup lang="ts">
import AnimatedCounter from '~/components/ui/AnimatedCounter.vue'
import BaseButton from '~/components/ui/BaseButton.vue'
import ParticleField from '~/components/ui/ParticleField.vue'
import logoSapPartner from '~/assets/Logo_SAP_Partner.png'
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
</script>

<template>
  <section id="inicio" class="relative isolate overflow-hidden bg-core-ink text-white">
    <div class="hero-mesh absolute inset-0 -z-20" aria-hidden="true" />
    <ParticleField class="-z-10" />

    <div class="section-shell py-14 md:py-16 lg:py-20">
      <div class="grid min-h-[60vh] items-center gap-10 lg:min-h-[62vh] lg:grid-cols-[1fr_420px] lg:gap-12 xl:grid-cols-[1fr_480px]">

        <!-- Text content -->
        <div class="drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
          <div class="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span class="h-2 w-2 shrink-0 rounded-full bg-core-orange" />
            <span class="text-sm font-bold text-white/90">SAP Silver Partner</span>
            <img :src="logoSapPartner" alt="SAP Silver Partner" class="h-6 w-auto rounded-sm" />
          </div>

          <h1 class="font-display text-4xl font-extrabold leading-[1.02] md:text-6xl">
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

.hero-mesh {
  background:
    radial-gradient(ellipse 80% 60% at 20% 80%, rgba(47, 184, 212, 0.18), transparent),
    radial-gradient(ellipse 70% 50% at 75% 25%, rgba(96, 106, 244, 0.22), transparent),
    radial-gradient(ellipse 50% 40% at 50% 50%, rgba(18, 59, 102, 0.3), transparent),
    linear-gradient(180deg, #07111f 0%, #0b1d33 100%);
}

@media (prefers-reduced-motion: reduce) {
  lottie-player { display: none; }
}
</style>

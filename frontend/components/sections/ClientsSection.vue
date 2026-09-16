<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { clientLogos } from '~/data/landing'

const { t } = useI18n()
const doubled = [...clientLogos, ...clientLogos]

const trackRef = ref<HTMLElement | null>(null)

const AUTO_SCROLL_SPEED = 0.6
let rafId = 0
let isPointerDown = false
let isDragging = false
let pointerStartX = 0
let scrollStartLeft = 0
let resumeTimer: ReturnType<typeof setTimeout> | undefined
let isPaused = false

function wrapScroll(el: HTMLElement) {
  const half = el.scrollWidth / 2
  if (el.scrollLeft >= half) el.scrollLeft -= half
  else if (el.scrollLeft < 0) el.scrollLeft += half
}

function tick() {
  const el = trackRef.value
  if (el && !isPaused) {
    el.scrollLeft += AUTO_SCROLL_SPEED
    wrapScroll(el)
  }
  rafId = requestAnimationFrame(tick)
}

function pause() {
  isPaused = true
  clearTimeout(resumeTimer)
}

function scheduleResume() {
  clearTimeout(resumeTimer)
  resumeTimer = setTimeout(() => { isPaused = false }, 1500)
}

function onPointerDown(event: PointerEvent) {
  const el = trackRef.value
  if (!el) return
  isPointerDown = true
  isDragging = false
  pause()
  pointerStartX = event.clientX
  scrollStartLeft = el.scrollLeft
}

function onPointerMove(event: PointerEvent) {
  const el = trackRef.value
  if (!isPointerDown || !el) return
  const delta = event.clientX - pointerStartX
  if (!isDragging && Math.abs(delta) > 3) isDragging = true
  if (!isDragging) return
  event.preventDefault()
  el.scrollLeft = scrollStartLeft - delta
  wrapScroll(el)
}

function endDrag() {
  if (!isPointerDown) return
  isPointerDown = false
  isDragging = false
  scheduleResume()
}

function onScroll() {
  if (!isPointerDown) scheduleResume()
}

onMounted(() => {
  rafId = requestAnimationFrame(tick)
  trackRef.value?.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  clearTimeout(resumeTimer)
  trackRef.value?.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <section id="clientes" class="relative overflow-hidden py-16 md:py-20">

    <div class="section-shell relative">
      <h2 v-reveal class="text-center font-display text-3xl font-extrabold md:text-5xl">{{ t('clients.title') }}</h2>
      <p v-reveal="{ delay: 120, distance: 26 }" class="mx-auto mt-4 max-w-2xl text-center text-lg leading-8 text-slate-600">
        {{ t('clients.description') }}
      </p>
    </div>

    <div
      ref="trackRef"
      class="carousel-mask carousel-track relative mt-10 flex cursor-grab gap-4 overflow-x-auto px-10 active:cursor-grabbing md:px-16 lg:px-28"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="endDrag"
      @pointerleave="endDrag"
      @pointercancel="endDrag"
    >
      <figure
        v-for="(client, index) in doubled"
        :key="`${client.name}-${index}`"
        class="grid h-28 w-48 flex-shrink-0 place-items-center"
        :aria-hidden="index >= clientLogos.length ? 'true' : undefined"
      >
        <img
          v-if="client.src"
          :class="['w-full select-none object-contain', client.prominent ? 'max-h-20 max-w-[7rem]' : 'max-h-14 max-w-[9rem]']"
          :style="{ mixBlendMode: 'screen' }"
          :src="client.src"
          :alt="t('clients.logoAlt', { name: client.name })"
          :width="client.width"
          :height="client.height"
          loading="lazy"
          draggable="false"
        >
        <figcaption v-else class="select-none font-display text-2xl font-extrabold tracking-wide text-slate-600">
          {{ client.name }}
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.carousel-mask {
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.carousel-track {
  scrollbar-width: none;
  -ms-overflow-style: none;
  overscroll-behavior-x: contain;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}
</style>

<template>
  <section class="mt-12 md:mt-16">
    <div
      class="group relative w-full overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-[#fafbfe] to-[#eef2f8] py-7 text-core-ink shadow-[0_26px_70px_-30px_rgba(7,17,31,0.4)] ring-1 ring-black/5 md:rounded-[36px] md:py-9"
      style="perspective: 1200px"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <!-- cursor spotlight -->
      <div class="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300" :style="glowStyle"></div>
      <div class="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-core-ink/10 to-transparent"></div>

      <!-- 3D stage -->
      <div
        ref="sceneRef"
        class="section-shell relative [transform-style:preserve-3d]"
        :style="sceneStyle"
      >
        <!-- depth: receding ambient orbs -->
        <div class="pointer-events-none absolute inset-0" style="transform: translateZ(-60px)">
          <div
            class="absolute -right-10 -top-16 h-72 w-72 rounded-full opacity-20 blur-[110px]"
            :style="{ backgroundColor: accentColor }"
          ></div>
          <div class="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-core-orange/15 blur-[110px]"></div>
        </div>

        <div class="relative flex flex-col items-start gap-5 md:flex-row md:items-center md:justify-between md:gap-12">
          <!-- text layer -->
          <div class="max-w-2xl" style="transform: translateZ(35px)">
            <span
              class="inline-flex items-center gap-2 rounded-full bg-core-orange/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-core-orange ring-1 ring-core-orange/20"
            >
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5 text-core-orange" fill="currentColor">
                <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
              </svg>
              {{ badge }}
            </span>

            <h2 class="mt-3 font-display text-2xl font-extrabold leading-tight text-core-ink md:text-[2rem]">
              {{ title }}
            </h2>

            <p class="mt-2 max-w-md text-[15px] leading-6 text-slate-600">
              {{ description }}
            </p>
          </div>

          <!-- CTA layer (pops most) -->
          <div class="relative shrink-0" style="transform: translateZ(80px)">
            <NuxtLink
              v-if="ctaHref"
              :to="ctaHref"
              class="group/cta inline-flex items-center gap-2 rounded-full bg-core-orange px-7 py-4 text-base font-bold text-white shadow-lift transition duration-200 hover:bg-[#D9661F]"
            >
              {{ ctaLabel }}
              <span aria-hidden="true" class="transition-transform duration-200 group-hover/cta:translate-x-1">→</span>
            </NuxtLink>

            <!-- floating depth accents -->
            <span
              class="absolute -right-4 -top-5 h-3 w-3 rounded-full bg-core-orange shadow-lg"
              style="transform: translateZ(40px)"
            ></span>
            <span
              class="absolute -bottom-4 -left-3 h-2 w-2 rounded-full"
              :class="accent === 'orange' ? 'bg-[#38bdf8]' : 'bg-core-orange'"
              style="transform: translateZ(60px)"
            ></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  badge: { type: String, default: "What's New" },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  ctaLabel: { type: String, default: 'Learn more' },
  ctaHref: { type: String, default: '' },
  visualType: { type: String, default: 'identity' },
  image: { type: String, default: '' },
  accent: { type: String, default: 'blue' },
})

const accentColor = computed(() => (props.accent === 'orange' ? '#f17d30' : '#38bdf8'))

const rx = ref(0)
const ry = ref(0)
const gx = ref(50)
const gy = ref(0)
const active = ref(false)

let reduceMotion = false
onMounted(() => {
  reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
})

function onMove(e) {
  if (reduceMotion) return
  const rect = e.currentTarget.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  ry.value = (px - 0.5) * 11
  rx.value = -(py - 0.5) * 8
  gx.value = px * 100
  gy.value = py * 100
  active.value = true
}

function onLeave() {
  rx.value = 0
  ry.value = 0
  gx.value = 50
  gy.value = 30
  active.value = false
}

const sceneStyle = computed(() => ({
  transform: `rotateX(${rx.value}deg) rotateY(${ry.value}deg)`,
  transition: active.value
    ? 'transform 80ms linear'
    : 'transform 650ms cubic-bezier(0.22,1,0.36,1)'
}))

const glowStyle = computed(() => ({
  background: `radial-gradient(600px circle at ${gx.value}% ${gy.value}%, rgba(241,125,48,0.12), transparent 50%)`,
  opacity: active.value ? 1 : 0.45
}))
</script>

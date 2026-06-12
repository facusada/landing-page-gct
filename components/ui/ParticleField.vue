<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    density?: number
    linkDistance?: number
    spotlight?: boolean
  }>(),
  {
    density: 1,
    linkDistance: 130,
    spotlight: true
  }
)

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
}

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const mx = ref('50%')
const my = ref('50%')
const spotlightOn = ref(false)

const dotColors = ['rgba(47,184,212,', 'rgba(96,106,244,', 'rgba(241,125,48,']

let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let width = 0
let height = 0
let raf = 0
let running = false
let resizeObserver: ResizeObserver | null = null
let intersectionObserver: IntersectionObserver | null = null
let parent: Element | null = null

const matches = (query: string) =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(query).matches

const finePointer = () => matches('(hover: hover) and (pointer: fine)')

const initParticles = () => {
  const count = Math.min(90, Math.round(((width * height) / 16000) * props.density))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  }))
}

const resize = () => {
  if (!root.value || !canvas.value || !ctx) {
    return
  }
  const rect = root.value.getBoundingClientRect()
  width = rect.width
  height = rect.height
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(width * dpr)
  canvas.value.height = Math.round(height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  initParticles()
}

const step = () => {
  if (!ctx) {
    return
  }
  ctx.clearRect(0, 0, width, height)
  const ld = props.linkDistance

  for (const p of particles) {
    p.x += p.vx
    p.y += p.vy
    if (p.x <= 0 || p.x >= width) p.vx *= -1
    if (p.y <= 0 || p.y >= height) p.vy *= -1
  }

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]
    if (!a) continue
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]
      if (!b) continue
      const dx = a.x - b.x
      const dy = a.y - b.y
      const dist = Math.hypot(dx, dy)
      if (dist < ld) {
        ctx.strokeStyle = `rgba(150,170,210,${((1 - dist / ld) * 0.16).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
  }

  particles.forEach((p, i) => {
    if (!ctx) return
    ctx.fillStyle = `${dotColors[i % dotColors.length]}0.5)`
    ctx.beginPath()
    ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
    ctx.fill()
  })

  raf = requestAnimationFrame(step)
}

const start = () => {
  if (running) return
  running = true
  raf = requestAnimationFrame(step)
}

const stop = () => {
  running = false
  cancelAnimationFrame(raf)
}

const onPointerMove = (event: PointerEvent) => {
  if (!parent) return
  const rect = parent.getBoundingClientRect()
  mx.value = `${(((event.clientX - rect.left) / rect.width) * 100).toFixed(2)}%`
  my.value = `${(((event.clientY - rect.top) / rect.height) * 100).toFixed(2)}%`
  spotlightOn.value = true
}

const onPointerLeave = () => {
  spotlightOn.value = false
}

const useSpotlight = ref(false)

onMounted(() => {
  if (matches('(prefers-reduced-motion: reduce)') || matches('(max-width: 767px)')) {
    return
  }
  try {
    ctx = canvas.value?.getContext('2d') ?? null
  } catch {
    ctx = null
  }
  if (!ctx) {
    return
  }

  resize()

  const el = root.value as unknown as Element | null

  if (typeof ResizeObserver !== 'undefined' && el) {
    resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(el)
  }

  if (typeof IntersectionObserver !== 'undefined' && el) {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          start()
        } else {
          stop()
        }
      },
      { threshold: 0 }
    )
    intersectionObserver.observe(el)
  } else {
    start()
  }

  if (props.spotlight && finePointer()) {
    useSpotlight.value = true
    parent = (el?.parentElement ?? null) as unknown as Element | null
    parent?.addEventListener('pointermove', onPointerMove as EventListener)
    parent?.addEventListener('pointerleave', onPointerLeave as EventListener)
  }
})

onBeforeUnmount(() => {
  stop()
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  parent?.removeEventListener('pointermove', onPointerMove as EventListener)
  parent?.removeEventListener('pointerleave', onPointerLeave as EventListener)
})
</script>

<template>
  <div ref="root" class="particle-field" aria-hidden="true">
    <canvas ref="canvas" class="particle-canvas" />
    <div
      v-if="useSpotlight"
      class="particle-spotlight"
      :style="{ '--mx': mx, '--my': my, opacity: spotlightOn ? '1' : '0' }"
    />
  </div>
</template>

<style scoped>
.particle-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.particle-canvas {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
}

.particle-spotlight {
  position: absolute;
  inset: 0;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(96, 106, 244, 0.2), transparent 60%);
  transition: opacity 450ms ease;
}
</style>

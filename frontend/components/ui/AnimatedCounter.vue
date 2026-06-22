<script setup lang="ts">
import { useCountUp } from '~/composables/useCountUp'

const props = withDefaults(
  defineProps<{
    value: number
    prefix?: string
    suffix?: string
    label: string
    detail?: string
    duration?: number
  }>(),
  {
    prefix: '',
    suffix: '',
    duration: 2000
  }
)

const counterEl = ref<HTMLElement | null>(null)
const hasTriggered = ref(false)
const { current, start } = useCountUp(props.value, props.duration)

const displayValue = computed(() => `${props.prefix}${current.value}${props.suffix}`)

onMounted(() => {
  const el = counterEl.value
  if (!el) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !hasTriggered.value) {
          hasTriggered.value = true
          start()
          observer.disconnect()
        }
      }
    },
    { threshold: 0.3 }
  )

  observer.observe(el as unknown as Element)

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div ref="counterEl" class="border-l border-white/20 pl-5">
    <p class="font-display text-4xl font-extrabold text-white md:text-5xl">
      {{ displayValue }}
    </p>
    <p class="mt-1 text-sm font-bold text-white/80">{{ label }}</p>
    <p v-if="detail" class="mt-1 text-sm text-white/50">{{ detail }}</p>
  </div>
</template>

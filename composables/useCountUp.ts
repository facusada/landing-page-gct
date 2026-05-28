export function useCountUp(target: number, duration = 2000) {
  const current = ref(0)
  const isComplete = ref(false)
  let animationId: number | null = null

  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const start = () => {
    if (prefersReducedMotion()) {
      current.value = target
      isComplete.value = true
      return
    }

    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      current.value = Math.round(easeOutCubic(progress) * target)

      if (progress < 1) {
        animationId = requestAnimationFrame(step)
      } else {
        current.value = target
        isComplete.value = true
        animationId = null
      }
    }

    animationId = requestAnimationFrame(step)
  }

  const stop = () => {
    if (animationId !== null) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
  }

  onBeforeUnmount(stop)

  return { current, isComplete, start, stop }
}

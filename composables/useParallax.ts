export function useParallax(element: Ref<HTMLElement | null>, speed = 0.15) {
  if (!import.meta.client) return

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let ticking = false

  const update = () => {
    const el = element.value
    if (!el || prefersReducedMotion()) return

    const rect = el.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const visible = rect.top < windowHeight && rect.bottom > 0

    if (visible) {
      const center = rect.top + rect.height / 2
      const offset = (center - windowHeight / 2) * speed
      el.style.transform = `translateY(${offset}px)`
    }
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true
      requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
}

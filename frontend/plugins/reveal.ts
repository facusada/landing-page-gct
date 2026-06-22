type RevealElement = HTMLElement & {
  __revealObserver?: IntersectionObserver
}

const revealClass = 'reveal-visible'
type RevealOptions = {
  delay: number
  distance: number
  duration: number
  threshold: number
  rootMargin: string
}

const defaultRevealOptions: RevealOptions = {
  delay: 0,
  distance: 34,
  duration: 760,
  threshold: 0.16,
  rootMargin: '0px 0px -10% 0px'
}

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const normalizeRevealOptions = (value: unknown): RevealOptions => {
  if (typeof value === 'number') {
    return { ...defaultRevealOptions, delay: value }
  }

  if (!value || typeof value !== 'object') {
    return defaultRevealOptions
  }

  const options = value as Partial<RevealOptions>
  return {
    delay: typeof options.delay === 'number' ? options.delay : defaultRevealOptions.delay,
    distance:
      typeof options.distance === 'number'
        ? options.distance
        : defaultRevealOptions.distance,
    duration:
      typeof options.duration === 'number'
        ? options.duration
        : defaultRevealOptions.duration,
    threshold:
      typeof options.threshold === 'number'
        ? options.threshold
        : defaultRevealOptions.threshold,
    rootMargin:
      typeof options.rootMargin === 'string'
        ? options.rootMargin
        : defaultRevealOptions.rootMargin
  }
}

const setRevealCssVars = (element: RevealElement, options: RevealOptions) => {
  element.style.setProperty('--reveal-delay', `${options.delay}ms`)
  element.style.setProperty('--reveal-distance', `${options.distance}px`)
  element.style.setProperty('--reveal-duration', `${options.duration}ms`)
}

const setupReveal = (element: RevealElement, options: RevealOptions) => {
  setRevealCssVars(element, options)
  element.classList.add('reveal-on-scroll')

  if (prefersReducedMotion()) {
    element.classList.add(revealClass)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return
        }

        element.classList.add(revealClass)
        observer.unobserve(element)
      })
    },
    { threshold: options.threshold, rootMargin: options.rootMargin }
  )

  observer.observe(element)
  element.__revealObserver = observer
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', {
    mounted(element: RevealElement, binding) {
      if (!import.meta.client) {
        return
      }

      const options = normalizeRevealOptions(binding.value)
      setupReveal(element, options)
    },
    unmounted(element: RevealElement) {
      if (!import.meta.client) {
        return
      }

      element.__revealObserver?.disconnect()
      delete element.__revealObserver
    },
    getSSRProps(binding) {
      const options = normalizeRevealOptions(binding.value)
      return {
        class: 'reveal-on-scroll',
        style: `--reveal-delay:${options.delay}ms;--reveal-distance:${options.distance}px;--reveal-duration:${options.duration}ms;`
      }
    }
  })
})

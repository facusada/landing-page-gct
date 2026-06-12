type TiltElement = HTMLElement & {
  __tiltHandlers?: {
    move: (event: PointerEvent) => void
    leave: () => void
  }
}

const MAX_TILT = 6

const matches = (query: string) =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(query).matches

const canTilt = () =>
  !matches('(prefers-reduced-motion: reduce)') &&
  matches('(hover: hover) and (pointer: fine)')

const setup = (element: TiltElement) => {
  if (!canTilt()) {
    return
  }

  const move = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    const rotateY = (px - 0.5) * 2 * MAX_TILT
    const rotateX = -(py - 0.5) * 2 * MAX_TILT
    element.style.transition = 'transform 120ms ease-out'
    element.style.transform = `perspective(820px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`
  }

  const leave = () => {
    element.style.transition = 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1)'
    element.style.transform = ''
  }

  element.style.willChange = 'transform'
  element.addEventListener('pointermove', move)
  element.addEventListener('pointerleave', leave)
  element.__tiltHandlers = { move, leave }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('tilt', {
    mounted(element: TiltElement) {
      if (!import.meta.client) {
        return
      }
      setup(element)
    },
    unmounted(element: TiltElement) {
      if (!import.meta.client) {
        return
      }
      const handlers = element.__tiltHandlers
      if (handlers) {
        element.removeEventListener('pointermove', handlers.move)
        element.removeEventListener('pointerleave', handlers.leave)
        delete element.__tiltHandlers
      }
    }
  })
})

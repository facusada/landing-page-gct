import { vi } from 'vitest'

// useLocalizedTo() calls @nuxtjs/i18n's useLocalePath() under the hood, which
// needs a Nuxt instance unavailable in unit tests. Replace it with an identity
// so components that build locale-aware links can mount without a Nuxt app.
vi.mock('~/composables/useLocalizedTo', () => ({
  useLocalizedTo: () => (to: string) => to
}))

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { createI18n } from 'vue-i18n'
import AppHeader from '../../components/AppHeader.vue'
import { navigationItems } from '../../data/navigation'
import en from '../../locales/en.json'
import es from '../../locales/es.json'

const NuxtLinkStub = defineComponent({
  name: 'NuxtLink',
  props: { to: { type: [String, Object], default: '' } },
  setup(props, { slots }) {
    return () => h('a', { href: typeof props.to === 'string' ? props.to : '/' }, slots.default?.())
  }
})

vi.mock('#app/composables/router', () => ({
  useRoute: () => ({ path: '/', params: {}, query: {} }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() })
}))

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: { es, en }
})

// El composable de @nuxtjs/i18n expone `locales` y `setLocale` sobre el composer global
Object.assign(i18n.global, {
  locales: ref([{ code: 'es' }, { code: 'en' }]),
  setLocale: vi.fn()
})

vi.mock('#imports', () => ({
  ref,
  computed: (fn: () => unknown) => ({ value: fn() }),
  watch: vi.fn(),
  useRoute: () => ({ path: '/', params: {}, query: {} }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() })
}))

describe('AppHeader', () => {
  const mountOptions = {
    global: {
      plugins: [i18n],
      stubs: { NuxtLink: NuxtLinkStub }
    }
  }

  it('renders the brand and navigation links', () => {
    const wrapper = mount(AppHeader, mountOptions)

    expect(wrapper.find('img[alt="Global Core Technologies"]').exists()).toBe(true)
    expect(navigationItems.length).toBeGreaterThan(0)
    expect(wrapper.findAll('a').length).toBeGreaterThan(0)
  })

  it('opens mobile navigation from the menu button', async () => {
    const wrapper = mount(AppHeader, mountOptions)

    await wrapper.get('button[aria-controls="mobile-navigation"]').trigger('click')

    expect(wrapper.get('#mobile-navigation').isVisible()).toBe(true)
  })
})

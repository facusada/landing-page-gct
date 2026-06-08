import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import AppHeader from '../../components/AppHeader.vue'
import { navigationItems } from '../../data/navigation'

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

    await wrapper.get('button').trigger('click')

    expect(wrapper.get('#mobile-navigation').isVisible()).toBe(true)
  })
})

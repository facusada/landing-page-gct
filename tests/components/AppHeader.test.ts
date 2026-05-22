import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppHeader from '../../components/AppHeader.vue'
import { navigationItems } from '../../data/navigation'

describe('AppHeader', () => {
  it('renders the brand and navigation links', () => {
    const wrapper = mount(AppHeader)

    expect(wrapper.find('img[alt="Global Core Technologies"]').exists()).toBe(true)
    for (const item of navigationItems) {
      expect(wrapper.text()).toContain(item.label)
      expect(wrapper.find(`a[href="${item.href}"]`).exists()).toBe(true)
    }
  })

  it('opens mobile navigation from the menu button', async () => {
    const wrapper = mount(AppHeader)

    await wrapper.get('button').trigger('click')

    expect(wrapper.get('#mobile-navigation').isVisible()).toBe(true)
  })
})

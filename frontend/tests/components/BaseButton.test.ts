import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseButton from '../../components/ui/BaseButton.vue'

describe('BaseButton', () => {
  it('renders a primary CTA link', () => {
    const wrapper = mount(BaseButton, {
      props: { href: '#contacto' },
      slots: { default: 'Hablemos' }
    })

    expect(wrapper.get('a').attributes('href')).toBe('#contacto')
    expect(wrapper.text()).toContain('Hablemos')
  })
})

import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import AppFooter from '../../components/AppFooter.vue'
import AppHeader from '../../components/AppHeader.vue'
import AboutSection from '../../components/sections/AboutSection.vue'
import ClientsSection from '../../components/sections/ClientsSection.vue'
import ContactCtaSection from '../../components/sections/ContactCtaSection.vue'
import DifferentiatorsSection from '../../components/sections/DifferentiatorsSection.vue'
import HeroSection from '../../components/sections/HeroSection.vue'
import IndustriesSection from '../../components/sections/IndustriesSection.vue'
import ServicesSection from '../../components/sections/ServicesSection.vue'
import TechnologySection from '../../components/sections/TechnologySection.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import FeatureCard from '../../components/ui/FeatureCard.vue'
import SectionHeading from '../../components/ui/SectionHeading.vue'
import IndexPage from '../../pages/index.vue'
import { services } from '../../data/landing'

vi.mock('#app/composables/head', () => ({
  useSeoMeta: vi.fn()
}))

const globalComponents = {
  AppFooter,
  AppHeader,
  AboutSection,
  BaseButton,
  ClientsSection,
  ContactCtaSection,
  DifferentiatorsSection,
  FeatureCard,
  HeroSection,
  IndustriesSection,
  SectionHeading,
  ServicesSection,
  TechnologySection
}

describe('home page', () => {
  it('renders the principal landing sections', () => {
    const wrapper = mount(IndexPage, {
      global: {
        components: globalComponents
      }
    })

    expect(wrapper.find('h1').text()).toContain('Global Core Technologies')
    expect(wrapper.text()).toContain('Servicios SAP')
    expect(wrapper.text()).toContain('Clientes que confían')
    expect(wrapper.find('img[alt="Logo de Mercado Libre"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Tenaris')
    expect(wrapper.text()).toContain('Haleon')
    expect(wrapper.text()).toContain('Tu estrategia SAP')
  })

  it('renders every configured service', () => {
    const wrapper = mount(IndexPage, {
      global: {
        components: globalComponents
      }
    })

    for (const service of services) {
      expect(wrapper.text()).toContain(service.title)
    }
  })
})

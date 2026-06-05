import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
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
import AnimatedCounter from '../../components/ui/AnimatedCounter.vue'
import BaseButton from '../../components/ui/BaseButton.vue'
import FeatureCard from '../../components/ui/FeatureCard.vue'
import SectionHeading from '../../components/ui/SectionHeading.vue'
import ServiceIcon from '../../components/ui/ServiceIcon.vue'
import TabPanel from '../../components/ui/TabPanel.vue'
import IndexPage from '../../pages/index.vue'
import { services } from '../../data/landing'

vi.mock('#app/composables/head', () => ({
  useSeoMeta: vi.fn()
}))

vi.mock('#app/composables/router', () => ({
  useRoute: () => ({ path: '/', params: {}, query: {} }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() })
}))

vi.mock('#imports', () => ({
  ref: (val: unknown) => ({ value: val }),
  computed: (fn: () => unknown) => ({ value: fn() }),
  watch: vi.fn(),
  onMounted: vi.fn(),
  onBeforeUnmount: vi.fn(),
  useRoute: () => ({ path: '/', params: {}, query: {} }),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useSeoMeta: vi.fn()
}))

const NuxtLinkStub = defineComponent({
  name: 'NuxtLink',
  props: { to: { type: [String, Object], default: '' } },
  setup(props, { slots }) {
    return () => h('a', { href: typeof props.to === 'string' ? props.to : '/' }, slots.default?.())
  }
})

const globalComponents = {
  AppFooter,
  AppHeader,
  AboutSection,
  AnimatedCounter,
  BaseButton,
  ClientsSection,
  ContactCtaSection,
  DifferentiatorsSection,
  FeatureCard,
  HeroSection,
  IndustriesSection,
  SectionHeading,
  ServiceIcon,
  ServicesSection,
  TabPanel,
  TechnologySection
}

describe('home page', () => {
  const mountOptions = {
    global: {
      components: globalComponents,
      stubs: { NuxtLink: NuxtLinkStub }
    }
  }

  it('renders the principal landing sections', () => {
    const wrapper = mount(IndexPage, mountOptions)

    expect(wrapper.find('h1').text()).toContain('Consultoría SAP')
    expect(wrapper.text()).toContain('Servicios SAP')
    expect(wrapper.text()).toContain('Clientes que confían')
    expect(wrapper.text()).toContain('Tu estrategia SAP')
  })

  it('renders every configured service', () => {
    const wrapper = mount(IndexPage, mountOptions)

    for (const service of services) {
      expect(wrapper.text()).toContain(service.title)
    }
  })
})

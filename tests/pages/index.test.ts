import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { defineComponent, h } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '../../locales/en.json'
import es from '../../locales/es.json'
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
import { pillars } from '../../data/landing'
import { sapProducts } from '../../data/sap-products'

vi.mock('#app/composables/head', () => ({
  useSeoMeta: vi.fn(),
  useHead: vi.fn()
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

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'es',
  messages: { es, en }
})

describe('home page', () => {
  const mountOptions = {
    global: {
      components: globalComponents,
      plugins: [i18n],
      stubs: { NuxtLink: NuxtLinkStub }
    }
  }

  it('renders the principal landing sections', () => {
    const wrapper = mount(IndexPage, mountOptions)

    expect(wrapper.find('h1').text()).toContain('Transformación, seguridad y operación inteligente de SAP')
    expect(wrapper.text()).toContain('Soluciones SAP que implementamos')
    expect(wrapper.text()).toContain('cinco pilares')
    expect(wrapper.text()).toContain('Intelliguard')
    expect(wrapper.text()).toContain('Operations Intelligence')
    expect(wrapper.text()).toContain('Más que consultoría SAP')
    expect(wrapper.text()).toContain('Clientes que confían')
    expect(wrapper.text()).toContain('transformar tu ecosistema SAP')
  })

  it('links to every pillar and SAP solution', () => {
    const wrapper = mount(IndexPage, mountOptions)

    for (const pillar of pillars) {
      expect(wrapper.html()).toContain(`/pilares/${pillar.id}`)
    }
    for (const product of sapProducts) {
      expect(wrapper.html()).toContain(`/soluciones/${product.id}`)
    }
  })
})

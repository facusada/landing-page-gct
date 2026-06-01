<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue'
import ClientsSection from '~/components/sections/ClientsSection.vue'
import ContactCtaSection from '~/components/sections/ContactCtaSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import IndustriesSection from '~/components/sections/IndustriesSection.vue'
import SapProductsSection from '~/components/sections/SapProductsSection.vue'
import SapSolutionsSection from '~/components/sections/SapSolutionsSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import TechnologySection from '~/components/sections/TechnologySection.vue'
import TestimonialsSection from '~/components/sections/TestimonialsSection.vue'
import { siteConfig } from '~/data/site'

const pageTitle = 'Consultoria SAP, seguridad GRC, cloud e AI'
const pageDescription =
  'Global Core Technologies ayuda a empresas medianas y grandes a modernizar, asegurar y operar plataformas SAP con foco en S/4HANA, GRC, AMS, cloud e inteligencia artificial.'

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: `${pageTitle} | ${siteConfig.name}`,
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: siteConfig.url,
  ogImage: `${siteConfig.url}/og-image.svg`,
  twitterCard: 'summary_large_image',
  twitterTitle: `${pageTitle} | ${siteConfig.name}`,
  twitterDescription: pageDescription,
  twitterImage: `${siteConfig.url}/og-image.svg`
})
</script>

<template>
  <HeroSection />
  <AboutSection />
  <ServicesSection />
  <SapSolutionsSection />
  <SapProductsSection />
  <IndustriesSection />
  <TechnologySection />
  <ClientsSection />
  <TestimonialsSection />
  <ContactCtaSection />
</template>

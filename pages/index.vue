<script setup lang="ts">
import AboutSection from '~/components/sections/AboutSection.vue'
import ClientsSection from '~/components/sections/ClientsSection.vue'
import ContactCtaSection from '~/components/sections/ContactCtaSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import IndustriesSection from '~/components/sections/IndustriesSection.vue'
import SapProductsSection from '~/components/sections/SapProductsSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import TechnologySection from '~/components/sections/TechnologySection.vue'
import { siteConfig } from '~/data/site'

const { t } = useI18n()

const pageTitle = computed(() => t('hero.title'))
const pageDescription = computed(() => t('hero.description'))

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: computed(() => `${pageTitle.value} | ${siteConfig.name}`),
  ogDescription: pageDescription,
  ogType: 'website',
  ogUrl: siteConfig.url,
  ogImage: `${siteConfig.url}/og-image.svg`,
  twitterCard: 'summary_large_image',
  twitterTitle: computed(() => `${pageTitle.value} | ${siteConfig.name}`),
  twitterDescription: pageDescription,
  twitterImage: `${siteConfig.url}/og-image.svg`
})
</script>

<template>
  <HeroSection />
  <AboutSection />
  <SapProductsSection />
  <ServicesSection />
  <IndustriesSection />
  <TechnologySection />
  <ClientsSection />
  <ContactCtaSection />
</template>

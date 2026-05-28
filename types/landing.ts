export interface NavigationItem {
  label: string
  to: string
  href?: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface HeroSlide {
  src: string
  alt: string
  label: string
}

export interface ServiceItem {
  title: string
  slug: string
  icon: string
  description: string
  longDescription: string
  features: string[]
  benefits: string[]
  proof: string
}

export interface DifferentiatorItem {
  value: string
  numericValue: number
  prefix?: string
  suffix?: string
  label: string
  detail: string
}

export interface IndustryItem {
  name: string
  icon: string
  description: string
}

export interface TechnologyPillar {
  title: string
  description: string
  tags: string[]
  accent: string
}

export interface ClientLogo {
  name: string
  src?: string
  width?: number
  height?: number
  tone?: 'light' | 'dark'
}

export interface TestimonialItem {
  quote: string
  personName: string
  role: string
  company: string
}

export interface SapSolutionItem {
  title: string
  slug: string
  description: string
  features: string[]
  cta: string
  ctaTo: string
}

export interface TabItem {
  id: string
  label: string
  content: string
}

export interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
  serviceInterest: string
}

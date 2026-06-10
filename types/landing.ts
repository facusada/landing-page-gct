export interface NavigationItem {
  key: string
  to: string
}

export interface ServiceItem {
  slug: string
  icon: string
}

export interface ServiceModule {
  slug: string
  icon: string
  image: string
}

export interface DifferentiatorItem {
  id: string
  numericValue: number
  prefix?: string
  suffix?: string
}

export interface HeroMetric {
  id: string
  numericValue: number
  prefix?: string
  suffix?: string
}

export interface PillarItem {
  id: string
  index: string
  iconPaths: string[]
  to: string
  image: string
  bgPosition?: string
}

export interface FeaturedExpertiseItem {
  id: string
  pillarTag: string
  to: string
  flip?: boolean
}

export interface PlatformItem {
  id: string
  accent: 'orange' | 'cyan'
  iconPaths: string[]
}

export interface TrustCardItem {
  id: string
  tag: string
}

export interface IndustryItem {
  id: string
  icon: string
}

export interface TechnologyPillar {
  id: string
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

export interface TabItem {
  id: string
  label: string
  content: string
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

export interface ContactFormData {
  name: string
  email: string
  company: string
  message: string
  serviceInterest: string
}

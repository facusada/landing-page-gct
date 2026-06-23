export interface NavigationChild {
  key: string
  to: string
  labelKey: string
  index?: string
}

export interface NavigationLink {
  key: string
  to: string
  children?: never
}

export interface NavigationDropdown {
  key: string
  to?: never
  children: NavigationChild[]
}

export type NavigationItem = NavigationLink | NavigationDropdown

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
  relatedSlug?: string
}

export interface PillarServiceItem {
  id: string
  icon?: string
}

export interface L3ServiceMetric {
  id: string
  numericValue: number
  prefix?: string
  suffix?: string
}

export interface PillarL3Service {
  /** Pillar slug this service belongs to, e.g. 'transform' */
  pillar: string
  /** Existing pillarDetail.items.<pillar>.<key> key, e.g. 's4hana' */
  key: string
  /** URL slug used at /pilares/<pillar>/<slug> */
  slug: string
  icon: string
  /** Hero background image (defaults to the pillar image) */
  image: string
  bgPosition?: string
  /** Hero proof metrics rendered with AnimatedCounter */
  metrics: L3ServiceMetric[]
  /** Optional innovation platform cross-link, e.g. '/plataformas/intelliguard' */
  platformLink?: string
}

export interface FeaturedExpertiseItem {
  id: string
  pillarTag: string
  to: string
  flip?: boolean
}

export interface PlatformItem {
  id: string
  slug: string
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
  prominent?: boolean
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

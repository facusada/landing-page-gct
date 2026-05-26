export interface NavigationItem {
  label: string
  href: string
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
  description: string
  proof: string
}

export interface DifferentiatorItem {
  value: string
  label: string
  detail: string
}

export interface IndustryItem {
  name: string
  description: string
}

export interface TechnologyPillar {
  title: string
  description: string
  tags: string[]
}

export interface ClientLogo {
  name: string
  src?: string
  width?: number
  height?: number
  tone?: 'light' | 'dark'
}

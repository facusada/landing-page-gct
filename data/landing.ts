import type { ClientLogo, DifferentiatorItem, FeaturedExpertiseItem, HeroMetric, IndustryItem, PillarItem, PlatformItem, ServiceItem, ServiceModule, TechnologyPillar, TrustCardItem } from '~/types/landing'

export const differentiators: DifferentiatorItem[] = [
  { id: 'years', numericValue: 20, prefix: '+' },
  { id: 'projects', numericValue: 150, prefix: '+' },
  { id: 'professionals', numericValue: 50, prefix: '+' },
  { id: 'hours', numericValue: 200, prefix: '+', suffix: 'M' }
]

export const heroMetrics: HeroMetric[] = [
  { id: 'years', numericValue: 20, suffix: '+' },
  { id: 'operations', numericValue: 24, suffix: '/7' },
  { id: 'governance', numericValue: 100, suffix: '%' }
]

export const pillars: PillarItem[] = [
  {
    id: 'transform',
    index: '01',
    iconPaths: ['M21 3v6h-6', 'M3 12a9 9 0 0 1 15-6.7L21 9', 'M3 21v-6h6', 'M21 12a9 9 0 0 1-15 6.7L3 15'],
    to: '/pilares/transform',
    relatedSlug: 'migracion-transformacion-sap',
    image: '/pillars/01_transform.png'
  },
  {
    id: 'secure',
    index: '02',
    iconPaths: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z', 'M9 12l2 2 4-4'],
    to: '/pilares/secure',
    relatedSlug: 'seguridad-sap-grc',
    image: '/pillars/02_secure.png'
  },
  {
    id: 'operate',
    index: '03',
    iconPaths: ['M3 12h4l2 6 4-14 2 8h6'],
    to: '/pilares/operate',
    relatedSlug: 'operacion-soporte-ams',
    image: '/pillars/04_operate.png'
  },
  {
    id: 'govern',
    index: '04',
    iconPaths: ['M12 4v16M6 8h12M8 20h8', 'M6 8l-3 6a3 3 0 0 0 6 0z', 'M18 8l-3 6a3 3 0 0 0 6 0z'],
    to: '/pilares/govern',
    relatedSlug: 'servicios-sap-solution-manager',
    image: '/pillars/03_govern.png'
  },
  {
    id: 'innovate',
    index: '05',
    iconPaths: ['M12 3v3M12 18v3M3 12h3M18 12h3M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2', 'M12 8.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4z'],
    to: '/pilares/innovate',
    relatedSlug: 'innovacion-sap',
    image: '/pillars/05_innovate.png',
    bgPosition: '30% center'
  }
]

export const pillarServiceKeys: Record<string, string[]> = {
  transform: ['s4hana', 'riseWithSap', 'readinessAssessment', 'migrationGovernance', 'cleanCoreStrategy'],
  secure: ['sapSecurity', 'rbac', 'sod', 'sapGrc', 'complianceMonitoring', 'securityManagedServices'],
  operate: ['sapAms', 'sapBasis', 'cloudAlm', 'monitoringAutomation', 'rootCauseAnalysis', 'technicalGovernance'],
  govern: ['governanceAdvisory', 'migrationGovernance', 'compliance', 'executiveControls', 'cleanCoreGovernance'],
  innovate: ['aiAutomation', 'btpAutomation', 'intelliguard', 'opsIntelligencePlatform', 'predictiveMonitoring']
}

export const featuredExpertise: FeaturedExpertiseItem[] = [
  { id: 'transformation', pillarTag: '01', to: '/pilares/transform' },
  { id: 'security', pillarTag: '02', to: '/pilares/secure', flip: true },
  { id: 'operations', pillarTag: '03', to: '/pilares/operate' },
  { id: 'governance', pillarTag: '04', to: '/pilares/govern', flip: true },
  { id: 'innovation', pillarTag: '05', to: '/pilares/innovate' }
]

export const platforms: PlatformItem[] = [
  {
    id: 'intelliguard',
    accent: 'orange',
    iconPaths: ['M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z', 'M9 12l2 2 4-4']
  },
  {
    id: 'opsIntelligence',
    accent: 'cyan',
    iconPaths: ['M6 6h12v12H6z', 'M9 1.5v3M15 1.5v3M9 19.5v3M15 19.5v3M1.5 9h3M1.5 15h3M19.5 9h3M19.5 15h3']
  }
]

export const whyItemIds = ['expertise', 'governance', 'security', 'cleanCore', 'ai', 'partnership'] as const

export const trustCards: TrustCardItem[] = [
  { id: 'sap', tag: 'SAP' },
  { id: 'grc', tag: 'GRC' },
  { id: 'ai', tag: 'AI' },
  { id: 'ops', tag: '24/7' }
]

export const services: ServiceItem[] = [
  { slug: 'migracion-transformacion-sap', icon: 'migration' },
  { slug: 'implementacion-sap', icon: 'implementation' },
  { slug: 'seguridad-sap-grc', icon: 'security' },
  { slug: 'operacion-soporte-ams', icon: 'support' },
  { slug: 'innovacion-sap', icon: 'innovation' },
  { slug: 'sap-techs-managed-services', icon: 'managed' },
  { slug: 'sap-performance-services', icon: 'performance' },
  { slug: 'servicios-sap-solution-manager', icon: 'solman' }
]

export const industries: IndustryItem[] = [
  { id: 'manufactura', icon: 'factory' },
  { id: 'logistica', icon: 'truck' },
  { id: 'retail', icon: 'cart' },
  { id: 'energia', icon: 'bolt' },
  { id: 'consumo', icon: 'package' },
  { id: 'farma', icon: 'pharma' }
]

export const technologyPillars: TechnologyPillar[] = [
  { id: 's4hana', tags: ['S/4HANA', 'Clean Core', 'Roadmap'], accent: 'core-blue' },
  { id: 'security', tags: ['RBAC', 'SoD', 'GRC'], accent: 'core-orange' },
  { id: 'cloud', tags: ['Cloud', 'Analytics', 'AI'], accent: 'core-cyan' }
]

export const clientLogos: ClientLogo[] = [
  { name: 'Tecnoperfiles Sustentable', src: '/clients/tecnoperfiles.png', width: 458, height: 110 },
  { name: 'Tenaris' },
  { name: 'Haleon' },
  { name: 'Mercado Libre', src: '/clients/mercado-libre.png', width: 3500, height: 860 },
  { name: 'Pan American Energy', src: '/clients/pan-american-energy.png', width: 324, height: 130 },
  { name: 'COFCO', src: '/clients/cofco.png', width: 280, height: 92 },
  { name: 'Molinos', src: '/clients/molinos.png', width: 628, height: 393 },
  { name: 'Travel Rock', src: '/clients/travel-rock.png', width: 204, height: 192 },
  { name: 'Exolgan Container Terminal', src: '/clients/exolgan.png', width: 177, height: 145 },
  { name: 'Aeropuertos Argentina', src: '/clients/aeropuertos-argentina.png', width: 428, height: 100 },
  { name: 'Hospital Universitario Austral', src: '/clients/hospital-universitario-austral.png', width: 1242, height: 381 }
]

export const serviceModules: ServiceModule[] = [
  { slug: 'migracion-transformacion-sap', icon: 'migration', image: '/services/01_transformacion_sap.png' },
  { slug: 'implementacion-sap', icon: 'implementation', image: '/services/02_implementacion_sap.png' },
  { slug: 'seguridad-sap-grc', icon: 'security', image: '/services/03_seguridad_compliance_sap.png' },
  { slug: 'operacion-soporte-ams', icon: 'support', image: '/services/04_operacion_soporte_sap.png' },
  { slug: 'innovacion-sap', icon: 'innovation', image: '/services/05_innovacion_sap.png' },
  { slug: 'sap-techs-managed-services', icon: 'managed', image: '/services/06_sap_managed_services.png' },
  { slug: 'sap-performance-services', icon: 'performance', image: '/services/07_performance_optimization.png' }
]

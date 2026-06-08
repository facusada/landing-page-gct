import type { ClientLogo, DifferentiatorItem, IndustryItem, ServiceItem, ServiceModule, TechnologyPillar } from '~/types/landing'

export const differentiators: DifferentiatorItem[] = [
  { id: 'years', numericValue: 20, prefix: '+' },
  { id: 'projects', numericValue: 150, prefix: '+' },
  { id: 'professionals', numericValue: 50, prefix: '+' },
  { id: 'hours', numericValue: 200, prefix: '+', suffix: 'M' }
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
  { id: 'energia', icon: 'bolt' },
  { id: 'industria', icon: 'factory' },
  { id: 'retail', icon: 'cart' },
  { id: 'servicios', icon: 'shield' }
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

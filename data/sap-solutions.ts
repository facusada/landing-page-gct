import type { SapSolutionItem } from '~/types/landing'

export const sapSolutions: SapSolutionItem[] = [
  {
    title: 'Migración S/4HANA',
    slug: 'migracion-transformacion-sap',
    description: 'Llevá tu landscape SAP al futuro con una estrategia de migración que minimiza riesgos y maximiza adopción.',
    features: [
      'Assessment técnico completo',
      'Roadmap de migración personalizado',
      'Estrategias Brownfield, Greenfield e híbrida',
      'Soporte post-migración y estabilización'
    ],
    cta: 'Planificar migración',
    ctaTo: '/servicios/migracion-transformacion-sap'
  },
  {
    title: 'Implementación SAP',
    slug: 'implementacion-sap',
    description: 'Implementaciones con enfoque Clean Core, trazabilidad completa y adopción garantizada por el equipo.',
    features: [
      'Metodología SAP Activate',
      'Enfoque Clean Core',
      'Rollouts regionales y multi-país',
      'Capacitación y change management'
    ],
    cta: 'Conocer enfoque',
    ctaTo: '/servicios/implementacion-sap'
  },
  {
    title: 'Seguridad & GRC',
    slug: 'seguridad-sap-grc',
    description: 'Protegé tu entorno SAP con gobierno de accesos, compliance continuo y controles que pasan cualquier auditoría.',
    features: [
      'Modelo de roles RBAC alineado al negocio',
      'Análisis y remediación SoD',
      'Monitoreo continuo de accesos',
      'Preparación para auditorías SOX y GDPR'
    ],
    cta: 'Evaluar seguridad',
    ctaTo: '/servicios/seguridad-sap-grc'
  }
]

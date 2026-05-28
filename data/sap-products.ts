export interface SapProduct {
  id: string
  badge: string
  title: string
  description: string
  features: string[]
  minUsers: string
}

export const sapProducts: SapProduct[] = [
  {
    id: 'cloud-erp',
    badge: 'Cloud ERP',
    title: 'SAP Cloud ERP',
    description:
      'Modernizá tu gestión empresarial con GROW with SAP: un ERP en la nube con mejores prácticas de la industria, actualizaciones automáticas e innovación continua.',
    features: [
      'Actualizaciones automáticas y continuas',
      'Implementación ágil con best practices',
      'Costos predecibles por suscripción',
      'Acceso desde cualquier dispositivo'
    ],
    minUsers: 'Desde 15 usuarios'
  },
  {
    id: 'cloud-erp-private',
    badge: 'Cloud ERP Private',
    title: 'SAP Cloud ERP Private',
    description:
      'Transformá tus procesos SAP con RISE with SAP: un paquete integral diseñado para la transformación única de tu organización con personalización avanzada y control total.',
    features: [
      'Migración guiada a S/4HANA Cloud',
      'Personalización avanzada y seguridad',
      'Escalabilidad sin límites',
      'SLA empresarial garantizado'
    ],
    minUsers: 'Desde 60 usuarios'
  },
  {
    id: 'business-one',
    badge: 'Business One',
    title: 'SAP Business One',
    description:
      'Solución ERP integral para PYMEs que centraliza finanzas, ventas, compras, inventario y operaciones en una sola plataforma ágil y accesible.',
    features: [
      'Implementación rápida y sencilla',
      'Finanzas, ventas e inventario integrados',
      'Escalabilidad y flexibilidad',
      'Precio accesible para PYMEs'
    ],
    minUsers: 'Desde 5 usuarios'
  }
]

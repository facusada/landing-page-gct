export interface SapProductFeature {
  title: string
  description: string
  icon: string
}

export interface SapProduct {
  id: string
  badge: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  features: SapProductFeature[]
  useCases: string[]
  minUsers: string
  heroImage: string
  detailImage: string
}

export const sapProducts: SapProduct[] = [
  {
    id: 'cloud-erp',
    badge: 'Cloud ERP',
    title: 'SAP Cloud ERP',
    subtitle: 'GROW with SAP',
    description: 'Modernizá tu gestión empresarial con GROW with SAP: un ERP en la nube con mejores prácticas de la industria, actualizaciones automáticas e innovación continua.',
    longDescription:
      'SAP Cloud ERP con GROW with SAP es la solución ideal para empresas medianas que buscan crecer con un ERP moderno sin la complejidad de implementaciones on-premise. Adoptás las mejores prácticas de la industria desde el primer día, con un modelo de suscripción predecible y actualizaciones automáticas que mantienen tu plataforma siempre actualizada. Global Core Technologies acompaña cada etapa de la adopción — desde el diseño del proceso hasta la estabilización post-arranque — garantizando que tu equipo opere con confianza y tus datos sean confiables desde el día uno.',
    features: [
      {
        title: 'Finanzas y contabilidad',
        description: 'Cierre contable ágil, libro mayor, cuentas a pagar y cobrar integradas con la operación.',
        icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6'
      },
      {
        title: 'Gestión de aprovisionamiento',
        description: 'Ciclo completo de compras, órdenes de compra, recepción de mercadería y gestión de proveedores.',
        icon: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0'
      },
      {
        title: 'Ventas y gestión de pedidos',
        description: 'Presupuestos, pedidos, facturación y seguimiento de clientes en una sola plataforma.',
        icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'
      },
      {
        title: 'Control de inventario',
        description: 'Visibilidad en tiempo real de stock, movimientos y valorización de almacenes.',
        icon: 'M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16zM3.27 6.96L12 12.01l8.73-5.05M12 22.08V12'
      },
      {
        title: 'Analítica en tiempo real',
        description: 'Dashboards, reportes embebidos y KPIs operativos sin necesidad de herramientas externas.',
        icon: 'M18 20V10M12 20V4M6 20v-6'
      },
      {
        title: 'Actualizaciones automáticas',
        description: 'SAP gestiona la infraestructura y las actualizaciones, vos solo operás el negocio.',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      }
    ],
    useCases: [
      'Empresas que quieren reemplazar sistemas legacy sin inversión en infraestructura propia',
      'Organizaciones que buscan adoptar best practices SAP como estándar operativo de la industria',
      'Equipos de finanzas que necesitan cierre contable ágil y reportería integrada en tiempo real',
      'Empresas con operaciones regionales que requieren una plataforma centralizada y escalable'
    ],
    minUsers: 'Desde 15 usuarios',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'cloud-erp-private',
    badge: 'Cloud ERP Private',
    title: 'SAP Cloud ERP Private',
    subtitle: 'RISE with SAP',
    description: 'Transformá tus procesos SAP con RISE with SAP: un paquete integral diseñado para la transformación única de tu organización con personalización avanzada y control total.',
    longDescription:
      'SAP Cloud ERP Private con RISE with SAP es el paquete de transformación digital más completo de SAP, diseñado para organizaciones que necesitan migrar a S/4HANA Cloud manteniendo su nivel de personalización y cumplimiento. Incluye infraestructura cloud privada, herramientas de análisis de procesos (Business Process Intelligence), integración con SAP BTP y soporte de migración asistida. En Global Core Technologies acompañamos desde el assessment inicial hasta la hiperestabilización, con experiencia comprobada en entornos SAP de alta criticidad donde la continuidad operativa no admite interrupciones.',
    features: [
      {
        title: 'Migración asistida a S/4HANA',
        description: 'Roadmap de migración desde SAP ECC u otras versiones con metodología probada y herramientas SAP oficiales.',
        icon: 'M13 17l5-5-5-5M6 17l5-5-5-5'
      },
      {
        title: 'Personalización avanzada',
        description: 'Adaptación de procesos de negocio exclusivos que van más allá de las best practices estándar.',
        icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z'
      },
      {
        title: 'Entorno cloud privado',
        description: 'Infraestructura dedicada con SLA empresarial, aislamiento de datos y cumplimiento normativo.',
        icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z'
      },
      {
        title: 'Business Process Intelligence',
        description: 'Análisis y optimización de procesos existentes antes y durante la transformación con datos reales.',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      },
      {
        title: 'Integración SAP BTP',
        description: 'Extensiones, integraciones e innovación sobre la Business Technology Platform de SAP.',
        icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'
      },
      {
        title: 'Seguridad y compliance enterprise',
        description: 'Controles de acceso, auditoría, encriptación y cumplimiento de normativas locales e internacionales.',
        icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'
      }
    ],
    useCases: [
      'Migración desde SAP ECC 6.0 con procesos altamente customizados que deben preservarse',
      'Consolidación de múltiples instancias SAP en una única plataforma cloud con governance centralizado',
      'Transformación de procesos de alta criticidad con cero tolerancia a la interrupción operativa',
      'Adopción de capacidades de inteligencia artificial y machine learning sobre datos SAP existentes'
    ],
    minUsers: 'Desde 60 usuarios',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'business-one',
    badge: 'Business One',
    title: 'SAP Business One',
    subtitle: 'ERP para PYMEs',
    description: 'Solución ERP integral para PYMEs que centraliza finanzas, ventas, compras, inventario y operaciones en una sola plataforma ágil y accesible.',
    longDescription:
      'SAP Business One es la solución ERP de SAP diseñada específicamente para pequeñas y medianas empresas que necesitan visibilidad total de su operación en tiempo real. Centraliza finanzas, ventas, compras, inventario y producción en una única plataforma, eliminando los silos de información y los procesos manuales que frenan el crecimiento. Global Core Technologies implementa SAP Business One con un enfoque práctico orientado a la adopción real por parte de los equipos, asegurando que cada proceso quede configurado según la realidad operativa de tu empresa y que tu equipo esté capacitado para operar con autonomía.',
    features: [
      {
        title: 'Gestión financiera y contabilidad',
        description: 'Libro mayor, flujo de fondos, conciliaciones y reportes contables automáticos sin procesos manuales.',
        icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6'
      },
      {
        title: 'Ventas y gestión de clientes',
        description: 'Presupuestos, pedidos, facturación electrónica y seguimiento del pipeline comercial.',
        icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'
      },
      {
        title: 'Compras y proveedores',
        description: 'Solicitudes de compra, órdenes, recepción de mercadería y gestión de pagos a proveedores.',
        icon: 'M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2m4-2H8a1 1 0 00-1 1v2a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1zm-4 8H8m4 4H8m4-8H8'
      },
      {
        title: 'Inventario y almacenes',
        description: 'Control de stock en tiempo real, múltiples depósitos, trazabilidad por lote y número de serie.',
        icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
      },
      {
        title: 'Producción y planificación',
        description: 'Órdenes de producción, listas de materiales (BOM) y planificación de necesidades.',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      },
      {
        title: 'Reportería y analítica',
        description: 'Dashboard ejecutivo, informes predefinidos y Crystal Reports integrado para análisis profundo.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      }
    ],
    useCases: [
      'PYMEs que dan su primer paso hacia la gestión integrada y quieren un ERP confiable y respaldado por SAP',
      'Empresas de distribución y comercio que necesitan control de inventario y trazabilidad en tiempo real',
      'Organizaciones que superaron las capacidades de Excel y sistemas básicos de facturación',
      'Compañías con múltiples unidades de negocio o sucursales que requieren visibilidad financiera unificada'
    ],
    minUsers: 'Desde 5 usuarios',
    heroImage: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80'
  }
]

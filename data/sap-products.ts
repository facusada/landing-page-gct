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
    id: 's4hana',
    badge: 'S/4HANA',
    title: 'SAP S/4HANA',
    subtitle: 'ERP para grandes empresas',
    description: 'El ERP inteligente de SAP para grandes organizaciones: procesos end-to-end integrados, tiempo real sobre HANA y transformación digital a escala.',
    longDescription:
      'SAP S/4HANA es el ERP de nueva generación diseñado para grandes empresas que necesitan operar con visibilidad total, velocidad y capacidad de adaptación. Construido sobre la base de datos en memoria SAP HANA, elimina las capas de agregación y permite decisiones en tiempo real sobre toda la cadena de valor: finanzas, supply chain, manufactura, compras y ventas. Global Core Technologies acompaña proyectos S/4HANA con metodología probada en entornos de alta criticidad, desde el diseño de la arquitectura objetivo hasta la estabilización post-arranque, con foco en continuidad operativa y adopción real.',
    features: [
      {
        title: 'Finanzas en tiempo real',
        description: 'SAP Universal Journal unifica contabilidad financiera y de gestión en un único modelo de datos sin reconciliaciones.',
        icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6'
      },
      {
        title: 'Supply chain integrada',
        description: 'Planificación, aprovisionamiento, gestión de inventario y logística de distribución en una plataforma unificada.',
        icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l2-2h8zM8 11h7m0 0l-3-3m3 3l-3 3'
      },
      {
        title: 'Manufactura y producción',
        description: 'MRP, órdenes de producción, control de planta y gestión de calidad integrados con finanzas y logística.',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      },
      {
        title: 'Ventas y gestión de clientes',
        description: 'Order-to-cash completo con pricing avanzado, available-to-promise y facturación integrada.',
        icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75'
      },
      {
        title: 'Analítica embebida',
        description: 'SAP Fiori apps con analítica en tiempo real sobre datos operativos sin necesidad de sistemas BI separados.',
        icon: 'M18 20V10M12 20V4M6 20v-6'
      },
      {
        title: 'Extensibilidad Clean Core',
        description: 'Extensiones side-by-side vía SAP BTP que permiten adaptaciones sin comprometer las actualizaciones estándar.',
        icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
      }
    ],
    useCases: [
      'Grandes empresas que migran desde SAP ECC y necesitan un roadmap de transformación controlado',
      'Organizaciones con operaciones regionales o multi-país que requieren un landscape SAP unificado',
      'Empresas de industria, energía o retail que necesitan procesos end-to-end integrados en tiempo real',
      'Equipos de finanzas que requieren cierre contable acelerado y reportería de gestión unificada'
    ],
    minUsers: 'Grandes organizaciones',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'cloud-erp',
    badge: 'S/4HANA Public Cloud',
    title: 'SAP S/4HANA Public Cloud',
    subtitle: 'GROW with SAP',
    description: 'Modernizá tu gestión empresarial con GROW with SAP: un ERP en la nube con mejores prácticas de la industria, actualizaciones automáticas e innovación continua.',
    longDescription:
      'SAP S/4HANA Public Cloud con GROW with SAP es la solución ideal para empresas medianas que buscan crecer con un ERP moderno sin la complejidad de implementaciones on-premise. Adoptás las mejores prácticas de la industria desde el primer día, con un modelo de suscripción predecible y actualizaciones automáticas que mantienen tu plataforma siempre actualizada. Global Core Technologies acompaña cada etapa de la adopción — desde el diseño del proceso hasta la estabilización post-arranque — garantizando que tu equipo opere con confianza y tus datos sean confiables desde el día uno.',
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
    id: 'btp',
    badge: 'BTP',
    title: 'SAP Business Technology Platform',
    subtitle: 'Plataforma e innovación',
    description: 'La plataforma tecnológica de SAP para desarrollar aplicaciones, automatizar procesos, integrar sistemas y aplicar inteligencia artificial sobre el ecosistema SAP.',
    longDescription:
      'SAP Business Technology Platform (BTP) es el hub de innovación que extiende y conecta el ecosistema SAP. Permite desarrollar aplicaciones low-code y pro-code, automatizar flujos de trabajo, integrar sistemas heterogéneos y aplicar capacidades de IA y machine learning sobre datos SAP en tiempo real. En Global Core Technologies usamos BTP para construir extensiones Clean Core que agregan valor sin comprometer las actualizaciones estándar, e integramos BTP en estrategias de transformación digital donde la plataforma opera como el tejido tecnológico que une ERP, datos y procesos de negocio.',
    features: [
      {
        title: 'Desarrollo de aplicaciones',
        description: 'SAP Build Apps y SAP AppGyver para aplicaciones low-code, más CAP framework para desarrollo pro-code sobre Node.js y Java.',
        icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
      },
      {
        title: 'Automatización de procesos',
        description: 'SAP Build Process Automation para workflows, RPA y formularios digitales sin necesidad de codificación compleja.',
        icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
      },
      {
        title: 'Inteligencia artificial',
        description: 'SAP AI Core y AI Launchpad para desplegar modelos de ML, Joule como copiloto de IA generativa sobre datos SAP.',
        icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
      },
      {
        title: 'Gestión de datos',
        description: 'SAP Datasphere para federación, virtualización y gobierno de datos empresariales con visibilidad semántica.',
        icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4'
      },
      {
        title: 'Integración nativa',
        description: 'SAP Integration Suite embebida para conectar sistemas SAP y no SAP con APIs, iFlows y eventos.',
        icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        title: 'Extensibilidad Clean Core',
        description: 'Extensiones side-by-side que enriquecen S/4HANA sin tocar el core, garantizando compatibilidad con upgrades futuros.',
        icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
      }
    ],
    useCases: [
      'Organizaciones que necesitan extender S/4HANA con lógica de negocio propia sin modificar el core SAP',
      'Empresas que quieren automatizar procesos transversales conectando SAP con sistemas de terceros',
      'Equipos que buscan incorporar IA generativa y analítica avanzada sobre datos SAP en tiempo real',
      'Proyectos de integración donde SAP debe conectarse con plataformas cloud, ERPs externos o marketplaces'
    ],
    minUsers: 'Por proyecto',
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'integration-suite',
    badge: 'Integration Suite',
    title: 'SAP Integration Suite',
    subtitle: 'Integración SAP y no SAP',
    description: 'Conectá tu landscape SAP con cualquier sistema externo mediante APIs, iFlows, eventos y automatizaciones — sin fricciones entre SAP y el resto del negocio.',
    longDescription:
      'SAP Integration Suite es la plataforma de integración empresarial de SAP que conecta aplicaciones cloud y on-premise, sistemas SAP y no SAP, con un enfoque unificado de APIs, mensajería, eventos y automatización. Incluye Cloud Integration para iFlows, API Management para ciclo de vida completo de APIs, Event Mesh para arquitecturas orientadas a eventos, e Integration Advisor para mappings estandarizados. Global Core Technologies diseña e implementa arquitecturas de integración que reducen la deuda técnica, estandarizan los flujos de datos y habilitan ecosistemas digitales donde SAP opera como el núcleo de una red conectada de sistemas.',
    features: [
      {
        title: 'Cloud Integration (iFlows)',
        description: 'Diseño y operación de flujos de integración entre SAP y sistemas externos con monitoreo en tiempo real.',
        icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
      },
      {
        title: 'API Management',
        description: 'Publicación, gobierno, seguridad y analítica del ciclo de vida completo de APIs empresariales.',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z'
      },
      {
        title: 'Event Mesh',
        description: 'Arquitecturas orientadas a eventos para desacoplar sistemas y habilitar flujos asincrónicos escalables.',
        icon: 'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18'
      },
      {
        title: 'Open Connectors',
        description: 'Conectores predefinidos para más de 170 aplicaciones de terceros: Salesforce, ServiceNow, Workday y más.',
        icon: 'M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
      },
      {
        title: 'Integration Advisor',
        description: 'Generación asistida por IA de mappings y documentación para estándares B2B como EDI, ANSI X12 e IDOC.',
        icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
      },
      {
        title: 'Monitoreo y operación',
        description: 'Dashboard centralizado de mensajes, alertas y trazabilidad end-to-end de todos los flujos de integración.',
        icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
      }
    ],
    useCases: [
      'Empresas con landscapes híbridos que necesitan conectar SAP on-premise con aplicaciones cloud de terceros',
      'Organizaciones que buscan reemplazar integraciones punto a punto por una plataforma centralizada y auditable',
      'Proyectos de migración a S/4HANA donde los flujos de integración deben rediseñarse o modernizarse',
      'Negocios con intercambio B2B que requieren conectividad EDI estándar y rastreable con socios comerciales'
    ],
    minUsers: 'Por proyecto',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'
  }
]

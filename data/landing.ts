import type { ClientLogo, DifferentiatorItem, HeroContent, HeroSlide, IndustryItem, ServiceItem, ServiceModule, TechnologyPillar } from '~/types/landing'

export const hero: HeroContent = {
  eyebrow: 'SAP Silver Partner',
  title: 'Consultoría SAP, seguridad y evolución digital',
  description:
    'Acompañamos a empresas medianas y grandes a modernizar, asegurar y operar sus plataformas SAP con criterio estratégico, foco en riesgo y ejecución medible.',
  primaryCta: 'Hablemos de tu entorno SAP',
  secondaryCta: 'Ver servicios'
}

export const heroSlides: HeroSlide[] = [
  {
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80',
    alt: 'Placa electrónica y componentes de infraestructura tecnológica empresarial',
    label: 'Arquitectura tecnológica empresarial'
  },
  {
    src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80',
    alt: 'Datacenter con servidores y equipamiento de infraestructura cloud',
    label: 'Infraestructura cloud y continuidad operativa'
  },
  {
    src: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=2400&q=80',
    alt: 'Inteligencia artificial y automatización aplicada a procesos empresariales',
    label: 'Inteligencia artificial y automatización empresarial'
  },
  {
    src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2400&q=80',
    alt: 'Monitoreo de datos y analítica en pantallas de operaciones',
    label: 'Analítica, monitoreo y mejora continua'
  }
]

export const services: ServiceItem[] = [
  {
    title: 'Migración y transformación SAP',
    slug: 'migracion-transformacion-sap',
    icon: 'migration',
    description: 'Roadmaps S/4HANA, evolución hacia cloud y modernización de procesos críticos.',
    longDescription: 'Diseñamos y ejecutamos estrategias de migración hacia SAP S/4HANA con foco en reducción de riesgo, continuidad operativa y adopción real. Cada roadmap contempla arquitectura objetivo, gobierno de cambio, dependencias técnicas y métricas de avance para que la transformación sea medible desde el primer sprint.',
    features: [
      'Assessment técnico y funcional del landscape actual',
      'Roadmap de migración S/4HANA con fases y milestones',
      'Estrategia de conversión Brownfield, Greenfield o híbrida',
      'Gobierno de cambio y plan de adopción operativa',
      'Migración de datos con validación y reconciliación',
      'Soporte post-migración y estabilización'
    ],
    benefits: [
      'Menor riesgo en decisiones de migración',
      'Continuidad operativa durante la transición',
      'Roadmap claro con visibilidad de costos y plazos',
      'Adopción real del nuevo entorno por los usuarios'
    ],
    proof: 'Menos riesgo en decisiones de migración'
  },
  {
    title: 'Implementación SAP',
    slug: 'implementacion-sap',
    icon: 'implementation',
    description: 'Implementaciones y rollouts con foco Clean Core, adopción operativa y trazabilidad.',
    longDescription: 'Implementamos soluciones SAP con metodología probada, priorizando Clean Core para minimizar customizaciones innecesarias. Cada proyecto se ejecuta con trazabilidad completa, gobierno de alcance y un plan de adopción que asegura que el sistema se use como fue diseñado.',
    features: [
      'Implementaciones SAP con metodología Activate',
      'Enfoque Clean Core para minimizar customizaciones',
      'Rollouts regionales y multi-país',
      'Gestión de alcance y gobierno de proyecto',
      'Plan de testing integral (unitario, integración, UAT)',
      'Capacitación y change management'
    ],
    benefits: [
      'Ejecución ordenada para escala regional',
      'Menor costo de mantenimiento por Clean Core',
      'Usuarios capacitados y adoptando el sistema',
      'Trazabilidad completa del proyecto'
    ],
    proof: 'Ejecución ordenada para escala regional'
  },
  {
    title: 'Seguridad SAP & GRC',
    slug: 'seguridad-sap-grc',
    icon: 'security',
    description: 'Gobierno de accesos, RBAC, SoD, compliance continuo y reducción de exposición.',
    longDescription: 'Protegemos entornos SAP con un enfoque integral que abarca gobierno de accesos, segregación de funciones, compliance continuo y reducción de superficie de ataque. Implementamos controles que pasan auditorías y reducen riesgo operativo sin frenar la operación del negocio.',
    features: [
      'Diseño de modelo de roles (RBAC) alineado al negocio',
      'Análisis y remediación de conflictos SoD',
      'Implementación SAP GRC Access Control',
      'Monitoreo continuo de accesos críticos',
      'Hardening de plataforma SAP (Basis security)',
      'Preparación para auditorías SOX, GDPR, regulatorias'
    ],
    benefits: [
      'Controles claros para auditoría',
      'Reducción de riesgo de fraude interno',
      'Compliance continuo sin intervención manual',
      'Accesos alineados a responsabilidades reales'
    ],
    proof: 'Controles claros para auditoría'
  },
  {
    title: 'Operación y soporte AMS',
    slug: 'operacion-soporte-ams',
    icon: 'support',
    description: 'SAP Basis, soporte funcional y mejora continua para plataformas estables.',
    longDescription: 'Operamos y mantenemos plataformas SAP con equipos dedicados que combinan soporte Basis, soporte funcional y mejora continua. Nuestro modelo AMS asegura estabilidad, tiempos de respuesta comprometidos y evolución controlada del entorno.',
    features: [
      'Soporte SAP Basis L1, L2 y L3',
      'Soporte funcional por módulo (FI, CO, MM, SD, PP, HCM)',
      'Gestión de incidentes, problemas y cambios (ITIL)',
      'Monitoreo proactivo de performance y disponibilidad',
      'Aplicación de notas SAP y patches de seguridad',
      'Mejora continua con backlog priorizado'
    ],
    benefits: [
      'Continuidad operativa y respuesta experta',
      'SLAs comprometidos y medibles',
      'Evolución controlada sin disrupciones',
      'Equipo especializado sin costo de contratación directa'
    ],
    proof: 'Continuidad operativa y respuesta experta'
  },
  {
    title: 'Innovación SAP',
    slug: 'innovacion-sap',
    icon: 'innovation',
    description: 'Datos, analítica, automatización e inteligencia artificial aplicada al ecosistema SAP.',
    longDescription: 'Llevamos capacidades de analítica avanzada, automatización e inteligencia artificial al ecosistema SAP. Desde dashboards ejecutivos hasta modelos predictivos, transformamos datos operativos en decisiones más rápidas y precisas.',
    features: [
      'Dashboards ejecutivos con SAP Analytics Cloud',
      'Integración de datos con SAP BTP y herramientas BI',
      'Automatización de procesos con RPA e inteligencia artificial',
      'Modelos predictivos sobre datos transaccionales SAP',
      'Estrategia de datos y governance',
      'Pruebas de concepto (PoC) de bajo riesgo'
    ],
    benefits: [
      'Valor nuevo sobre procesos existentes',
      'Decisiones basadas en datos, no en intuición',
      'Automatización de tareas repetitivas',
      'Time-to-insight reducido'
    ],
    proof: 'Valor nuevo sobre procesos existentes'
  },
  {
    title: 'SAP Techs Managed Services',
    slug: 'sap-techs-managed-services',
    icon: 'managed',
    description: 'Soporte técnico Basis para mantener la capa core SAP actualizada, estable y alineada con la operación del negocio.',
    longDescription: 'Gestionamos la capa técnica de SAP de forma integral: administración Basis, monitoreo, actualizaciones, upgrades y resolución de incidentes técnicos. Nuestro servicio gestionado permite que tu equipo se concentre en el negocio mientras nosotros mantenemos la plataforma estable y actualizada.',
    features: [
      'Administración SAP Basis dedicada',
      'Monitoreo 24x7 de sistemas SAP',
      'Gestión de upgrades y actualizaciones técnicas',
      'Administración de transportes y landscape',
      'Gestión de conexiones RFC e integraciones',
      'Documentación técnica y procedimientos operativos'
    ],
    benefits: [
      'Mayor disponibilidad y control de plataforma',
      'Reducción de incidentes técnicos recurrentes',
      'Plataforma siempre actualizada y segura',
      'Liberación de recursos internos para el negocio'
    ],
    proof: 'Mayor disponibilidad y control de plataforma'
  },
  {
    title: 'SAP Performance Services',
    slug: 'sap-performance-services',
    icon: 'performance',
    description: 'Análisis técnico y ajuste de parámetros para optimizar rendimiento, eficiencia y tiempos de respuesta de entornos SAP.',
    longDescription: 'Diagnosticamos y optimizamos el rendimiento de entornos SAP con un enfoque técnico profundo. Desde análisis de queries ABAP hasta tuning de base de datos y dimensionamiento de infraestructura, cada ajuste se mide y documenta para garantizar resultados sostenibles.',
    features: [
      'Análisis de performance end-to-end',
      'Tuning de queries ABAP y programas custom',
      'Optimización de base de datos HANA/Oracle/SQL Server',
      'Dimensionamiento y sizing de infraestructura',
      'Análisis de carga y pruebas de stress',
      'Recomendaciones de arquitectura para escalabilidad'
    ],
    benefits: [
      'Mejor performance sobre cargas críticas',
      'Reducción de tiempos de procesamiento batch',
      'Usuarios más productivos con respuestas más rápidas',
      'Infraestructura dimensionada correctamente'
    ],
    proof: 'Mejor performance sobre cargas críticas'
  },
  {
    title: 'Servicios para SAP Solution Manager',
    slug: 'servicios-sap-solution-manager',
    icon: 'solman',
    description: 'Consultoría técnica para configurar, optimizar y sostener Solution Manager como base de upgrades, monitoreo y mejoras.',
    longDescription: 'Configuramos y optimizamos SAP Solution Manager como el centro nervioso de tu landscape SAP. Desde la gestión de proyectos de implementación hasta el monitoreo técnico y la documentación de procesos, SolMan se convierte en la herramienta que gobierna tu operación SAP.',
    features: [
      'Implementación y configuración de SAP Solution Manager',
      'Setup de Change Request Management (ChaRM)',
      'Configuración de Test Suite y gestión de testing',
      'Monitoreo técnico (System Monitoring, EWA)',
      'Business Process Monitoring y documentación',
      'Upgrade y migración de Solution Manager'
    ],
    benefits: [
      'Gobierno técnico continuo de la operación SAP',
      'Gestión de cambios controlada y auditable',
      'Monitoreo centralizado del landscape',
      'Documentación de procesos siempre actualizada'
    ],
    proof: 'Gobierno técnico continuo de la operación SAP'
  }
]

export const differentiators: DifferentiatorItem[] = [
  { value: '+20', numericValue: 20, prefix: '+', label: 'años de experiencia', detail: 'Trayectoria en entornos SAP de alta criticidad.' },
  { value: '+150', numericValue: 150, prefix: '+', label: 'proyectos finalizados', detail: 'Implementaciones, migraciones, seguridad y soporte.' },
  { value: '+50', numericValue: 50, prefix: '+', label: 'profesionales', detail: 'Equipos especializados por dominio funcional y técnico.' },
  { value: '+200M', numericValue: 200, prefix: '+', suffix: 'M', label: 'horas de servicio', detail: 'Operación continua para clientes regionales.' }
]

export const industries: IndustryItem[] = [
  { name: 'Energía', icon: 'bolt', description: 'Operación, compliance y continuidad para negocios intensivos en activos.' },
  { name: 'Industria y manufactura', icon: 'factory', description: 'Procesos integrados, trazabilidad y eficiencia operativa.' },
  { name: 'Retail y marketplaces', icon: 'cart', description: 'Escalabilidad, seguridad y evolución de plataformas transaccionales.' },
  { name: 'Servicios regulados', icon: 'shield', description: 'Gobierno, auditoría y controles para operaciones sensibles.' }
]

export const technologyPillars: TechnologyPillar[] = [
  {
    title: 'SAP S/4HANA',
    description: 'Planificación de migración, arquitectura objetivo, gobierno de cambio y adopción.',
    tags: ['S/4HANA', 'Clean Core', 'Roadmap'],
    accent: 'core-blue'
  },
  {
    title: 'Security & GRC',
    description: 'Modelo de roles, segregación de funciones, compliance y monitoreo continuo.',
    tags: ['RBAC', 'SoD', 'GRC'],
    accent: 'core-orange'
  },
  {
    title: 'Cloud, data & AI',
    description: 'Automatización, analítica y modernización cloud con foco en resultados operativos.',
    tags: ['Cloud', 'Analytics', 'AI'],
    accent: 'core-cyan'
  }
]

export const clientLogos: ClientLogo[] = [
  {
    name: 'Tecnoperfiles Sustentable',
    src: '/clients/tecnoperfiles.png',
    width: 458,
    height: 110
  },
  {
    name: 'Tenaris'
  },
  {
    name: 'Haleon'
  },
  {
    name: 'Mercado Libre',
    src: '/clients/mercado-libre.png',
    width: 3500,
    height: 860
  },
  {
    name: 'Pan American Energy',
    src: '/clients/pan-american-energy.png',
    width: 324,
    height: 130
  },
  {
    name: 'COFCO',
    src: '/clients/cofco.png',
    width: 280,
    height: 92
  },
  {
    name: 'Molinos',
    src: '/clients/molinos.png',
    width: 628,
    height: 393
  },
  {
    name: 'Travel Rock',
    src: '/clients/travel-rock.png',
    width: 204,
    height: 192
  },
  {
    name: 'Exolgan Container Terminal',
    src: '/clients/exolgan.png',
    width: 177,
    height: 145
  },
  {
    name: 'Aeropuertos Argentina',
    src: '/clients/aeropuertos-argentina.png',
    width: 428,
    height: 100
  },
  {
    name: 'Hospital Universitario Austral',
    src: '/clients/hospital-universitario-austral.png',
    width: 1242,
    height: 381
  }
]

export const serviceModules: ServiceModule[] = [
  {
    title: 'Transformación SAP',
    slug: 'migracion-transformacion-sap',
    icon: 'migration',
    image: '/services/01_transformacion_sap.png',
    description: 'Acompañamos la migración hacia S/4HANA y el cloud con metodología, gobierno y foco en continuidad operativa en cada etapa.',
    benefit: 'Roadmap claro y riesgo controlado en cada fase de la transformación',
    capabilities: [
      'Migración SAP ECC → S/4HANA',
      'RISE with SAP',
      'SAP S/4HANA Public Cloud',
      'SAP Cloud ERP Private',
      'Assessment y Roadmap',
      'Clean Core Strategy',
      'Conversiones y Rollouts'
    ]
  },
  {
    title: 'Implementación SAP',
    slug: 'implementacion-sap',
    icon: 'implementation',
    image: '/services/02_implementacion_sap.png',
    description: 'Implementamos soluciones SAP con enfoque Clean Core, adopción real y trazabilidad de extremo a extremo en proyectos de cualquier escala.',
    benefit: 'Sistema en producción adoptado por los usuarios desde el día uno',
    capabilities: [
      'SAP S/4HANA',
      'SAP Business One',
      'SAP SuccessFactors',
      'SAP Analytics Cloud',
      'SAP Ariba',
      'SAP IBP',
      'SAP EWM',
      'SAP Commerce Cloud',
      'SAP BTP'
    ]
  },
  {
    title: 'Seguridad y Compliance SAP',
    slug: 'seguridad-sap-grc',
    icon: 'security',
    image: '/services/03_seguridad_compliance_sap.png',
    description: 'Gobierno de accesos, segregación de funciones y compliance continuo para entornos SAP auditables y alineados a regulaciones.',
    benefit: 'Controles que pasan auditorías y reducen el riesgo de fraude interno',
    capabilities: [
      'SAP GRC',
      'Segregación de Funciones (SoD)',
      'Gestión de accesos',
      'Auditoría SAP',
      'Compliance regulatorio',
      'Seguridad SAP BTP'
    ]
  },
  {
    title: 'Operación y Soporte SAP',
    slug: 'operacion-soporte-ams',
    icon: 'support',
    image: '/services/04_operacion_soporte_sap.png',
    description: 'Soporte funcional y técnico con SLAs comprometidos para mantener la plataforma SAP estable, evolucionando y alineada al negocio.',
    benefit: 'Continuidad operativa con equipo experto sin costo de contratación directa',
    capabilities: [
      'SAP AMS',
      'SAP Basis',
      'Gestión de incidentes',
      'Gestión de cambios',
      'Monitoreo operativo',
      'Gestión de transportes',
      'Certificados',
      'Soporte funcional y técnico'
    ]
  },
  {
    title: 'Innovación SAP',
    slug: 'innovacion-sap',
    icon: 'innovation',
    image: '/services/05_innovacion_sap.png',
    description: 'Llevamos inteligencia artificial, automatización y analítica avanzada al ecosistema SAP con resultados medibles sobre datos reales.',
    benefit: 'Valor nuevo sobre procesos existentes con tiempo de adopción reducido',
    capabilities: [
      'SAP BTP',
      'SAP Build',
      'SAP Integration Suite',
      'SAP Joule',
      'Inteligencia Artificial',
      'Automatización',
      'APIs',
      'Analítica avanzada'
    ]
  },
  {
    title: 'SAP Managed Services',
    slug: 'sap-techs-managed-services',
    icon: 'managed',
    image: '/services/06_sap_managed_services.png',
    description: 'Gestión integral de la capa técnica SAP — Basis, HANA, monitoreo 24x7 y evolución controlada de la plataforma sin interrupciones.',
    benefit: 'Mayor disponibilidad con plataforma siempre actualizada y segura',
    capabilities: [
      'Administración SAP Basis',
      'Administración SAP HANA',
      'SAP Cloud ALM',
      'SAP Solution Manager',
      'Actualizaciones',
      'Performance Tuning',
      'Capacity Planning',
      'Monitoreo 24x7'
    ]
  },
  {
    title: 'Performance & Optimization',
    slug: 'sap-performance-services',
    icon: 'performance',
    image: '/services/07_performance_optimization.png',
    description: 'Diagnóstico y optimización técnica de entornos SAP para mejorar rendimiento, tiempos de respuesta y eficiencia de la plataforma.',
    benefit: 'Usuarios más productivos y operaciones batch sin cuellos de botella',
    capabilities: [
      'Performance SAP',
      'Optimización HANA',
      'Ajuste de parámetros',
      'ST03N',
      'STAD',
      'ST22',
      'Jobs Batch',
      'Capacity Management'
    ]
  }
]

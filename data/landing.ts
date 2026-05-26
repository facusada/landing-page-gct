import type { ClientLogo, DifferentiatorItem, HeroContent, HeroSlide, IndustryItem, ServiceItem, TechnologyPillar } from '~/types/landing'

export const hero: HeroContent = {
  eyebrow: 'Consultoría SAP, seguridad y evolución digital',
  title: 'Global Core Technologies',
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
    src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2400&q=80',
    alt: 'Equipo profesional en reunión de trabajo y planificación de proyectos',
    label: 'Equipos especializados y gobierno de proyectos'
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
    description: 'Roadmaps S/4HANA, evolución hacia cloud y modernización de procesos críticos.',
    proof: 'Menos riesgo en decisiones de migración'
  },
  {
    title: 'Implementación SAP',
    description: 'Implementaciones y rollouts con foco Clean Core, adopción operativa y trazabilidad.',
    proof: 'Ejecución ordenada para escala regional'
  },
  {
    title: 'Seguridad SAP & GRC',
    description: 'Gobierno de accesos, RBAC, SoD, compliance continuo y reducción de exposición.',
    proof: 'Controles claros para auditoría'
  },
  {
    title: 'Operación y soporte AMS',
    description: 'SAP Basis, soporte funcional y mejora continua para plataformas estables.',
    proof: 'Continuidad operativa y respuesta experta'
  },
  {
    title: 'Innovación SAP',
    description: 'Datos, analítica, automatización e inteligencia artificial aplicada al ecosistema SAP.',
    proof: 'Valor nuevo sobre procesos existentes'
  },
  {
    title: 'SAP Techs Managed Services',
    description: 'Soporte técnico Basis para mantener la capa core SAP actualizada, estable y alineada con la operación del negocio.',
    proof: 'Mayor disponibilidad y control de plataforma'
  },
  {
    title: 'SAP Performance Services',
    description: 'Análisis técnico y ajuste de parámetros para optimizar rendimiento, eficiencia y tiempos de respuesta de entornos SAP.',
    proof: 'Mejor performance sobre cargas críticas'
  },
  {
    title: 'Servicios para SAP Solution Manager',
    description: 'Consultoría técnica para configurar, optimizar y sostener Solution Manager como base de upgrades, monitoreo y mejoras.',
    proof: 'Gobierno técnico continuo de la operación SAP'
  }
]

export const differentiators: DifferentiatorItem[] = [
  { value: '+20', label: 'años de experiencia', detail: 'Trayectoria en entornos SAP de alta criticidad.' },
  { value: '+150', label: 'proyectos finalizados', detail: 'Implementaciones, migraciones, seguridad y soporte.' },
  { value: '+50', label: 'profesionales', detail: 'Equipos especializados por dominio funcional y técnico.' },
  { value: '+200M', label: 'horas de servicio', detail: 'Operación continua para clientes regionales.' }
]

export const industries: IndustryItem[] = [
  { name: 'Energía', description: 'Operación, compliance y continuidad para negocios intensivos en activos.' },
  { name: 'Industria y manufactura', description: 'Procesos integrados, trazabilidad y eficiencia operativa.' },
  { name: 'Retail y marketplaces', description: 'Escalabilidad, seguridad y evolución de plataformas transaccionales.' },
  { name: 'Servicios regulados', description: 'Gobierno, auditoría y controles para operaciones sensibles.' }
]

export const technologyPillars: TechnologyPillar[] = [
  {
    title: 'SAP S/4HANA',
    description: 'Planificación de migración, arquitectura objetivo, gobierno de cambio y adopción.',
    tags: ['S/4HANA', 'Clean Core', 'Roadmap']
  },
  {
    title: 'Security & GRC',
    description: 'Modelo de roles, segregación de funciones, compliance y monitoreo continuo.',
    tags: ['RBAC', 'SoD', 'GRC']
  },
  {
    title: 'Cloud, data & AI',
    description: 'Automatización, analítica y modernización cloud con foco en resultados operativos.',
    tags: ['Cloud', 'Analytics', 'AI']
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

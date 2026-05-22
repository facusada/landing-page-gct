import type { ClientLogo, DifferentiatorItem, IndustryItem, ServiceItem, TechnologyPillar } from '~/types/landing'

export const hero = {
  eyebrow: 'Consultoria SAP, seguridad y evolucion digital',
  title: 'Global Core Technologies',
  description:
    'Acompanamos a empresas medianas y grandes a modernizar, asegurar y operar sus plataformas SAP con criterio estrategico, foco en riesgo y ejecucion medible.',
  primaryCta: 'Hablemos de tu entorno SAP',
  secondaryCta: 'Ver servicios'
}

export const services: ServiceItem[] = [
  {
    title: 'Migracion y transformacion SAP',
    description: 'Roadmaps S/4HANA, evolucion hacia cloud y modernizacion de procesos criticos.',
    proof: 'Menos riesgo en decisiones de migracion'
  },
  {
    title: 'Implementacion SAP',
    description: 'Implementaciones y rollouts con foco Clean Core, adopcion operativa y trazabilidad.',
    proof: 'Ejecucion ordenada para escala regional'
  },
  {
    title: 'Seguridad SAP & GRC',
    description: 'Gobierno de accesos, RBAC, SoD, compliance continuo y reduccion de exposicion.',
    proof: 'Controles claros para auditoria'
  },
  {
    title: 'Operacion y soporte AMS',
    description: 'SAP Basis, soporte funcional y mejora continua para plataformas estables.',
    proof: 'Continuidad operativa y respuesta experta'
  },
  {
    title: 'Innovacion SAP',
    description: 'Datos, analitica, automatizacion e inteligencia artificial aplicada al ecosistema SAP.',
    proof: 'Valor nuevo sobre procesos existentes'
  }
]

export const differentiators: DifferentiatorItem[] = [
  { value: '+20', label: 'anos de experiencia', detail: 'Trayectoria en entornos SAP de alta criticidad.' },
  { value: '+150', label: 'proyectos finalizados', detail: 'Implementaciones, migraciones, seguridad y soporte.' },
  { value: '+50', label: 'profesionales', detail: 'Equipos especializados por dominio funcional y tecnico.' },
  { value: '+200M', label: 'horas de servicio', detail: 'Operacion continua para clientes regionales.' }
]

export const industries: IndustryItem[] = [
  { name: 'Energia', description: 'Operacion, compliance y continuidad para negocios intensivos en activos.' },
  { name: 'Industria y manufactura', description: 'Procesos integrados, trazabilidad y eficiencia operativa.' },
  { name: 'Retail y marketplaces', description: 'Escalabilidad, seguridad y evolucion de plataformas transaccionales.' },
  { name: 'Servicios regulados', description: 'Gobierno, auditoria y controles para operaciones sensibles.' }
]

export const technologyPillars: TechnologyPillar[] = [
  {
    title: 'SAP S/4HANA',
    description: 'Planificacion de migracion, arquitectura objetivo, gobierno de cambio y adopcion.',
    tags: ['S/4HANA', 'Clean Core', 'Roadmap']
  },
  {
    title: 'Security & GRC',
    description: 'Modelo de roles, segregacion de funciones, compliance y monitoreo continuo.',
    tags: ['RBAC', 'SoD', 'GRC']
  },
  {
    title: 'Cloud, data & AI',
    description: 'Automatizacion, analitica y modernizacion cloud con foco en resultados operativos.',
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

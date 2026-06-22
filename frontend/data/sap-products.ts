export interface SapProduct {
  id: string
  featureCount: number
  heroImage: string
  detailImage: string
}

export const sapProducts: SapProduct[] = [
  {
    id: 's4hana',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'cloud-erp',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'cloud-erp-private',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'btp',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=2000&q=80',
    detailImage: '/sap-btp.webp'
  },
  {
    id: 'integration-suite',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80',
    detailImage: '/sap-integration-suite-graphic.svg'
  },
  {
    id: 'sac',
    featureCount: 6,
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80',
    detailImage: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=900&q=80'
  }
]

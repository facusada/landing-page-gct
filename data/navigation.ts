import type { NavigationItem } from '~/types/landing'

export const navigationItems: NavigationItem[] = [
  { key: 'about', to: '/#nosotros' },
  {
    key: 'pillars',
    children: [
      { key: 'transform', to: '/pilares/transform', index: '01' },
      { key: 'secure', to: '/pilares/secure', index: '02' },
      { key: 'operate', to: '/pilares/operate', index: '03' },
      { key: 'govern', to: '/pilares/govern', index: '04' },
      { key: 'innovate', to: '/pilares/innovate', index: '05' }
    ]
  },
  { key: 'services', to: '/servicios' },
  { key: 'platforms', to: '/#plataformas' },
  { key: 'contact', to: '/contacto' }
]

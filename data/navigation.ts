import type { NavigationItem } from '~/types/landing'

export const navigationItems: NavigationItem[] = [
  { key: 'about', to: '/#nosotros' },
  {
    key: 'pillars',
    children: [
      { key: 'transform', to: '/pilares/transform', index: '01', labelKey: 'pillars.items.transform.title' },
      { key: 'secure', to: '/pilares/secure', index: '02', labelKey: 'pillars.items.secure.title' },
      { key: 'operate', to: '/pilares/operate', index: '03', labelKey: 'pillars.items.operate.title' },
      { key: 'govern', to: '/pilares/govern', index: '04', labelKey: 'pillars.items.govern.title' },
      { key: 'innovate', to: '/pilares/innovate', index: '05', labelKey: 'pillars.items.innovate.title' }
    ]
  },
  { key: 'solutions', to: '/soluciones' },
  {
    key: 'platforms',
    children: [
      { key: 'intelliguard', to: '/plataformas/intelliguard', labelKey: 'platforms.items.intelliguard.name' },
      { key: 'opsIntelligence', to: '/plataformas/operations-intelligence', labelKey: 'platforms.items.opsIntelligence.name' }
    ]
  },
  { key: 'contact', to: '/contacto' }
]

import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './data/**/*.ts'
  ],
  theme: {
    extend: {
      colors: {
        core: {
          ink: '#07111F',
          midnight: '#0B1D33',
          navy: '#123B66',
          blue: '#606AF4',
          cyan: '#2FB8D4',
          orange: '#F17D30',
          graphite: '#1E1E1E',
          mist: '#F5F7FA',
          line: '#D7DCE3'
        }
      },
      fontFamily: {
        display: ['Manrope', 'Aptos', 'Segoe UI', 'sans-serif'],
        body: ['Source Sans 3', 'Aptos', 'Segoe UI', 'sans-serif']
      },
      boxShadow: {
        premium: '0 18px 60px rgba(7, 17, 31, 0.14)',
        lift: '0 12px 32px rgba(7, 17, 31, 0.12)'
      },
      backgroundImage: {
        'core-grid': 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(circle at 72% 28%, rgba(96,106,244,.34), transparent 34%), radial-gradient(circle at 18% 82%, rgba(47,184,212,.18), transparent 30%)'
      }
    }
  },
  plugins: []
} satisfies Config

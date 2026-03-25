import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          black:  '#120903',
          deep:   '#0A0502',
          mid:    '#1A0D06',
        },
        graphite: {
          dark:   '#1E1E1E',
          DEFAULT:'#2C2C2C',
          light:  '#3A3A3A',
        },
        orange: {
          burnt:  '#C2410C',
          light:  '#EA580C',
          muted:  '#9A3412',
        },
        sand: {
          dark:   '#A0845A',
          DEFAULT:'#C9A87C',
          light:  '#E8D5B7',
        },
        ivory: {
          dim:    '#EDE3D0',
          DEFAULT:'#FAF3E0',
          warm:   '#FFF8EE',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
        mono:    ['Space Mono', 'monospace'],
      },
      fontSize: {
        'h1':   ['60px', { lineHeight: '1.08', fontWeight: '700' }],
        'h2':   ['42px', { lineHeight: '1.2',  fontWeight: '600' }],
        'h3':   ['26px', { lineHeight: '1.3',  fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.75' }],
        'body':    ['16px', { lineHeight: '1.65' }],
        'caption': ['13px', { lineHeight: '1.5' }],
        'stat':    ['52px', { lineHeight: '1',   fontWeight: '700' }],
      },
      borderRadius: {
        'card': '20px',
        'chip': '9999px',
        'modal':'24px',
      },
      boxShadow: {
        'card':    '0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 24px 56px rgba(194,65,12,0.2)',
        'orange-glow': '0 0 32px rgba(194,65,12,0.5)',
        'phone':   '-20px 40px 80px rgba(0,0,0,0.7), 0 0 60px rgba(194,65,12,0.15)',
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(135deg, #120903 0%, #1A0D06 60%, #2C2C2C 100%)',
        'cta-gradient':
          'linear-gradient(120deg, #C2410C 0%, #EA580C 100%)',
        'orange-gradient':
          'linear-gradient(135deg, #C2410C, #EA580C)',
      },
      animation: {
        'float-slow':   'float 5.5s ease-in-out infinite',
        'float-med':    'float 4.5s ease-in-out infinite 0.8s',
        'float-fast':   'float 4s ease-in-out infinite 1.5s',
        'pulse-orb':    'pulseOrb 6s ease-in-out infinite',
        'cta-pulse':    'ctaPulse 2.5s ease-in-out infinite',
        'count-up':     'countUp 1.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseOrb: {
          '0%, 100%': { transform: 'scale(1)',    opacity: '0.08' },
          '50%':      { transform: 'scale(1.12)', opacity: '0.13' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(194,65,12,0.4)' },
          '50%':      { boxShadow: '0 0 0 10px rgba(194,65,12,0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

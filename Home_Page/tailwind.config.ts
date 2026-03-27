import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'coffee-black': '#120903',
        'coffee-deep': '#0A0502',
        'coffee-mid': '#1A0D06',
        'graphite-dark': '#1E1E1E',
        'graphite': '#2C2C2C',
        'orange-burnt': '#C2410C',
        'orange-light': '#EA580C',
        'sand': '#C9A87C',
        'sand-light': '#E8D5B7',
        'ivory': '#FAF3E0',
        'ivory-dim': '#EDE3D0',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      fontSize: {
        'h1': ['60px', { lineHeight: '1.08', fontWeight: '700' }],
        'h2': ['42px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['26px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['18px', { lineHeight: '1.75' }],
        'body': ['16px', { lineHeight: '1.65' }],
        'caption': ['13px', { lineHeight: '1.5' }],
        'stat': ['52px', { lineHeight: '1', fontWeight: '700' }],
      },
      borderRadius: {
        'card': '20px',
        'chip': '9999px',
        'modal': '24px',
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 12px 48px rgba(194, 65, 12, 0.15)',
        'orange-glow': '0 0 32px rgba(194, 65, 12, 0.5)',
        'phone': '20px 20px 60px rgba(0, 0, 0, 0.8), -10px -10px 40px rgba(255, 255, 255, 0.05)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, #120903 0%, #1A0D06 100%)',
        'cta-gradient': 'linear-gradient(135deg, #1A0D06 0%, #0A0502 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseOrb: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.25', transform: 'scale(1.1)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(194, 65, 12, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(194, 65, 12, 0)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-orb': 'pulseOrb 8s ease-in-out infinite',
        'cta-pulse': 'ctaPulse 2s infinite',
      },
    },
  },
  plugins: [typography],
} satisfies Config;

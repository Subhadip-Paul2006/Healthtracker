import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Articles page semantic tokens (match ARTICLES_PAGE spec)
        'article-bg': '#120903',
        'article-deep': '#0A0502',
        'article-card': '#1A0D06',
        'article-muted': '#22130A',
        'article-border': '#2A1A10',
        'article-fg': '#F2EAE0',
        'article-fg-muted': '#B8A494',
        'article-primary': '#E56B2A',
        'article-primary-fg': '#120903',
        'article-secondary': '#C7D3BD',
        'article-secondary-fg': '#120903',
        'article-destructive': '#D7453A',
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
        'articles-sans': ['Inter', 'system-ui', 'sans-serif'],
        'articles-serif': ['Fraunces', 'Georgia', 'serif'],
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
        'article': '1rem',
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
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseOrb: {
          '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
          '50%': { opacity: '0.25', transform: 'scale(1.1)' },
        },
        ctaPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(194, 65, 12, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(194, 65, 12, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'tilt-in': {
          from: { opacity: '0', transform: 'rotateX(8deg) translateY(20px)' },
          to: { opacity: '1', transform: 'rotateX(0deg) translateY(0)' },
        },
        'ring-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.6' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow:
              '0 0 24px rgba(229, 107, 42, 0.2), 0 0 48px rgba(229, 107, 42, 0.08)',
          },
          '50%': {
            boxShadow:
              '0 0 36px rgba(229, 107, 42, 0.35), 0 0 64px rgba(229, 107, 42, 0.15)',
          },
        },
        'heart-pop': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-orb': 'pulseOrb 8s ease-in-out infinite',
        'cta-pulse': 'ctaPulse 2s infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        marquee: 'marquee 30s linear infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'tilt-in': 'tilt-in 0.8s ease forwards',
        'ring-spin': 'ring-spin 6s linear infinite',
        ripple: 'ripple 0.8s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        'heart-pop': 'heart-pop 0.45s ease-out',
      },
    },
  },
  plugins: [typography],
} satisfies Config;

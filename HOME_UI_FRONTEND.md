## 🎯 Objective

Convert the **HealthTrack** healthcare landing page UI design into a fully functional,
production-grade frontend using the following tech stack:

- **React.js** (with functional components + hooks)
- **TypeScript** (strict mode, fully typed)
- **Tailwind CSS** (utility-first styling, custom config)
- **Three.js** (3D hero scene)
- **GSAP** (all animations + scroll triggers)

The final output must be:
- Pixel-perfect to the design spec
- Performant (Lighthouse score ≥ 90)
- Fully responsive (mobile / tablet / desktop)
- Accessible (ARIA labels, keyboard nav, focus states)
- Component-driven and scalable

---

---

## ⚙️ TECH CONFIGURATION

### tailwind.config.ts

Extend Tailwind with the full custom design token system:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
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
  plugins: [],
}

export default config
```

---

### tsconfig.json (strict mode)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

## 📦 DEPENDENCIES
```bash
npm install gsap @gsap/react three @types/three
npm install @react-three/fiber @react-three/drei
npm install react-intersection-observer
npm install -D tailwindcss @tailwindcss/typography
```

---

## 🏗️ COMPONENT SPECS

---

### Navbar.tsx
```typescript
interface NavbarProps {
  transparent?: boolean
}
```

**Behavior:**
- `useEffect` + `useState` to track `scrollY`
- Below 80px: `bg-transparent`
- Above 80px: `bg-coffee-black/90 backdrop-blur-xl`
  with `border-b border-sand/10`
- Transition: `transition-all duration-400 ease-out`
- Mobile: hamburger → full-screen drawer with
  `gsap.fromTo` slide-in animation
- Active link detection via `window.location` or
  scroll position — Burnt Orange color + underline

**Structure:**
```tsx
<nav className="fixed top-0 w-full z-50 h-[72px] ...">
  <Logo />
  <NavLinks />          {/* hidden on mobile */}
  <AuthButtons />       {/* hidden on mobile */}
  <HamburgerButton />   {/* visible on mobile */}
  <MobileDrawer />
</nav>
```

---

### Hero.tsx + HeroScene.tsx (Three.js)

**HeroScene.tsx — Three.js Implementation:**
```typescript
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
```

Build the 3D ambient scene:

1. **Ambient floating orb** — `SphereGeometry(2, 64, 64)` with
   `MeshDistortMaterial` in Burnt Orange (`#C2410C`), `distort: 0.4`,
   `speed: 2`, opacity: `0.15`. Positioned behind the phone mockup.
   Slowly rotates: `mesh.rotation.y += 0.003` per frame.

2. **Floating geometric accents** — 3–4 `IcosahedronGeometry(0.3)`
   or `TorusGeometry` meshes in Sand and Ivory colors,
   scattered in the scene with random positions.
   Use `<Float>` from drei for built-in bobbing physics.

3. **Particle field** — 200 points (`BufferGeometry` + `PointsMaterial`)
   in Muted Sand `#C9A87C` at opacity 0.3, tiny size `0.02`.
   Slowly drift: `points.rotation.y += 0.0005` per frame.

4. **Lighting:**
   - `<ambientLight intensity={0.3} />`
   - `<pointLight position={[5,5,5]} color="#C2410C" intensity={1.5} />`
   - `<pointLight position={[-5,3,-5]} color="#FAF3E0" intensity={0.5} />`

**Canvas setup in HeroScene.tsx:**
```tsx
<Canvas
  camera={{ position: [0, 0, 5], fov: 60 }}
  style={{ position: 'absolute', inset: 0, zIndex: 0 }}
  gl={{ alpha: true, antialias: true }}
>
  <AmbientOrb />
  <FloatingAccents />
  <ParticleField />
</Canvas>
```

**Hero.tsx — Layout:**
```tsx
<section className="relative min-h-[620px] bg-hero-gradient overflow-hidden">
  <HeroScene />                    {/* Three.js — absolute fill */}
  <GrainOverlay />                 {/* SVG noise at 4% opacity */}

  <div className="relative z-10 max-w-[1280px] mx-auto px-6
                  grid grid-cols-12 gap-6 items-center min-h-[620px]">

    {/* Left — 7 cols */}
    <div className="col-span-7">
      <SectionLabel>INDIA'S #1 HEALTH PLATFORM</SectionLabel>
      <h1 className="font-display text-h1 text-ivory mt-3">
        Your health, tracked smarter.
      </h1>
      <p className="font-body text-body-lg text-sand-dark mt-4 max-w-lg">
        Find doctors, book lab tests, and track your vitals — all in one place.
      </p>
      <SearchCard />
    </div>

    {/* Right — 5 cols */}
    <div className="col-span-5 relative">
      <HeroVisualStack />          {/* Layered 2.5D depth scene */}
    </div>
  </div>
</section>
```

**HeroVisualStack — Layered depth (DOM + CSS 3D):**
```tsx
// Layer 0: Glow orb
<div className="absolute inset-0 rounded-full bg-orange-burnt/10
                blur-[80px] w-[400px] h-[400px] animate-pulse-orb" />

// Layer 1: Back dashboard card (tilted)
<div style={{ transform: 'perspective(1000px) rotateY(-14deg) rotateX(5deg)' }}
     className="absolute top-8 left-4 w-64 h-40 bg-graphite
                rounded-card shadow-phone border border-sand/10">
  <MiniDashboardUI />
</div>

// Layer 2: Phone mockup (center)
<div style={{ transform: 'perspective(1000px) rotateY(-6deg) rotateX(2deg)' }}
     className="relative z-10 mx-auto w-56 shadow-phone">
  <PhoneMockup />
</div>

// Layer 3: Floating stat chips
<StatChip label="❤️ 98 bpm"           style={{ top: '10%',  right: '5%',  rotate: '8deg'  }} delay={0} />
<StatChip label="✅ Dr. Available"     style={{ top: '35%',  left: '-10%', rotate: '-6deg' }} delay={0.3} />
<StatChip label="📊 +12% this week"   style={{ bottom: '20%',right: '0%', rotate: '4deg'  }} delay={0.6} />
<StatChip label="🧪 Lab Result Ready" style={{ top: '5%',   left: '5%',  rotate: '-10deg'}} delay={0.9} />

// Layer 4: Ground glow
<div className="absolute bottom-0 left-0 right-0 h-[2px]
  bg-[linear-gradient(90deg,transparent,rgba(194,65,12,0.3),transparent)]" />
```

---

### GSAP Animation System

#### animations/pageLoad.ts
```typescript
import gsap from 'gsap'

export function runPageLoadSequence(): void {
  const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

  tl.fromTo('nav',
    { opacity: 0, y: -12 },
    { opacity: 1, y: 0, duration: 0.5 }
  )
  .fromTo('[data-hero-label]',
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.4 },
    0.2
  )
  .fromTo('[data-hero-word]',           // each word in H1 has this attr
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
    0.35
  )
  .fromTo('[data-hero-body]',
    { opacity: 0, y: 12 },
    { opacity: 1, y: 0, duration: 0.5 },
    0.65
  )
  .fromTo('[data-search-card]',
    { opacity: 0, scale: 0.96 },
    { opacity: 1, scale: 1, duration: 0.5,
      ease: 'back.out(1.4)' },
    0.8
  )
  .fromTo('[data-hero-back-card]',
    { opacity: 0, x: 60 },
    { opacity: 1, x: 0, duration: 0.6 },
    0.4
  )
  .fromTo('[data-hero-phone]',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.6 },
    0.6
  )
  .fromTo('[data-stat-chip]',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, stagger: 0.2,
      ease: 'back.out(2)' },
    0.8
  )
}
```

#### animations/scrollReveal.ts
```typescript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Default reveal — used on all section elements
export function revealOnScroll(selector: string, delay = 0): void {
  gsap.fromTo(selector,
    { opacity: 0, y: 32 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Staggered card reveal — Services, Stats, Articles
export function revealCards(containerSelector: string,
                             cardSelector: string): void {
  gsap.fromTo(`${containerSelector} ${cardSelector}`,
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerSelector,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  )
}

// Horizontal mirror reveal — Graph cards
export function revealGraphCards(): void {
  gsap.fromTo('[data-graph-left]',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-analytics]', start: 'top 80%' } }
  )
  gsap.fromTo('[data-graph-right]',
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 0.7, ease: 'power2.out',
      scrollTrigger: { trigger: '[data-analytics]', start: 'top 80%' } }
  )
}

// Testimonial card — spring scale reveal
export function revealTestimonial(): void {
  gsap.fromTo('[data-testimonial-card]',
    { opacity: 0, scale: 0.94 },
    { opacity: 1, scale: 1, duration: 0.7,
      ease: 'back.out(1.6)',
      scrollTrigger: {
        trigger: '[data-testimonials]',
        start: 'top 75%',
      },
    }
  )
}

// Phone CTA — enter from left with rotation settle
export function revealCTAPhone(): void {
  gsap.fromTo('[data-cta-phone]',
    { opacity: 0, x: -40,
      rotateY: 20 },    // starts more tilted
    { opacity: 1, x: 0,
      rotateY: 12,      // settles to design tilt
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '[data-cta]',
        start: 'top 80%',
      },
    }
  )
}
```

#### hooks/useCountUp.ts
```typescript
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useCountUp(
  targetValue: number,
  suffix = '+'
): React.RefObject<HTMLSpanElement> {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const obj = { val: 0 }

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: targetValue,
          duration: 1.8,
          ease: 'power2.out',
          onUpdate: () => {
            if (ref.current) {
              ref.current.textContent =
                Math.round(obj.val).toLocaleString('en-IN') + suffix
            }
          },
        })
      },
    })
  }, [targetValue, suffix])

  return ref
}
```

#### hooks/useParallax.ts
```typescript
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ParallaxConfig {
  selector: string
  speed: number    // 0.1 = subtle, 0.5 = strong
  direction?: 'y' | 'x'
}

export function useParallax(configs: ParallaxConfig[]): void {
  useEffect(() => {
    configs.forEach(({ selector, speed, direction = 'y' }) => {
      gsap.to(selector, {
        [direction]: () => window.innerHeight * speed * -1,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
}

// Usage in Hero.tsx:
// useParallax([
//   { selector: '[data-hero-visual]',  speed: 0.35 },
//   { selector: '[data-hero-orb]',     speed: 0.55 },
//   { selector: '[data-hero-h1]',      speed: 0.15 },
//   { selector: '[data-stat-chip-1]',  speed: 0.25 },
//   { selector: '[data-stat-chip-2]',  speed: 0.35 },
//   { selector: '[data-stat-chip-3]',  speed: 0.45 },
//   { selector: '[data-stat-chip-4]',  speed: 0.28 },
// ])
```

---

### Stats.tsx — Count-Up + Glow
```tsx
interface StatItem {
  value: number
  suffix: string
  label: string
}

const STATS: StatItem[] = [
  { value: 1000000, suffix: '+', label: 'Active patients monthly' },
  { value: 200,     suffix: '+', label: 'Labs & Collection Centers' },
  { value: 100,     suffix: '+', label: 'Doctors across India' },
  { value: 100,     suffix: '+', label: 'Pharmacy & Clinics connected' },
]

function StatBlock({ value, suffix, label }: StatItem) {
  const numRef = useCountUp(value, suffix)

  return (
    <div className="flex flex-col items-center border-r border-sand/10
                    last:border-r-0 px-8 py-12" data-stat-block>
      <div className="w-10 h-[3px] bg-orange-burnt mb-6 rounded-full" />
      <span
        ref={numRef}
        className="font-mono text-stat text-orange-burnt
                   [text-shadow:0_0_32px_rgba(194,65,12,0.5)]"
      >
        0+
      </span>
      <span className="font-body text-body text-sand mt-3 text-center">
        {label}
      </span>
    </div>
  )
}
```

---

### Analytics.tsx — Chart Implementation

Use **Recharts** for the chart components (lightweight, React-native):
```bash
npm install recharts
```
```tsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip
} from 'recharts'

const LINE_COLORS = {
  primary: '#C2410C',   // Burnt Orange
  secondary: '#C9A87C', // Muted Sand
  tertiary: 'rgba(250,243,224,0.5)', // Ivory dim
}

const PIE_COLORS = ['#C2410C', '#C9A87C', '#A0845A', '#EDE3D0']
```

Chart cards styled with:
```tsx
<div
  data-graph-left
  className="bg-graphite rounded-card border border-sand/10
             shadow-card p-7"
  style={{
    background: 'radial-gradient(ellipse at 30% 20%, #1E1E1E, #120903)'
  }}
>
```

---

### Button.tsx — Reusable with Variants
```typescript
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'cta'

interface ButtonProps {
  variant: ButtonVariant
  children: React.ReactNode
  onClick?: () => void
  className?: string
  pulse?: boolean     // enables animate-cta-pulse
}
```
```tsx
const variants: Record<ButtonVariant, string> = {
  primary: `bg-orange-burnt text-ivory rounded-chip px-6 py-2.5
            hover:bg-orange-light hover:scale-[1.02]
            transition-all duration-200 shadow-orange-glow`,
  outline: `border border-orange-burnt text-orange-burnt rounded-xl
            px-6 py-2.5 hover:bg-orange-burnt hover:text-ivory
            transition-all duration-200`,
  ghost:   `border border-sand/30 text-sand rounded-chip px-5 py-2
            hover:border-ivory hover:text-ivory transition-all duration-200`,
  cta:     `bg-cta-gradient text-ivory rounded-xl px-8 py-3
            hover:scale-[1.02] transition-all duration-200`,
}
```

---

## 📐 RESPONSIVE IMPLEMENTATION
```tsx
// Tailwind responsive grid pattern — use throughout
<div className="
  grid
  grid-cols-1          // mobile
  md:grid-cols-2       // tablet
  lg:grid-cols-4       // desktop
  gap-6
">
```

**Mobile-specific rules:**
- Hero: stack to single column, hide 3D visual chips (show simplified)
- Three.js canvas: reduce particle count to 80 on mobile
  (detect via `window.innerWidth < 768` in HeroScene)
- GSAP parallax: disable on mobile
  (`ScrollTrigger.matchMedia({ '(min-width: 768px)': () => { ... } })`)
- Navbar: hamburger drawer with GSAP slide-in
- Stats: 2×2 grid, remove border separators, keep count-up

---

## ♿ ACCESSIBILITY

- All images: `alt` attributes required (TypeScript will enforce via props)
- Interactive elements: `focus-visible:ring-2 focus-visible:ring-orange-burnt`
- Reduced motion: wrap all GSAP animations in:
```typescript
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // run animation
  }
```
- Color contrast: Soft Ivory `#FAF3E0` on Coffee Black `#120903`
  passes WCAG AA (contrast ratio: 14.2:1)
- ARIA: `role="navigation"`, `aria-label` on nav,
  `aria-current="page"` on active link

---

## ⚡ PERFORMANCE RULES

- Lazy load all section components with `React.lazy` + `Suspense`
- Three.js: dispose geometries/materials on unmount
```typescript
  useEffect(() => {
    return () => {
      geometry.dispose()
      material.dispose()
    }
  }, [])
```
- Images: use `loading="lazy"` + `decoding="async"` on all `<img>`
- GSAP ScrollTrigger: kill all instances on component unmount
```typescript
  useEffect(() => {
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])
```
- Fonts: preload via `<link rel="preload">` in `index.html`
- Tailwind: purge unused classes in production build

---

## 🎯 FINAL ACCEPTANCE CRITERIA

- ✅ Lighthouse Performance ≥ 90 on desktop
- ✅ TypeScript strict mode — zero `any` types
- ✅ All GSAP animations respect `prefers-reduced-motion`
- ✅ Three.js scene runs at 60fps on mid-range hardware
- ✅ All 9 sections render pixel-perfect to design spec
- ✅ Fully responsive across 320px → 1920px viewport widths
- ✅ No layout shift (CLS = 0) on page load
- ✅ All interactive elements are keyboard navigable
- ✅ Count-up fires exactly once per session per stat
- ✅ Parallax disabled on mobile for performance

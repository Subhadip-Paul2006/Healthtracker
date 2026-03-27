# HealthTrack Home Page — Implementation Plan

Build the complete HealthTrack Home Page as specified in [HOME_UI_FRONTEND.md](file:///d:/HEALTHTRACKER%20NEW/Healthtracker/HOME_UI_FRONTEND.md), using the Figma design as the visual reference. This is a premium healthcare SaaS landing page with 9 sections, full GSAP animation, Three.js WebGL background, Recharts data visualizations, and a strict dark "Amber Obsidian" design system.

## Proposed Changes

### Project Scaffold

#### [NEW] `Home Page/` — Vite + React 18 + TypeScript project
Bootstrapped with `npm create vite@latest`. React 18 + TypeScript template.

---

### Design System

#### [NEW] `Home Page/tailwind.config.ts`
Full custom token extension:
- Colors: `coffee-black`, `coffee-deep`, `coffee-mid`, `graphite-dark`, `graphite`, `orange-burnt`, `orange-light`, `sand`, `sand-light`, `ivory`, `ivory-dim`
- Font families: Cormorant Garamond (display), Plus Jakarta Sans (body), Space Mono (mono)
- Box shadows: `card`, `card-hover`, `orange-glow`, `phone`
- Background images: `hero-gradient`, `cta-gradient`
- Keyframes: `float`, `pulseOrb`, `ctaPulse`

#### [NEW] `Home Page/index.html`
Google Fonts preload for Cormorant Garamond + Plus Jakarta Sans + Space Mono.

---

### UI Primitives

#### [NEW] `src/components/ui/Button.tsx`
Primary (orange-burnt) and outline variants. Accessible focus ring.

#### [NEW] `src/components/ui/SectionLabel.tsx`
Small uppercase chip label with sand border.

#### [NEW] `src/components/ui/StatChip.tsx`
Floating stat badge — icon + value text, rounded, sand background, drop shadow.

#### [NEW] `src/components/ui/SearchCard.tsx`
Location input + orange arrow submit CTA.

---

### Animation Modules

#### [NEW] `src/animations/pageLoad.ts`
GSAP timeline: nav → chip → H1 words → body → search card → dashboard card → phone → stat chips (staggered bounce).

#### [NEW] `src/animations/scrollReveal.ts`
GSAP ScrollTrigger system: default fade+slide, card stagger, analytics mirror slide, testimonial spring, CTA phone settle.

#### [NEW] `src/hooks/useCountUp.ts`
Fires once on scroll entry, animates 0 → target with `power2.out` 1.8s, formatted with `toLocaleString('en-IN')`.

#### [NEW] `src/hooks/useParallax.ts`
Desktop-only parallax layer speeds via `ScrollTrigger.matchMedia`.

---

### Section Components (9)

#### [NEW] `src/components/Navbar.tsx`
Fixed 72px height. Transparent → frosted glass at scroll ≥ 80px. Mobile hamburger → full-screen GSAP slide-in drawer.

#### [NEW] `src/components/Hero.tsx`
12-column grid. Left: SectionLabel + H1 + body + SearchCard. Right: 2.5D depth stack (glow orb, back dashboard card, phone mockup, 4 StatChips, ground glow line).

#### [NEW] `src/components/HeroScene.tsx`
Three.js Canvas: ambient distort orb, 3 floating accent meshes in `<Float>`, 200-point particle field, proper lighting, cleanup on unmount.

#### [NEW] `src/components/Services.tsx`
4-card grid: Video Consultation, Doctors Near You, Lab Tests, Personalized Trackers. Hover scale + border glow. Staggered scroll reveal.

#### [NEW] `src/components/Articles.tsx`
Split 40/60 layout. 2 article cards with lazy images, category pill, author avatar.

#### [NEW] `src/components/Analytics.tsx`
Two Recharts chart cards: LineChart (3 vital lines) + PieChart/Donut (activity). GSAP horizontal mirror slide on scroll.

#### [NEW] `src/components/Testimonials.tsx`
Carousel of 3 testimonials, auto-advance 5s, dot navigation, GSAP spring reveal.

#### [NEW] `src/components/CTA.tsx`
Two-column: tilted 3D phone mockup (left) + email form (right). GSAP `rotateY` settle animation.

#### [NEW] `src/components/Stats.tsx`
4 count-up blocks: 10,00,000+ patients, 200+ labs, 100+ doctors, 100+ pharmacies.

#### [NEW] `src/components/Footer.tsx`
Logo + tagline, 4 link columns, social icons, copyright.

---

### App Entry

#### [NEW] `src/App.tsx`
All sections composed with `React.lazy` + `<Suspense>`. GSAP scroll reveal wired after mount.

#### [NEW] `src/main.tsx`
React 18 root render.

---

## Verification Plan

### Automated (Dev Server)
```bash
cd "d:\HEALTHTRACKER NEW\Healthtracker\Home Page"
npm run dev
```
Then open browser at `http://localhost:5173` and visually verify all 9 sections.

### Browser Validation (via browser subagent)
1. Navigate to `http://localhost:5173`
2. Verify hero renders with section label, H1, search card, and 2.5D depth stack
3. Scroll through page — verify all sections appear and scroll animations fire
4. Test mobile hamburger (resize to 375px)
5. Verify Recharts line chart and donut chart render with data
6. Verify count-up animations fire on Stats section scroll
7. Verify testimonial carousel auto-advances

### Manual Verification
- Check Cormorant Garamond and Plus Jakarta Sans load correctly
- Confirm dark theme: `#120903` background, burnt orange accents
- Check no horizontal overflow at 375px viewport width

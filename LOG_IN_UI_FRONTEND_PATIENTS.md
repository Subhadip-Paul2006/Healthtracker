# HealthTracker — Patient Login Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Login Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The page is a split-panel layout: a branded dark-to-orange left panel and a clean ivory right panel containing the navbar, role tabs, and a centered login card.

**Design feel:** Calm · Premium · Clinical · Trustworthy

---

## File Structure

Strictly follow this structure. Do not deviate or add extra files unless listed:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page
└── Patients/
    ├── Registration_Page
    └── Login_Page/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            └── components/
                └── LoginForm.tsx
```

- `App.tsx` → full split-screen layout, navbar, role tabs, Three.js left panel, imports `LoginForm.tsx`
- `LoginForm.tsx` → login form card with all fields, state, and interactions
- No additional component files needed

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel 3D floating orb visual |

---

## Color System

Define these in `tailwind.config.ts` as custom colors:

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — left panel text, navbar logo
  burnt:   '#D96C2D',   // Burnt Orange — CTA button, active tab, links
  sand:    '#E6D3B3',   // Muted Sand — login card background
  ivory:   '#FAF7F0',   // Ivory White — right panel page background
}
```

---

## Full Page Layout (App.tsx)

```
┌──────────────────────────┬──────────────────────────────────┐
│    LEFT PANEL (50%)      │       RIGHT PANEL (50%)          │
│    Dark-to-orange BG     │  Ivory White BG                  │
│    Three.js orb visual   │  Navbar (minimal, top)           │
│    "Clinical Sanctuary"  │  Role Toggle Tabs                │
│    Tagline + subtext      │  Login Form Card (centered)      │
│    Stats: 99.9% / 24/7   │  Footer text (bottom)            │
│    Footer copyright      │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

- Root: `flex h-screen w-full overflow-hidden`
- Left: `w-1/2 relative flex-shrink-0 flex flex-col`
- Right: `w-1/2 overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Three.js + Branding (App.tsx)
### Background
- Full panel gradient top-to-bottom: `#3B2F2F` (dark coffee top) → `#D96C2D` (burnt orange bottom)
- Apply via `style` prop: `background: 'linear-gradient(to bottom, #3B2F2F 0%, #8B4010 50%, #D96C2D 100%)'`
- This is the only permitted inline style in the entire codebase

### Three.js Canvas
- `<canvas>` positioned `absolute inset-0 z-0 w-full h-full`
- Scene setup:
  - `PerspectiveCamera` — FOV 55, z = 5
  - `AmbientLight` — color `#ffffff`, intensity 0.3
  - `PointLight` — color `#ffaa66`, intensity 1.2, position (2, 2, 3)
  - Second `PointLight` — color `#ff6622`, intensity 0.6, position (-2, -1, 2)
  - Geometry: `SphereGeometry(1.3, 64, 64)` — main orb
  - Material: `MeshStandardMaterial`, color `#c05820`, roughness 0.25, metalness 0.7, emissive `#8B3010`, emissiveIntensity `0.4`
  - Outer ring: `TorusGeometry(1.8, 0.025, 16, 120)` with `MeshStandardMaterial`, color `#ffaa55`, emissive `#ff6600`, emissiveIntensity 0.8
  - Animation loop:
    - Sphere: Y-axis rotation at `0.003` per frame
    - Sphere Y position: `Math.sin(elapsed * 0.8) * 0.12` (floating)
    - Ring: Y-axis rotation at `0.005` per frame, X-axis rotation at `0.002` per frame

### Overlay Content (above canvas, `z-10`, `relative flex flex-col h-full px-10 py-8`)

**Top label:**
- `"Clinical Sanctuary"` — `text-base font-semibold text-white/90`
- Thin underline accent: `<div class="w-8 h-0.5 bg-burnt mt-1.5 mb-0">` (decorative rule below label)

**Middle section (flex-1, flex flex-col justify-center):**
- Heading: `"The Sanctuary for Your Clinical Journey."` — `text-4xl font-bold text-white leading-tight`
- Subtext: `"Experience a healthcare interface designed for peace of mind, restorative focus, and professional excellence."` — `text-sm text-white/65 mt-4 leading-relaxed max-w-xs`

**Stats Row (below subtext, `mt-10 flex gap-12`):**

| Stat | Label |
|---|---|
| `99.9%` | `SECURE ACCESS` |
| `24/7` | `PATIENT SUPPORT` |

- Stat number: `text-2xl font-bold text-white`
- Stat label: `text-[10px] tracking-widest text-white/50 uppercase mt-0.5`

**Bottom copyright:**
- `"© 2024 RESTORATIVE CARE SYSTEMS"` — `text-[10px] text-white/30 tracking-wider absolute bottom-8 left-10`

### GSAP — Left Panel Animations
On mount, `gsap.timeline()`:
1. `"Clinical Sanctuary"` label: fade in from `y: -15`, opacity 0 → 1, duration `0.5s`
2. Heading: fade in from `y: 20`, opacity 0 → 1, duration `0.7s`, delay `0.2s`
3. Subtext: fade in from `y: 15`, opacity 0 → 1, duration `0.6s`, delay `0.4s`
4. Stats row: stagger each stat from `y: 10`, opacity 0 → 1, stagger `0.15s`, delay `0.6s`

---

## Role Toggle Tabs — Sliding Pill Indicator (App.tsx)

### Structure
- Outer container: `relative inline-flex items-center bg-sand rounded-full p-1`
- Centered wrapper: `flex justify-center mt-5 mb-6`
- 3 tab buttons: `For Patients · For Doctors · For Providers`

### Sliding Indicator
- A `<div>` positioned `absolute top-1 bottom-1 left-1 rounded-full`
- Background: `bg-burnt`
- Width: `calc(33.333% - 2px)`
- Shadow: `shadow-[0_0_12px_rgba(217,108,45,0.45)]`
- Moves behind tab text — indicator has no z-index, tab text is `z-10`

### State & Refs
- `useState<'Patients'|'Doctors'|'Providers'>('Patients')` — default is **Patients**
- `useRef` for indicator div
- `useRef<(HTMLButtonElement|null)[]>` array for tab buttons

### GSAP Behavior
- On page load: `gsap.set(indicatorRef, { x: '0%' })` — snap to Patients, no animation
- On tab click: `gsap.to(indicatorRef, { x: index * 100 + '%', duration: 0.45, ease: 'power3.inOut' })`
- Active tab text scale: `gsap.to(activeTab, { scale: 1.05, duration: 0.3 })`
- Inactive tabs: `gsap.to(inactiveTabs, { scale: 1, duration: 0.3 })`

### Active / Inactive Text
- Active tab: `text-white`
- Inactive tabs: `text-coffee/65 hover:text-coffee`

### Behavior Note
- Tabs are display-only — clicking animates the indicator but does not navigate

### Form Card Container
- `mx-auto w-[85%] max-w-sm`
- Card: `bg-sand rounded-2xl shadow-xl p-8`

---


## LOGIN FORM COMPONENT (LoginForm.tsx)

All state via `useState`. No backend. TypeScript interfaces required.

### Card Header
- Title: `"Patient Login"` — `text-2xl font-bold text-coffee`
- Subtitle: `"Access your healthcare dashboard securely"` — `text-sm text-coffee/55 mt-1`

---

### Field 1 — USER ID

- Section label: `"USER ID"` — `text-[10px] font-bold tracking-widest text-coffee/50 uppercase mb-2 mt-5`
- Input container: `relative flex items-center`
- Left icon: person/user SVG icon — `absolute left-3 w-4 h-4 text-coffee/40`
- Input: `type="text"`, placeholder `"Enter your patient ID"`, `pl-9` padding-left to clear icon
- Standard input styling (see Shared Input Styles below)

---

### Field 2 — PASSWORD

- Section label: `"PASSWORD"` — same uppercase label style as USER ID, `mt-4`
- Input container: `relative flex items-center`
- Left icon: lock SVG icon — `absolute left-3 w-4 h-4 text-coffee/40`
- Input: `type="password"` (toggle-able), placeholder rendered as dots `"••••••••"`, `pl-9 pr-10`
- Right side: eye icon toggle — `absolute right-3 w-4 h-4 text-coffee/40 cursor-pointer hover:text-coffee transition`
- State: `useState<boolean>(false)` for password visibility

**Forgot Password link** (right-aligned, below the password input):
- `text-right mt-2`
- `"Forgot Password?"` — `text-sm text-burnt hover:text-[#b85a22] cursor-pointer transition underline`

---

### CTA Button — Login

- `mt-5 w-full`
- Style: `w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-base py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`
- Text: `"Login"` + right arrow `→`
- On hover: `gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 })`
- On leave: `gsap.to(btnRef.current, { scale: 1, duration: 0.15 })`
- On click: brief loading state — spinner icon replaces `"Login →"` text for 1.5s then restore
- Error state: if `loginError` state is `true`, button shakes: `gsap.to(btnRef.current, { x: [-6, 6, -4, 4, 0], duration: 0.4 })`

---

### Divider + Sign Up Link

- Divider: `flex items-center gap-3 mt-6`
  - `<hr class="flex-1 border-coffee/15">` + `<span class="text-xs text-coffee/40">OR REGISTER</span>` + `<hr class="flex-1 border-coffee/15">`

- Sign up row: `text-center mt-3`
  - `"Don't have an account? "` + `<a>Register</a>`
  - Text: `text-sm text-coffee/60`
  - Link: `text-burnt underline font-medium cursor-pointer hover:text-[#b85a22] transition`

---

### Social Login Buttons (UI only, no logic)

- `flex justify-center gap-3 mt-4`
- Two icon-only square buttons (Google + one generic):
  - Style: `w-10 h-10 rounded-lg border border-coffee/20 bg-ivory/60 flex items-center justify-center hover:bg-ivory transition cursor-pointer`
  - Google button: SVG "G" logo icon, `w-5 h-5`
  - Generic button: grid/apps SVG icon, `w-5 h-5 text-coffee/50`

---

### Bottom Footer Text (inside right panel, very bottom)

- `text-center py-6 mt-auto`
- `"HEALTHTRACKER INC. · HIGH CLINICAL ACCESS"` — `text-[10px] tracking-widest text-coffee/30 uppercase`

---

## Shared Input Styles

All text/password inputs share this exact Tailwind class set:

```
w-full bg-[#ddd0b8] border border-coffee/20 rounded-lg px-4 py-2.5
text-sm text-coffee placeholder:text-coffee/35
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/25
transition-all duration-150
```

---

## TypeScript Interface (LoginForm.tsx)

```ts
interface LoginFormState {
  userId: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  loginError: boolean;
}
```

---

## GSAP Animations — Full Sequence (App.tsx)

Page load `gsap.timeline()` on mount:

| Step | Target | Animation | Delay |
|---|---|---|---|
| 1 | Navbar | `y: -20 → 0`, opacity 0 → 1 | 0s |
| 2 | Role tabs | `y: -10 → 0`, opacity 0 → 1 | 0.2s |
| 3 | Login card | `y: 30 → 0`, opacity 0 → 1, ease `power2.out` | 0.35s |
| 4 | Card header | `y: 10 → 0`, opacity 0 → 1 | 0.55s |
| 5 | Each field | stagger `y: 8 → 0`, opacity 0 → 1, stagger `0.1s` | 0.65s |

### Input Focus:
- `onFocus`: `gsap.to(inputWrapperRef, { scale: 1.01, duration: 0.12 })`
- `onBlur`: `gsap.to(inputWrapperRef, { scale: 1, duration: 0.12 })`

---

## Rules & Constraints

- No inline styles except the left panel gradient background (one permitted exception)
- Zero `any` types anywhere in TypeScript
- No external UI libraries (no shadcn, MUI, Radix, Framer Motion) — Tailwind + GSAP only
- No real authentication logic — form state is display only
- "Forgot Password?" is a styled element only — no routing or modal needed
- Social login buttons are UI-only — no OAuth integration
- Role tabs are display-only — "For Patients" is permanently active

---

## Output Checklist

- [ ] Three.js sphere + torus ring render and animate (float + rotate) in left panel
- [ ] Left panel gradient matches design (dark coffee top → burnt orange bottom)
- [ ] "Clinical Sanctuary" label with decorative underline renders
- [ ] Heading, subtext, and stats (99.9% / 24/7) render correctly
- [ ] Copyright text appears at bottom-left of left panel
- [ ] Navbar renders with logo, nav links, and "Sign In" pill button
- [ ] Role tabs render with "For Patients" as active burnt-orange pill
- [ ] Login card renders centered with sand background and shadow
- [ ] USER ID field has left person icon + correct placeholder
- [ ] PASSWORD field has left lock icon + right eye toggle
- [ ] "Forgot Password?" link right-aligned below password field
- [ ] "Login →" CTA button shows loading spinner on click
- [ ] Login button shakes on error state
- [ ] OR REGISTER divider renders between button and sign-up link
- [ ] "Don't have an account? Register" link renders
- [ ] Two social login icon buttons render
- [ ] Footer text renders at very bottom of right panel
- [ ] GSAP page load sequence fires in correct order
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Pixel-accurate match to design reference image

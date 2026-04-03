# HealthTracker — Service Provider Login Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Service Provider Login Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must maintain **full visual consistency with the Patient and Doctor Login pages** while being distinctly tailored for service providers (Labs, Pharmacies, Clinics, Diagnostic Centers). The page shares the same split-panel shell, navbar, tab structure, input styles, and GSAP timing. Only the active role tab, left panel content, Three.js visual, card title, and placeholder text differ.

**Design feel:** Operational · Professional · Clinical Infrastructure · Trustworthy

---

## File Structure

Strictly follow this structure. Do not deviate or add extra files unless listed:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page/
├── Patients/
└── Service_Provider/
    ├── Registration_Page/       ← No changes to this folder
    └── Login_Page/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            └── components/
                └── Form.tsx
```

- `App.tsx` → full split-screen layout, navbar, role tabs, Three.js left panel, provider image card, imports `Form.tsx`
- `Form.tsx` → provider login form card with all fields, state, and interactions
- `Registration_Page/` is an existing folder — do not touch, modify, or regenerate anything inside it

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel rotating diagnostic grid ring |

---

## Color System

Define in `tailwind.config.ts`. **Identical to all other HealthTracker pages — never change these values:**

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — navbar logo, labels, text
  burnt:   '#D96C2D',   // Burnt Orange — active tab, CTA button, links, accents
  sand:    '#E6D3B3',   // Muted Sand — tab container background, form card
  ivory:   '#FAF7F0',   // Ivory White — right panel page background
}
```

---

## Full Page Layout (App.tsx)

```
┌──────────────────────────┬──────────────────────────────────┐
│    LEFT PANEL (50%)      │       RIGHT PANEL (50%)          │
│    Dark-to-orange BG     │  Ivory White BG                  │
│    Three.js grid ring    │  Navbar (minimal, top)           │
│    Provider image card   │  Role Toggle Tabs                │
│    "Clinical Sanctuary"  │  Provider Login Form Card        │
│    Tagline + subtext     │  "Already have an account?" row  │
│    Copyright bottom      │  Footer text (very bottom)       │
└──────────────────────────┴──────────────────────────────────┘
```

- Root: `flex h-screen w-full overflow-hidden`
- Left: `w-1/2 relative flex-shrink-0 flex flex-col overflow-hidden`
- Right: `w-1/2 overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Layered Composition (App.tsx)

Four stacked layers, bottom to top:

```
Layer 0 (z-0):  Gradient background
Layer 1 (z-1):  Three.js canvas (ambient, low opacity)
Layer 2 (z-2):  Provider image card (bottom-left)
Layer 3 (z-10): Text + UI overlay content
```

---

### Layer 0 — Gradient Background
- `absolute inset-0 z-0`
- Inline style (only permitted one): `background: 'linear-gradient(to bottom, #3B2F2F 0%, #7a3010 45%, #D96C2D 100%)'`

---

### Layer 1 — Three.js Canvas (Ambient Diagnostic Ring)
- `<canvas>` positioned `absolute inset-0 z-[1] w-full h-full opacity-25`
- Keep opacity low — ambient only, not the visual hero
- Scene setup (provider-themed — rotating diagnostic grid):
  - `PerspectiveCamera` — FOV 60, z = 6
  - `AmbientLight` — color `#ffffff`, intensity 0.2
  - `PointLight` — color `#ff8844`, intensity 0.9, position (2, 1, 3)
  - `PointLight` — color `#00ccaa`, intensity 0.4, position (-2, -1, 2)
  - **Primary geometry**: `TorusGeometry(2.2, 0.035, 16, 80)` — large outer diagnostic ring
  - **Secondary geometry**: `TorusGeometry(1.5, 0.02, 16, 80)` — mid ring, rotated on X-axis by `Math.PI / 4`
  - **Tertiary geometry**: `TorusGeometry(0.9, 0.015, 16, 60)` — inner ring, rotated on Z-axis by `Math.PI / 6`
  - All ring materials: `MeshStandardMaterial`, color `#ff9944`, emissive `#cc4400`, emissiveIntensity `0.6`
  - **Grid lines** (12 evenly-spaced): `CylinderGeometry(0.008, 0.008, 4.4, 6)` spokes radiating from center, each rotated by `(i / 12) * Math.PI`, material color `#ff8833`, emissiveIntensity `0.3`
  - Animation loop: entire scene group Y-axis rotation at `0.004` per frame; outer ring X-axis tilt at `0.001` per frame; group Y position: `Math.sin(elapsed * 0.6) * 0.1` (float)

---

### Layer 2 — Provider Image Card (Bottom-Left)
- Container: `absolute bottom-12 left-8 z-[2]`
- Card: `w-52 rounded-xl overflow-hidden relative` with subtle shadow `shadow-2xl`
- Since no actual photo file is provided, render a **CSS card simulating a clinic/lab environment**:
  - Card background: `linear-gradient(135deg, #1a0a00 0%, #4a1a00 50%, #8B4010 100%)`
  - Height: `h-36`
  - Inside: a simple SVG representing a building/clinic with a cross symbol and horizontal lines — representing a healthcare facility
  - SVG fill: `white` at `opacity-20`, centered inside the card
  - Warm orange overlay on top: `absolute inset-0 bg-gradient-to-tr from-burnt/40 via-transparent to-transparent`
  - Bottom text strip inside card: `absolute bottom-0 left-0 right-0 bg-coffee/60 px-3 py-2`
    - Text: `"CLINICAL PROVIDER"` — `text-[9px] tracking-widest text-white/60 uppercase`
  - Card border: `border border-white/10`
- GSAP on load: slide up from `y: 30` → `y: 0`, opacity 0 → 1, duration `0.9s`, delay `0.9s`

---

### Layer 3 — Text + UI Overlay
- `absolute inset-0 z-10 flex flex-col px-8 py-7`

**Top label:**
- `"Clinical Sanctuary"` — `text-sm font-semibold text-white/90 tracking-wide`
- Decorative underline: `<div className="w-6 h-0.5 bg-white/40 mt-1.5">`

**Main text block (`mt-8`):**
- Heading: `"Restoring care through thoughtful design."` — `text-3xl font-bold text-white leading-tight`
- Subtext: `"Join a community of healthcare professionals dedicated to delivering seamless and efficient clinical services."` — `text-xs text-white/60 mt-3 leading-relaxed max-w-[230px]`

**Bottom copyright (`absolute bottom-6 left-8`):**
- `"© 2024 RESTORATIVE CARE SYSTEMS"` — `text-[9px] text-white/25 tracking-widest uppercase`

### GSAP — Left Panel Animations
`gsap.timeline()` on mount:
1. Top label: `y: -12 → 0`, opacity 0 → 1, duration `0.5s`
2. Heading: `y: 18 → 0`, opacity 0 → 1, duration `0.7s`, delay `0.2s`
3. Subtext: `y: 12 → 0`, opacity 0 → 1, duration `0.6s`, delay `0.35s`
4. Provider image card: `y: 30 → 0`, opacity 0 → 1, duration `0.9s`, delay `0.9s`

---

## RIGHT PANEL — Navbar (App.tsx)

**Pixel-identical to Patient and Doctor Login navbars — no changes:**
- `flex items-center justify-between px-8 py-4`
- Logo left: `"HealthTrack"` — `text-lg font-bold text-coffee`
- Nav links: `Find Doctors · Lab Tests · Articles · Trackers` — `text-sm text-coffee/60 flex gap-5 hover:text-coffee transition`
- Right: `"Sign In"` button — `bg-coffee text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-[#2a2020] transition`

---

## Role Toggle Tabs (App.tsx)

- Container: `flex justify-center mt-5 mb-6`
- Inner: `inline-flex rounded-full bg-sand p-1`

| Tab | State | Style |
|---|---|---|
| For Patients | Inactive | `text-coffee/65 px-5 py-2 text-sm hover:text-coffee transition` |
| For Doctors | Inactive | `text-coffee/65 px-5 py-2 text-sm hover:text-coffee transition` |
| **For Providers** | **Active** | `bg-burnt text-white rounded-full px-5 py-2 text-sm font-semibold` |

- "For Providers" is permanently active — tabs are display-only, no routing needed

---

## Form Card Container (App.tsx)

- `mx-auto w-[82%] max-w-[320px]`
- Card: `bg-sand rounded-2xl shadow-xl p-7`
- Note: card background is **sand** (`#E6D3B3`) — matching the Patient Login card, not white like the Doctor Login card

---

## PROVIDER LOGIN FORM (Form.tsx)

All state via `useState`. No backend. TypeScript interfaces required.

### Card Header
- Title: `"Provider Login"` — `text-xl font-bold text-coffee`
- Subtitle: `"Access your healthcare service dashboard securely"` — `text-xs text-coffee/50 mt-1 mb-5`

---

### Field 1 — PROVIDER ID

- Section label: `"PROVIDER ID"` — `text-[10px] font-bold tracking-widest text-coffee/45 uppercase mb-1.5`
- Input container: `relative flex items-center`
- Left icon: building/store SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
  - Use a simple hospital/building outline SVG path, or fallback to the person icon if SVG is complex
- Input: `type="text"`, placeholder `"Enter your clinic ID / business ID"`, `pl-8`
- Standard input styling (see Shared Input Styles)

---

### Field 2 — PASSWORD

- Section label: `"PASSWORD"` — same uppercase label style, `mt-4 mb-1.5`
- Input container: `relative flex items-center`
- Left icon: lock SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
- Input: `type="password"` (toggle-able), placeholder dots `"••••••••"`, `pl-8 pr-9`
- Right: eye icon — `absolute right-3 w-3.5 h-3.5 text-coffee/35 cursor-pointer hover:text-coffee transition`
- State: `useState<boolean>(false)` for visibility

**Forgot Password link (right-aligned):**
- `text-right mt-1.5`
- `"Forgot Password?"` — `text-xs text-burnt hover:text-[#b85a22] cursor-pointer underline transition`

---

### CTA Button — Login

- `mt-5 w-full`
- Style: `w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-sm py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5`
- Text: `"Login"` + right arrow `→`
- On hover: `gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 })`
- On leave: `gsap.to(btnRef.current, { scale: 1, duration: 0.15 })`
- On click: loading spinner replaces text for 1.5s, then restores
- On error: GSAP shake — `gsap.to(btnRef.current, { keyframes: { x: [-5, 5, -4, 4, 0] }, duration: 0.35 })`

---

### Divider

- `flex items-center gap-2 mt-5`
- `<hr className="flex-1 border-coffee/10">` + `<span className="text-[10px] text-coffee/35 tracking-wider">OR REGISTER</span>` + `<hr className="flex-1 border-coffee/10">`

---

### Register Link

- `text-center mt-2.5`
- `"Don't have an account? "` + `<a>Register</a>`
- Text: `text-xs text-coffee/55`
- Link: `text-burnt underline font-medium cursor-pointer hover:text-[#b85a22] transition`

---

### Social Login Buttons (UI only)

- `flex justify-center gap-2.5 mt-3.5`
- Two small square icon buttons, identical to all other login pages:
  - Style: `w-9 h-9 rounded-lg border border-coffee/20 bg-ivory/60 flex items-center justify-center hover:bg-ivory transition cursor-pointer`
  - Button 1: Google `G` SVG icon, `w-4 h-4`
  - Button 2: grid/apps SVG icon, `w-4 h-4 text-coffee/45`

---

### Bottom Footer Text (right panel, very bottom)

- `text-center py-5 mt-auto`
- `"HEALTHTRACKER INC. · HIGH CLINICAL ACCESS"` — `text-[9px] tracking-widest text-coffee/25 uppercase`

---

## Shared Input Styles

All inputs use this class set — **identical to Doctor Login inputs:**

```
w-full bg-[#ddd0b8] border border-coffee/15 rounded-lg px-3 py-2
text-xs text-coffee placeholder:text-coffee/30
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/20
transition-all duration-150
```

Note: input background `#ddd0b8` gives visible contrast against the sand card background (`#E6D3B3`).

---

## TypeScript Interface (Form.tsx)

```ts
interface ProviderLoginFormState {
  providerId: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  loginError: boolean;
}
```

---

## GSAP Animations — Full Sequence (App.tsx)

`gsap.timeline()` on mount — **same timing as Patient and Doctor Login:**

| Step | Target | Animation | Delay |
|---|---|---|---|
| 1 | Navbar | `y: -20 → 0`, opacity 0 → 1, duration `0.5s` | 0s |
| 2 | Role tabs | `y: -10 → 0`, opacity 0 → 1 | 0.2s |
| 3 | Login card | `y: 25 → 0`, opacity 0 → 1, ease `power2.out` | 0.35s |
| 4 | Card header | `y: 8 → 0`, opacity 0 → 1 | 0.5s |
| 5 | Each field | stagger `y: 6 → 0`, opacity 0 → 1, stagger `0.1s` | 0.6s |

### Input Focus:
- `onFocus`: `gsap.to(wrapperRef, { scale: 1.01, duration: 0.12 })`
- `onBlur`: `gsap.to(wrapperRef, { scale: 1, duration: 0.12 })`

---

## Difference Table — Provider Login vs Patient Login vs Doctor Login

| Element | Patient Login | Doctor Login | Provider Login |
|---|---|---|---|
| Active role tab | For Patients | For Doctors | **For Providers** |
| Card background | `#E6D3B3` sand | `#ffffff` white | **`#E6D3B3` sand** |
| Card has large title | Yes | No (subtitle only) | **Yes** |
| Card title text | "Patient Login" | — | **"Provider Login"** |
| Field 1 label | USER ID | USER ID | **PROVIDER ID** |
| Field 1 left icon | Person | Person | **Building/Store** |
| Field 1 placeholder | "Enter your patient ID" | "Enter your doctor ID" | **"Enter your clinic ID / business ID"** |
| Three.js visual | Sphere + torus | Ambient torus rings | **Diagnostic grid rings (3 concentric + spokes)** |
| Left panel hero visual | Three.js sphere | Doctor photo blend | **Provider image card (bottom-left)** |
| Stats / progress element | 99.9% / 24/7 text | 70% circular ring | **None — image card replaces it** |
| Tagline | "The Sanctuary for Your Clinical Journey." | "The Future of Restorative Care." | **"Restoring care through thoughtful design."** |
| State interface | `LoginFormState` | `DoctorLoginFormState` | **`ProviderLoginFormState`** |
| Field key name | `userId` | `doctorId` | **`providerId`** |

---

## What Must Stay Identical to All Other Login Pages

The following must be **pixel-for-pixel consistent** — do not alter:

- Left panel gradient colors and direction
- Navbar structure, logo, nav links, Sign In button style
- Role tab container shape, padding, inactive tab styles
- CTA button shape, color, hover/click/error animations
- Divider style and "OR REGISTER" text
- Social login button size, shape, border, background
- Footer text style, position, and content
- All GSAP timing values and easing functions
- Input border, focus ring color, placeholder color

---

## Rules & Constraints

- No inline styles except the left panel gradient background (one permitted exception)
- Zero `any` types anywhere in TypeScript
- No external UI libraries (no shadcn, MUI, Radix, Framer Motion) — Tailwind + GSAP only
- No real authentication logic — form state is display only
- "Forgot Password?" is a styled link only — no routing or modal
- Social login buttons are UI-only — no OAuth integration
- Role tabs are display-only — "For Providers" is permanently active
- Three.js canvas opacity must stay at `0.25` — ambient only
- Do not modify or reference anything inside `Registration_Page/`

---

## Output Checklist

- [ ] Left panel gradient renders correctly (dark coffee top → burnt orange bottom)
- [ ] Three.js diagnostic grid rings render at low opacity as ambient background
- [ ] Provider image card renders at bottom-left with clinic SVG, warm overlay, and "CLINICAL PROVIDER" strip
- [ ] Provider image card slides up on page load via GSAP
- [ ] "Clinical Sanctuary" top label with decorative underline renders
- [ ] Provider tagline "Restoring care through thoughtful design." renders correctly
- [ ] Subtext renders in small muted text below tagline
- [ ] Copyright text renders at very bottom-left of left panel
- [ ] Navbar is pixel-identical to all other HealthTracker login navbars
- [ ] "For Providers" tab is active (burnt orange pill), others inactive
- [ ] Login card background is **sand** (`#E6D3B3`), compact, `max-w-[320px]`
- [ ] Card shows "Provider Login" title + subtitle
- [ ] PROVIDER ID field renders with building/store left icon + correct placeholder
- [ ] PASSWORD field renders with lock left icon + eye toggle
- [ ] "Forgot Password?" renders right-aligned below password field
- [ ] "Login →" CTA shows loading spinner on click
- [ ] Login button shakes on error state
- [ ] "OR REGISTER" divider renders
- [ ] "Don't have an account? Register" link renders
- [ ] Two social login icon buttons render
- [ ] Footer text renders at very bottom of right panel
- [ ] GSAP load sequence fires in correct order with correct timing
- [ ] `Registration_Page/` folder untouched
- [ ] Zero TypeScript errors
- [ ] Zero console errors

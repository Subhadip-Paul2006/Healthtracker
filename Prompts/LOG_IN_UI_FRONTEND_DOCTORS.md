# HealthTracker — Doctor Login Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Doctor Login Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The page shares the split-panel shell with the Patient Login page, with the following doctor-specific differences: the active role tab is "For Doctors", the left panel features a real doctor photograph blended into the gradient with a 70% circular progress ring, and the Three.js visual is a floating torus ring layered subtly behind the photo. The form card is compact, white, and contains only the essential login fields with no large heading.
Implement this design from Figma.<br>
Figma MCP: @https://www.figma.com/design/zxejwysw660pSV5ZYy1QAY/Healthtracker-UI?node-id=19-272&m=dev <br>
Sample Image : Prompt_Assets/Doctors_Login.png <br>
**Design feel:** Professional · Clinical · Confident · Trustworthy

---

## File Structure

Strictly follow this structure. Do not deviate or add extra files unless listed:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page/                      ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
├── Patients/                       ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
└── Doctors/
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

- `App.tsx` → full split-screen layout, navbar, role tabs, Three.js left panel, doctor photo layer, imports `Form.tsx`
- `Form.tsx` → doctor login form card with all fields, state, and interactions
- No additional component files needed

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel ambient background ring visual |

---

## Color System

Define in `tailwind.config.ts`. Identical to all other HealthTracker pages — never change these values:

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — navbar logo, labels, text
  burnt:   '#D96C2D',   // Burnt Orange — active tab, CTA button, links
  sand:    '#E6D3B3',   // Muted Sand — tab container background
  ivory:   '#FAF7F0',   // Ivory White — right panel, form card background
}
```

---

## Full Page Layout (App.tsx)

```
┌──────────────────────────┬──────────────────────────────────┐
│    LEFT PANEL (50%)      │       RIGHT PANEL (50%)          │
│    Dark-to-orange BG     │  Ivory White BG                  │
│    Three.js ring (bg)    │  Navbar (minimal, top)           │
│    Doctor photo (blended)│  Role Toggle Tabs                │
│    "Clinical Sanctuary"  │  Login Form Card (centered)      │
│    Tagline + subtext     │  Bottom footer text              │
│    70% ring + RESTORATION│                                  │
│    Copyright bottom      │                                  │
└──────────────────────────┴──────────────────────────────────┘
```

- Root: `flex h-screen w-full overflow-hidden`
- Left: `w-1/2 relative flex-shrink-0 flex flex-col overflow-hidden`
- Right: `w-1/2 overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Layered Composition (App.tsx)

The left panel has **four stacked layers** from bottom to top:

```
Layer 0 (z-0): Gradient background div
Layer 1 (z-1): Three.js canvas (subtle, ambient)
Layer 2 (z-2): Doctor photograph with blend overlay
Layer 3 (z-10): Text + UI overlay content
```

---

### Layer 0 — Gradient Background
- `absolute inset-0 z-0`
- Style prop (only permitted inline style): `background: 'linear-gradient(to bottom, #3B2F2F 0%, #7a3010 45%, #D96C2D 100%)'`

---

### Layer 1 — Three.js Canvas (Ambient Background Ring)
- `<canvas>` positioned `absolute inset-0 z-[1] w-full h-full opacity-30`
- Keep opacity low — the Three.js visual is a subtle ambient layer, not the hero visual (the doctor photo is the hero)
- Scene setup:
  - `PerspectiveCamera` — FOV 60, z = 5
  - `AmbientLight` — color `#ffffff`, intensity 0.2
  - `PointLight` — color `#ff8844`, intensity 0.8, position (0, 0, 3)
  - Geometry: `TorusGeometry(2.0, 0.04, 16, 120)` — large outer ring
  - Second: `TorusGeometry(1.4, 0.025, 16, 100)` — inner ring
  - Material: `MeshStandardMaterial`, color `#ff9955`, emissive `#cc4400`, emissiveIntensity `0.7`
  - Animation loop: Y-axis rotation at `0.004` per frame, X-axis tilt at `0.001` per frame

---

### Layer 2 — Doctor Photo with Blend Overlay
- Container: `absolute bottom-0 left-0 right-0 z-[2] h-[65%]`
- Inside: an `<img>` or `<div>` representing the doctor photograph
  - Since no actual image file is provided, create a **realistic CSS-only doctor silhouette** using a `<div>` with:
    - Background: `linear-gradient(to top, #D96C2D40 0%, transparent 60%)` — warm orange tint at bottom fading up
    - Inside that div, render a simplified SVG doctor figure (standing, white coat, stethoscope) as a centered element
    - SVG should be `w-48` wide, positioned at `bottom-0 left-1/2 -translate-x-1/2`
    - SVG fill: `white` at `opacity-25` — the doctor outline is barely visible, merged into the warm background
  - On top of everything: a `<div>` gradient overlay — `absolute inset-0 bg-gradient-to-t from-[#D96C2D]/50 via-transparent to-transparent` to blend the figure into the orange tones
- GSAP on load: fade in from opacity 0 → 1, duration `1.2s`, delay `0.8s`

---

### Layer 3 — Text + UI Overlay Content
- `absolute inset-0 z-10 flex flex-col px-8 py-7`

**Top label:**
- `"Clinical Sanctuary"` — `text-sm font-semibold text-white/90 tracking-wide`
- Decorative underline: `<div className="w-6 h-0.5 bg-white/40 mt-1.5">`

**Main text block (`mt-8`):**
- Heading: `"The Future of Restorative Care."` — `text-3xl font-bold text-white leading-tight`
- Subtext: `"Experience a healthcare interface designed for clarity, professional warmth, and clinical excellence."` — `text-xs text-white/60 mt-3 leading-relaxed max-w-[220px]`

**Circular Progress Ring (`mt-10`):**
- Wrapper: `relative inline-flex items-center justify-center w-16 h-16`
- SVG ring: `viewBox="0 0 64 64"`, `width="64"`, `height="64"`, `className="absolute inset-0"`
  - Background circle: `cx="32" cy="32" r="26"`, `stroke="rgba(255,255,255,0.2)"`, `strokeWidth="4"`, `fill="none"`
  - Progress arc: `cx="32" cy="32" r="26"`, `stroke="white"`, `strokeWidth="4"`, `fill="none"`, `strokeDasharray="163"` (circumference = 2π×26 ≈ 163), `strokeDashoffset="49"` (≈70% filled), `strokeLinecap="round"`, `transform="rotate(-90 32 32)"`
  - Animate `strokeDashoffset` via GSAP: from `163` → `49`, duration `1.8s`, ease `power2.out`, delay `0.6s`
- Center label: `"70%"` — `text-sm font-bold text-white z-10`
- Below ring: `"RESTORATION"` — `text-[9px] tracking-[0.25em] text-white/45 uppercase mt-2`

**Bottom copyright (`absolute bottom-6 left-8`):**
- `"© 2024 RESTORATIVE CARE SYSTEMS"` — `text-[9px] text-white/25 tracking-widest uppercase`

### GSAP — Left Panel Animations
`gsap.timeline()` on mount:
1. Top label: `y: -12 → 0`, opacity 0 → 1, duration `0.5s`
2. Heading: `y: 18 → 0`, opacity 0 → 1, duration `0.7s`, delay `0.2s`
3. Subtext: `y: 12 → 0`, opacity 0 → 1, duration `0.6s`, delay `0.35s`
4. Progress ring container: opacity 0 → 1, duration `0.5s`, delay `0.5s`
5. Progress arc `strokeDashoffset`: `163 → 49`, duration `1.8s`, ease `power2.out`, delay `0.6s`
6. Doctor photo layer: opacity 0 → 1, duration `1.2s`, delay `0.8s`

---

## RIGHT PANEL — Navbar (App.tsx)

**Pixel-identical to Patient Login navbar:**
- `flex items-center justify-between px-8 py-4`
- Logo left: `"HealthTrack"` — `text-lg font-bold text-coffee`
- Nav links: `Find Doctors · Lab Tests · Articles · Trackers` — `text-sm text-coffee/60 flex gap-5 hover:text-coffee transition`
- Right: `"Sign In"` button — `bg-coffee text-white text-sm font-medium rounded-full px-5 py-2 hover:bg-[#2a2020] transition`

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
- `useState<'Patients'|'Doctors'|'Providers'>('Doctors')` — default is **Doctors**
- `useRef` for indicator div
- `useRef<(HTMLButtonElement|null)[]>` array for tab buttons

### GSAP Behavior
- On page load: `gsap.set(indicatorRef, { x: '100%' })` — snap to Doctors, no animation
- On tab click: `gsap.to(indicatorRef, { x: index * 100 + '%', duration: 0.45, ease: 'power3.inOut' })`
- Active tab text scale: `gsap.to(activeTab, { scale: 1.05, duration: 0.3 })`
- Inactive tabs: `gsap.to(inactiveTabs, { scale: 1, duration: 0.3 })`

### Active / Inactive Text
- Active tab: `text-white`
- Inactive tabs: `text-coffee/65 hover:text-coffee`

### Behavior Note
- Tabs are display-only — clicking animates the indicator but does not navigate
---

## Form Card Container (App.tsx)

- `mx-auto w-[82%] max-w-[320px]`
- Card: `bg-white rounded-2xl shadow-lg p-7`
- Note: card background is **white** (`#ffffff`), not sand — this matches the design image which shows a bright white card against the ivory panel background

---

## DOCTOR LOGIN FORM (Form.tsx)

All state via `useState`. No backend. TypeScript interfaces required.

### Card Header
- **No large title** — the design shows only the subtitle at the top of the card
- Subtitle only: `"Access your healthcare dashboard securely"` — `text-xs text-coffee/50 mb-5`

---

### Field 1 — USER ID

- Section label: `"USER ID"` — `text-[10px] font-bold tracking-widest text-coffee/45 uppercase mb-1.5`
- Input container: `relative flex items-center`
- Left icon: person/user SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
- Input: `type="text"`, placeholder `"Enter your doctor ID"`, `pl-8`
- Input styling (see Shared Input Styles)

---

### Field 2 — PASSWORD

- Section label: `"PASSWORD"` — same uppercase label style, `mt-4 mb-1.5`
- Input container: `relative flex items-center`
- Left icon: lock SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
- Input: `type="password"` (toggle-able), placeholder dots `"••••••••"`, `pl-8 pr-9`
- Right: eye icon — `absolute right-3 w-3.5 h-3.5 text-coffee/35 cursor-pointer hover:text-coffee transition`
- State: `useState<boolean>(false)` for visibility

**Forgot Password link (right-aligned below password input):**
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
- Two small square icon buttons:
  - Style: `w-9 h-9 rounded-lg border border-coffee/15 bg-ivory/70 flex items-center justify-center hover:bg-ivory transition cursor-pointer`
  - Button 1: Google `G` SVG icon, `w-4 h-4`
  - Button 2: grid/apps SVG icon, `w-4 h-4 text-coffee/45`

---

### Bottom Footer Text (right panel, very bottom)

- `text-center py-5 mt-auto`
- `"HEALTHTRACKER INC. · HIGH CLINICAL ACCESS"` — `text-[9px] tracking-widest text-coffee/25 uppercase`

---

## Shared Input Styles

All inputs in this form use:

```
w-full bg-[#f0ebe3] border border-coffee/15 rounded-lg px-3 py-2
text-xs text-coffee placeholder:text-coffee/30
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/20
transition-all duration-150
```

Note: input background is `#f0ebe3` — slightly warmer than ivory, giving a faint sand tint that reads as white against the white card. This matches the design's barely-there input fill.

---

## TypeScript Interface (Form.tsx)

```ts
interface DoctorLoginFormState {
  doctorId: string;
  password: string;
  showPassword: boolean;
  isLoading: boolean;
  loginError: boolean;
}
```

---

## GSAP Animations — Full Sequence (App.tsx)

`gsap.timeline()` on mount:

| Step | Target | Animation | Delay |
|---|---|---|---|
| 1 | Navbar | `y: -20 → 0`, opacity 0 → 1, duration `0.5s` | 0s |
| 2 | Role tabs | `y: -10 → 0`, opacity 0 → 1 | 0.2s |
| 3 | Login card | `y: 25 → 0`, opacity 0 → 1, ease `power2.out` | 0.35s |
| 4 | Card subtitle | `y: 8 → 0`, opacity 0 → 1 | 0.5s |
| 5 | Each field | stagger `y: 6 → 0`, opacity 0 → 1, stagger `0.1s` | 0.6s |

### Input Focus:
- `onFocus`: `gsap.to(wrapperRef, { scale: 1.01, duration: 0.12 })`
- `onBlur`: `gsap.to(wrapperRef, { scale: 1, duration: 0.12 })`

---

## Difference Table — Doctor Login vs Patient Login

| Element | Patient Login | Doctor Login |
|---|---|---|
| Active role tab | For Patients | **For Doctors** |
| Card background | `#E6D3B3` (sand) | **`#ffffff` (white)** |
| Card max-width | `max-w-sm` | **`max-w-[320px]`** |
| Card has large title | Yes — "Patient Login" | **No — subtitle only** |
| Field 1 label | USER ID | **USER ID** (same) |
| Field 1 left icon | Person silhouette | **Person silhouette** (same) |
| Field 1 placeholder | "Enter your patient ID" | **"Enter your doctor ID"** |
| Left panel hero visual | Three.js sphere | **Doctor photograph (CSS/SVG blend)** |
| Three.js role | Hero visual | **Ambient background ring (low opacity)** |
| Stats element | 99.9% / 24/7 text stats | **70% circular SVG progress ring** |
| Stats label | "SECURE ACCESS" / "PATIENT SUPPORT" | **"RESTORATION"** |
| Tagline | "The Sanctuary for Your Clinical Journey." | **"The Future of Restorative Care."** |
| Subtext | peace of mind / restorative focus | **clarity / professional warmth / clinical excellence** |
| Input background | `#ddd0b8` | **`#f0ebe3`** |
| State interface | `LoginFormState` | **`DoctorLoginFormState`** |

---

## Rules & Constraints

- No inline styles except the left panel gradient background (one permitted exception)
- Zero `any` types anywhere in TypeScript
- No external UI libraries (no shadcn, MUI, Radix, Framer Motion) — Tailwind + GSAP only
- No real authentication logic — form state is display only
- "Forgot Password?" is a styled link only — no routing or modal
- Social login buttons are UI-only — no OAuth integration
- Role tabs are display-only — "For Doctors" is permanently active
- Three.js canvas opacity must be `0.3` or lower — it is background ambience only, not competing with the doctor photo layer

---

## Output Checklist

- [ ] Left panel gradient renders correctly (dark coffee top → burnt orange bottom)
- [ ] Three.js torus rings render at low opacity as ambient background
- [ ] Doctor photo / silhouette CSS layer renders in bottom 65% of left panel with warm orange blend overlay
- [ ] "Clinical Sanctuary" top label with decorative underline renders
- [ ] Doctor tagline "The Future of Restorative Care." renders correctly
- [ ] Subtext renders in small muted text below tagline
- [ ] 70% circular SVG progress ring animates from 0% → 70% on load
- [ ] "RESTORATION" label renders below the progress ring
- [ ] Copyright text renders at very bottom-left of left panel
- [ ] Navbar is identical to Patient Login navbar
- [ ] "For Doctors" tab is active (burnt orange), others inactive
- [ ] Login card is **white** (not sand), compact, `max-w-[320px]`
- [ ] Card shows **subtitle only** — no large "Doctor Login" heading visible
- [ ] USER ID field renders with person icon + correct placeholder
- [ ] PASSWORD field renders with lock icon + eye toggle
- [ ] "Forgot Password?" renders right-aligned below password field
- [ ] "Login →" CTA shows loading spinner on click
- [ ] Login button shakes on error state
- [ ] "OR REGISTER" divider renders
- [ ] "Don't have an account? Register" link renders
- [ ] Two social login icon buttons render
- [ ] Footer text renders at very bottom of right panel
- [ ] GSAP load sequence fires in correct order
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Pixel-accurate match to design reference image

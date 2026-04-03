# HealthTracker — Service Provider Login Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Service Provider Login Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The page uses the same split-panel shell as all other HealthTracker login pages. The left panel features a full bleed orange gradient background with a provider/doctor photograph blended into the lower portion — no Three.js visual element is visible as a hero; Three.js is a low-opacity ambient layer only. The form card is white, compact, and contains the standard login fields with "Provider Login" as the card title.

**Design feel:** Operational · Professional · Clinical Infrastructure · Trustworthy

---

## File Structure

Strictly follow this structure. Do not add, rename, or remove any files:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page/
├── Patients/
└── Service_Provider/
    ├── Registration_Page/       ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
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

- `App.tsx` → full split-screen layout, navbar, role tabs, Three.js ambient canvas, provider photo layer, text overlay, imports `Form.tsx`
- `Form.tsx` → provider login form card with all fields, state, and interactions
- `Registration_Page/` is an **existing folder** — do not touch, regenerate, or reference anything inside it

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel ambient background ring (very subtle, low opacity) |

---

## Color System

Define in `tailwind.config.ts`. **Identical to all other HealthTracker pages — never change these values:**

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — navbar logo, labels, input text
  burnt:   '#D96C2D',   // Burnt Orange — active tab, CTA, links, accents
  sand:    '#E6D3B3',   // Muted Sand — role tab container background
  ivory:   '#FAF7F0',   // Ivory White — right panel background
}
```

---

## Full Page Layout (App.tsx)

```
┌──────────────────────────┬──────────────────────────────────┐
│    LEFT PANEL (50%)      │       RIGHT PANEL (50%)          │
│    Deep orange gradient  │  Ivory White BG                  │
│    Three.js (ambient)    │  Navbar (minimal, top)           │
│    Provider photo blend  │  Role Toggle Tabs                │
│    "Clinical Sanctuary"  │  Provider Login Form Card        │
│    Tagline + subtext     │  "Don't have an account?" row    │
│    © copyright bottom    │  Social buttons + footer text    │
└──────────────────────────┴──────────────────────────────────┘
```

- Root: `flex h-screen w-full overflow-hidden`
- Left: `w-1/2 relative flex-shrink-0 flex flex-col overflow-hidden`
- Right: `w-1/2 overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Layered Composition (App.tsx)

Four stacked layers, bottom to top:

```
Layer 0 (z-0):   Gradient background div
Layer 1 (z-[1]): Three.js canvas (ambient, opacity-20)
Layer 2 (z-[2]): Provider photo blend (bottom ~38% of panel)
Layer 3 (z-10):  Text overlay content
```

---

### Layer 0 — Gradient Background
- `absolute inset-0 z-0`
- Single permitted inline style: `background: 'linear-gradient(to bottom, #5a1a00 0%, #a03800 35%, #D96C2D 100%)'`
- This produces the deep orange-brown-to-bright-orange gradient visible in the design

---

### Layer 1 — Three.js Canvas (Ambient Only)
- `<canvas>` positioned `absolute inset-0 z-[1] w-full h-full opacity-20`
- Opacity must stay at `0.20` or below — it is invisible ambient texture, not a visual hero
- Scene setup:
  - `PerspectiveCamera` — FOV 60, z = 5
  - `AmbientLight` — color `#ffffff`, intensity 0.15
  - `PointLight` — color `#ff8844`, intensity 0.7, position (0, 0, 3)
  - Geometry: `TorusGeometry(2.0, 0.03, 16, 100)` — single large ring
  - Material: `MeshStandardMaterial`, color `#ff9944`, emissive `#cc4400`, emissiveIntensity `0.5`
  - Animation loop: Y-axis rotation at `0.003` per frame — no floating, no pulse, keep it static and unnoticeable

---

### Layer 2 — Provider Photo Blend (Bottom of Panel)
- Container: `absolute bottom-0 left-0 right-0 z-[2] h-[38%]`
- Since no actual image file is provided, render a **CSS + SVG simulation** of a provider/doctor photograph:
  - Outer div: `w-full h-full relative overflow-hidden`
  - Inner background: `absolute inset-0 bg-gradient-to-b from-transparent via-[#c05010]/30 to-[#8B3010]/60` — this warms and darkens toward the bottom, blending the figure into the orange panel
  - SVG provider figure (standing person in white coat, side profile with tablet/clipboard):
    - Position: `absolute bottom-0 left-6` — slightly left of center, matching the design's composition
    - Width: `w-44`, height auto
    - SVG fill: `white` at `opacity-15` — very subtle, merges with the warm background
    - Keep the SVG simple: rounded rectangle for body/coat, circle for head, a small rectangle for the tablet/clipboard in hand
  - Top gradient fade: `absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-transparent` (ensures seamless blend with the panel above)
- GSAP on load: `y: 25 → 0`, opacity 0 → 1, duration `1s`, delay `0.9s`

---

### Layer 3 — Text Overlay
- `absolute inset-0 z-10 flex flex-col px-8 py-7`

**Top label row:**
- `"Clinical Sanctuary"` — `text-sm font-semibold text-white/90 tracking-wide`
- Decorative underline: `<div className="w-6 h-0.5 bg-white/35 mt-1.5">`

**Main text block (`mt-7 flex-1`):**
- Heading (large, bold, multi-line as in design):
  `"Restoring care through thoughtful design."` — `text-4xl font-bold text-white leading-tight max-w-[260px]`
  - The heading wraps across 3 lines in the design: "Restoring care / through / thoughtful design." — the `max-w` constraint will force this wrapping naturally
- Subtext: `"Join a community of healthcare professionals dedicated to a more humane approach to clinics excellence."` — `text-xs text-white/55 mt-4 leading-relaxed max-w-[220px]`
  - Note: subtext in the design reads slightly differently — match this exact wording

**Bottom copyright (`absolute bottom-6 left-8`):**
- `"© 2024 RESTORATIVE CARE SYSTEMS"` — `text-[9px] text-white/30 tracking-widest uppercase`

### GSAP — Left Panel Animations
`gsap.timeline()` on mount:
1. `"Clinical Sanctuary"` label: `y: -12 → 0`, opacity 0 → 1, duration `0.5s`
2. Heading: `y: 20 → 0`, opacity 0 → 1, duration `0.75s`, delay `0.2s`
3. Subtext: `y: 14 → 0`, opacity 0 → 1, duration `0.6s`, delay `0.38s`
4. Provider photo layer: `y: 25 → 0`, opacity 0 → 1, duration `1s`, delay `0.9s`

---

## RIGHT PANEL — Navbar (App.tsx)

**Pixel-identical to all other HealthTracker login navbars:**
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

- "For Providers" is permanently active on this page — tabs are display-only, no routing needed

---

## Form Card Container (App.tsx)

- `mx-auto w-[82%] max-w-[320px]`
- Card: `bg-white rounded-2xl shadow-lg p-7`
- Card background is **white** (`#ffffff`) — the design shows a bright white card against the ivory right panel. Not sand.

---

## PROVIDER LOGIN FORM (Form.tsx)

All state via `useState`. No backend. TypeScript interfaces required.

### Card Header
- Title: `"Provider Login"` — `text-xl font-bold text-coffee`
- Subtitle: `"Access your healthcare service dashboard securely"` — `text-xs text-coffee/50 mt-1 mb-5`

---

### Field 1 — USER ID

- Section label: `"USER ID"` — `text-[10px] font-bold tracking-widest text-coffee/45 uppercase mb-1.5`
- Input container: `relative flex items-center`
- Left icon: person/user SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
- Input: `type="text"`, placeholder `"Enter your provider ID"`, `pl-8`
- Standard input styling (see Shared Input Styles)

---

### Field 2 — PASSWORD

- Section label: `"PASSWORD"` — same uppercase label style, `mt-4 mb-1.5`
- Input container: `relative flex items-center`
- Left icon: lock SVG — `absolute left-3 w-3.5 h-3.5 text-coffee/35`
- Input: `type="password"` (toggle-able), placeholder dots `"••••••••"`, `pl-8 pr-9`
- Right eye icon: `absolute right-3 w-3.5 h-3.5 text-coffee/35 cursor-pointer hover:text-coffee transition`
- State: `useState<boolean>(false)` for visibility toggle

**Forgot Password link (right-aligned, below password input):**
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
- On error (`loginError === true`): GSAP shake — `gsap.to(btnRef.current, { keyframes: { x: [-5, 5, -4, 4, 0] }, duration: 0.35 })`

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

### Social Login Buttons (UI only — no logic)

- `flex justify-center gap-2.5 mt-3.5`
- Two small square icon buttons — **identical across all login pages:**
  - Style: `w-9 h-9 rounded-lg border border-coffee/15 bg-ivory/70 flex items-center justify-center hover:bg-ivory transition cursor-pointer`
  - Button 1: Google `G` SVG icon, `w-4 h-4`
  - Button 2: grid/apps SVG icon, `w-4 h-4 text-coffee/45`

---

### Bottom Footer Text (right panel, very bottom)

- `text-center py-5 mt-auto`
- `"HEALTHTRACKER INC. · HIGH CLINICAL ACCESS"` — `text-[9px] tracking-widest text-coffee/25 uppercase`

---

## Shared Input Styles

All inputs use this exact class set:

```
w-full bg-[#f0ebe3] border border-coffee/15 rounded-lg px-3 py-2
text-xs text-coffee placeholder:text-coffee/30
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/20
transition-all duration-150
```

Input background `#f0ebe3` gives a subtle warm tint inside the white card, matching the design's barely-visible input fill.

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

`gsap.timeline()` on mount — **same timing as all other HealthTracker login pages:**

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

## Three-Way Difference Table

| Element | Patient Login | Doctor Login | Provider Login |
|---|---|---|---|
| Active role tab | For Patients | For Doctors | **For Providers** |
| Card background | `#E6D3B3` sand | `#ffffff` white | **`#ffffff` white** |
| Card title | "Patient Login" | None (subtitle only) | **"Provider Login"** |
| Field 1 label | USER ID | USER ID | **USER ID** |
| Field 1 left icon | Person | Person | **Person** |
| Field 1 placeholder | "patient ID" | "doctor ID" | **"provider ID"** |
| Left panel hero | Three.js sphere | Doctor photo blend | **Provider photo blend** |
| Three.js opacity | High (hero) | 0.20 (ambient) | **0.20 (ambient)** |
| Stats element | 99.9% / 24/7 text | 70% SVG ring | **None** |
| Tagline | "The Sanctuary for Your Clinical Journey." | "The Future of Restorative Care." | **"Restoring care through thoughtful design."** |
| Subtext | peace of mind / focus | clarity / warmth | **humane approach to clinics excellence** |
| Photo placement | No photo | Bottom 65%, full bleed | **Bottom 38%, left-offset** |
| Copyright | "RESTORATIVE CARE SYSTEMS" | same | **same** |
| State interface | `LoginFormState` | `DoctorLoginFormState` | **`ProviderLoginFormState`** |
| Field key | `userId` | `doctorId` | **`providerId`** |

---

## What Must Stay Identical Across All Login Pages

Do not alter any of the following — they must be pixel-consistent:

- Left panel gradient color values and direction
- Navbar structure, logo style, nav links, Sign In button
- Role tab container shape (`rounded-full bg-sand p-1`), padding, inactive tab styles
- CTA button shape, color (`bg-burnt`), text size, hover/click/error animations
- Divider style and "OR REGISTER" label
- Social login button size (`w-9 h-9`), shape, border, background
- Right panel footer text content and styling
- All GSAP timeline timing and easing values
- Input border, focus ring color, placeholder opacity

---

## Rules & Constraints

- No inline styles except the left panel gradient (one permitted exception)
- Zero `any` types in TypeScript — use the interface from `Form.tsx`
- No external UI libraries (no shadcn, MUI, Radix, Framer Motion) — Tailwind + GSAP only
- No real authentication logic — form state is display only
- "Forgot Password?" is a styled link only — no routing or modal
- Social login buttons are UI-only — no OAuth
- Role tabs are display-only — "For Providers" is permanently active
- Three.js canvas opacity must be `0.20` or lower — it is ambient background only
- `Registration_Page/` folder must not be touched, regenerated, or referenced

---

## Output Checklist

- [ ] Left panel gradient renders as deep orange-brown top to bright orange bottom
- [ ] Three.js torus ring renders at `opacity-20` as ambient background
- [ ] Provider photo CSS/SVG layer renders in bottom 38% of left panel, left-offset, warm tint blended
- [ ] Provider photo layer slides up on page load via GSAP (delay 0.9s)
- [ ] "Clinical Sanctuary" top label with decorative underline renders
- [ ] Heading "Restoring care through thoughtful design." wraps naturally across 3 lines
- [ ] Subtext renders in small muted text below heading
- [ ] "© 2024 RESTORATIVE CARE SYSTEMS" renders at very bottom-left of left panel
- [ ] Navbar is pixel-identical to all other HealthTracker login navbars
- [ ] "For Providers" tab is active (burnt orange pill), others inactive
- [ ] Login card is **white** (`#ffffff`), compact `max-w-[320px]`, with shadow
- [ ] Card shows "Provider Login" title + subtitle
- [ ] USER ID field has person left icon + placeholder "Enter your provider ID"
- [ ] PASSWORD field has lock left icon + eye toggle on right
- [ ] "Forgot Password?" right-aligned below password field in burnt orange
- [ ] "Login →" CTA full-width, burnt orange, shows loading spinner on click
- [ ] Login button shakes on error state
- [ ] "OR REGISTER" divider renders between CTA and register link
- [ ] "Don't have an account? Register" link renders
- [ ] Two social login icon buttons render
- [ ] Right panel footer text renders at very bottom
- [ ] GSAP page load sequence fires in correct order with correct timing
- [ ] `Registration_Page/` folder is completely untouched
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Pixel-accurate match to design reference image

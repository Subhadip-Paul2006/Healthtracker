# HealthTracker — Patient Registration Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

**Figma Source:** https://www.figma.com/design/zxejwysw660pSV5ZYy1QAY/Healthtracker-UI?node-id=1-2&m=dev
> **Prompt engineered for:** Maximum fidelity, production-grade output, world-class animation & UX
## Objective
<img src = "Prompt_Assets/HealthTrack_Patient_Registration.png">
Build the **Patient Registration Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The page is split into two panels: a dark animated left visual panel and a light scrollable registration form on the right.

**Design feel:** Premium · Clinical · Modern · Trustworthy

---

## File Structure

Strictly follow this structure. Do not deviate:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page
└── Patients/
    └── Registration_Page/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            └── components/
                └── Form.tsx....
```

- `App.tsx` → handles the full split-screen layout, navbar, role tabs, Three.js left panel, and imports `Form.tsx`
- `Form.tsx` → contains all form sections and CTA logic
- No additional files unless absolutely required for Three.js canvas separation

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode, no `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel 3D visual canvas |

---

## Color System

Define these in `tailwind.config.ts` as custom colors:

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — text, labels
  burnt:   '#D96C2D',   // Burnt Orange — CTA, active states, focus rings
  sand:    '#E6D3B3',   // Muted Sand — form card background
  ivory:   '#FAF7F0',   // Ivory White — right panel page background
}
```

Use these token names consistently across all Tailwind classes.

---

## Full Page Layout (App.tsx)

```
┌─────────────────────┬──────────────────────────────────────┐
│   LEFT PANEL (40%)  │         RIGHT PANEL (60%)            │
│   Dark gradient BG  │  Ivory White BG                      │
│   Three.js canvas   │  Navbar (top)                        │
│   Overlay text      │  Role Toggle Tabs                    │
│   Feature badges    │  Registration Form Card              │
│                     │  Footer                              │
└─────────────────────┴──────────────────────────────────────┘
```

- Root container: `flex h-screen w-full overflow-hidden`
- Left: `w-[40%] relative flex-shrink-0`
- Right: `w-[60%] overflow-y-auto bg-ivory flex flex-col`

---

## LEFT PANEL — Three.js + Overlay (App.tsx)

### Background
- Full panel background: CSS gradient from `#1a0f0f` (top) → `#3B2F2F` (mid) → `#8B4513` (bottom)
- Apply as Tailwind arbitrary value or a `style` prop (only acceptable inline style usage)

### Three.js Canvas
- Mount a `<canvas>` filling the entire left panel
- Position: `absolute inset-0 z-0`
- Three.js setup:
  - `PerspectiveCamera` — FOV 60, positioned at z=4
  - `AmbientLight` — color `#ffffff`, intensity 0.4
  - `PointLight` — color `#D96C2D`, intensity 1.2, position (2, 3, 4)
  - Geometry: `SphereGeometry(1.2, 64, 64)` with `MeshStandardMaterial`, color `#5a9ea0`, roughness 0.3, metalness 0.6
  - Animation loop: rotate Y-axis at 0.003 per frame + `Math.sin(elapsed) * 0.15` floating on Y position

### Overlay (above canvas, `z-10`)

Centered vertically in the lower half of the left panel:

**Medical character card** (matches design — dark rounded card):
- Rounded card: `rounded-2xl bg-[#0d1f1f]/80 backdrop-blur-sm border border-white/10`
- Size: approximately `w-72 h-72` centered
- Inside: a glowing circular avatar area (use a `div` with radial gradient `from-[#5a9ea0]/40 to-transparent`, size `w-40 h-40`, `rounded-full`, centered) — this represents the 3D figure placeholder
- Card label below avatar: `"CLINICAL SANCTUARY"` — uppercase, `text-xs tracking-[0.3em] text-white/60`

**Text block below the card:**
- Heading: `"Your Health. Tracked. Trusted."` — `text-3xl font-bold text-white text-center leading-tight`
- Subtext: `"Join the next generation of clinical management and wellness monitoring tailored for high-precision care."` — `text-sm text-white/70 text-center mt-3 px-6`

**Feature Badges Row** (3 badges, horizontal, centered below subtext):
Each badge is a small rounded pill/card with icon + label:
- Badge style: `bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10`
- Icon: SVG icon (Shield for SECURE, Chart for REAL-TIME, Heart for VITALITY) — `w-5 h-5 text-white`
- Label: uppercase `text-[10px] tracking-widest text-white/70`
- Three badges: **SECURE · REAL-TIME · VITALITY**

### GSAP — Left Panel Animations
- On mount: slide in the overlay `div` from `x: -40` to `x: 0`, opacity 0 → 1, duration 1s, ease `power3.out`
- Badges: stagger fade-in with `stagger: 0.15` after the overlay animation

---

## RIGHT PANEL (App.tsx)

### Navbar
- `flex items-center justify-between px-10 py-4 border-b border-sand`
- Logo left: `"HealthTrack"` — `text-xl font-bold text-coffee`
- Nav links: `Find Doctors · Lab Tests · Articles · Trackers` — `text-sm text-coffee/70 hover:text-coffee`
- Right: `"Sign In"` button — `bg-coffee text-white rounded-full px-5 py-2 text-sm font-medium`

### Role Toggle Tabs
- Centered below navbar, `mt-6`
- Container: `inline-flex bg-sand rounded-full p-1`
- Three buttons: `For Patients · For Doctors · For Providers`
- Active (Patients): `bg-burnt text-white rounded-full px-6 py-2 text-sm font-semibold`
- Inactive: `text-coffee/70 px-6 py-2 text-sm` (no background)
- Tabs are display-only — no routing needed, Patient is always active on this page

### Form Card Container
- `mx-auto mt-8 mb-12 w-[90%] max-w-2xl`
- Card: `bg-sand rounded-2xl shadow-xl p-8`

---

## FORM COMPONENT (Form.tsx)

Import and render inside the right panel card. All form state via `useState`. No backend. TypeScript interfaces for all state shapes.

### Card Header
- Title: `"Create Your Patient Account"` — `text-2xl font-bold text-coffee`
- Subtitle: `"Join over 10k users in the health sanctuary."` — `text-sm text-coffee/60 mt-1`

---

### Section 1 — BASIC INFO

Section label: `"BASIC INFO"` — `text-[11px] font-semibold tracking-widest text-coffee/50 uppercase mt-6 mb-3`

**Row 1:** First Name | Last Name (2-column grid)
- Label: `"First Name"` / `"Last Name"`
- Input: placeholder `"John"` / `"Doe"`

**Row 2:** Gender (left) | Date of Birth (right)
- Gender: Three toggle buttons side by side — `Male · Female · Other`
  - Active: `bg-white border border-burnt text-coffee font-semibold rounded-lg px-4 py-2`
  - Inactive: `bg-transparent border border-coffee/20 text-coffee/60 rounded-lg px-4 py-2`
  - State: `useState<'Male'|'Female'|'Other'>('Male')`
- Date of Birth: `<input type="date">` with placeholder style `"mm/dd/yyyy"`

---

### Section 2 — CONTACT DETAILS

**Row:** Mobile Number | Email Address (2-column grid)

- Mobile: prefix `+91` in a joined box
  - Container: `flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-ivory`
  - Prefix: `px-3 py-2 bg-ivory border-r border-coffee/20 text-coffee text-sm font-medium`
  - Input: `flex-1 px-3 py-2 bg-ivory outline-none text-coffee text-sm`, placeholder `"98765 43210"`
- Email: standard input, placeholder `"john.doe@example.com"`

---

### Section 3 — LOCATION

Section header row: `"LOCATION"` label left + `"Pick on Map"` link right
- Pick on Map: burnt orange text, map pin icon prefix, `text-sm text-burnt cursor-pointer`

**Address Line** — full width, placeholder `"Street, Building, Apartment"`

**Row:** State (dropdown) | District (dropdown)
- State dropdown default: `"Maharashtra"` with a chevron icon
- District dropdown default: `"Mumbai Suburban"` with chevron icon
- Dropdown style: `appearance-none bg-ivory border border-coffee/20 rounded-lg px-4 py-2 text-coffee text-sm w-full`

**Row:** City / Village | Pincode
- City placeholder: `"Enter locality"`
- Pincode placeholder: `"400001"`

---

### Section 4 — ACCOUNT SETUP

**Row:** Password | Confirm Password (2-column grid)

- Password:
  - Input type: `password` with eye icon toggle (show/hide)
  - Eye icon: positioned absolute right inside input, `cursor-pointer text-coffee/40`
  - State: `useState(false)` for visibility toggle
- Confirm Password: same pattern, independent toggle

**OTP Verification** — centered below passwords, full width
- Label: `"OTP Verification"` — `text-sm font-medium text-coffee text-center mb-3`
- 6 individual input boxes in a row, centered:
  - Each box: `w-11 h-11 text-center text-lg border border-coffee/20 rounded-lg bg-[#d9d0c0] focus:border-burnt focus:ring-1 focus:ring-burnt outline-none`
  - Auto-advance focus to next box on input, backspace goes to previous
  - State: `useState<string[]>(Array(6).fill(''))`

---

### Section 5 — Terms & CTA

**Checkbox row:**
- `<input type="checkbox">` + label: `"I agree to the "` + `<a>Terms & Conditions</a>` + `" and "` + `<a>Privacy Policy</a>`
- Links: `text-burnt underline cursor-pointer`
- Checkbox: styled with Tailwind accent color (`accent-burnt`)

**Send OTP Button:**
- Full width: `w-full`
- Style: `bg-burnt hover:bg-[#c05a20] text-white font-semibold text-base py-3 rounded-xl transition-all duration-200`
- Text: `"Send OTP"`
- On click: console.log form state + brief loading state (spinner icon replaces text for 1.5s)

---

## Input Component — Shared Styling

All standard text inputs share this Tailwind class set:
```
w-full bg-ivory border border-coffee/20 rounded-lg px-4 py-2.5
text-sm text-coffee placeholder:text-coffee/40
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/30
transition-all duration-150
```

---

## GSAP Animations (App.tsx + Form.tsx)

### Page Load Sequence (useEffect, runs once on mount):
1. Navbar: fade in from `y: -20`, opacity 0 → 1, duration 0.5s
2. Role tabs: fade in from `y: -10`, delay 0.3s
3. Form card: fade in from `y: 30`, opacity 0 → 1, duration 0.7s, ease `power2.out`, delay 0.4s

### Input Interactions:
- On focus: `gsap.to(inputRef.current, { scale: 1.01, duration: 0.15 })`
- On blur: `gsap.to(inputRef.current, { scale: 1, duration: 0.15 })`

### CTA Button:
- `onMouseEnter`: `gsap.to(btnRef, { scale: 1.02, duration: 0.15 })`
- `onMouseLeave`: `gsap.to(btnRef, { scale: 1, duration: 0.15 })`

---

## Footer (App.tsx, bottom of right panel)

- `border-t border-sand mt-auto py-6 px-10`
- Left: `"HealthTrack"` logo text
- Center links: `Privacy Policy · Terms of Service · Help Center` — `text-xs text-coffee/50`
- Right: `"© 2024 HEALTHTRACK CLINICAL SANCTUARY."` — `text-xs text-coffee/40 text-right`

---

## TypeScript Interfaces

Define in `Form.tsx`:

```ts
interface PatientFormState {
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  mobile: string;
  email: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  password: string;
  confirmPassword: string;
  otp: string[];
  agreed: boolean;
}
```

---

## Rules & Constraints

- No inline styles except for Three.js canvas gradient background (one exception)
- No `any` types anywhere in TypeScript
- No external UI libraries (no shadcn, no MUI, no Radix) — Tailwind only
- No backend calls, no API integration
- OTP verification is UI-only — no SMS/email logic
- "Pick on Map" is a styled link only — no map API
- State and District dropdowns have a few hardcoded options — no API needed
- Keep `Form.tsx` focused on form only; layout/nav/three.js stays in `App.tsx`

---

## Output Checklist

- [ ] Three.js sphere renders and animates on left panel
- [ ] GSAP page load sequence fires correctly
- [ ] All 5 form sections render with correct layout (2-col grids where shown)
- [ ] Gender toggle works with active state
- [ ] Password show/hide toggles work independently
- [ ] OTP boxes auto-advance and backspace correctly
- [ ] Send OTP button shows brief loading state on click
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Fully matches the design reference image
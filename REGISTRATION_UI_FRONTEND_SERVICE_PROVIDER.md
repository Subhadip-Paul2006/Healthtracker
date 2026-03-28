# HealthTracker — Service Provider Registration Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Service Provider Registration Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The page uses the same split-panel shell as the Patient and Doctor pages, but with a unique left-panel Three.js visual (ECG pulse ring) and a dedicated provider registration form on the right.

**Design feel:** Premium · Clinical · Modern · Trustworthy

---

## File Structure

Strictly follow this structure:

```
Healthtracker/
├── Home Page/
├── Prompts.md
├── Patients/
└── Providers/
    └── Registration_Page/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            ├── components/
            │   └── ProviderForm.tsx
            └── types/
                └── index.ts
```

- `App.tsx` → full split-screen layout, navbar, role tabs, Three.js left panel, imports `ProviderForm.tsx`
- `ProviderForm.tsx` → all form sections, state management, CTA logic
- `types/index.ts` → all TypeScript interfaces and types

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel ECG ring visual canvas |

---

## Color System

Define these in `tailwind.config.ts` as custom colors:

```ts
colors: {
  coffee:  '#3B2F2F',   // Dark Coffee — text, labels, footer background
  burnt:   '#D96C2D',   // Burnt Orange — CTA, active chips, section headers, links
  sand:    '#E6D3B3',   // Muted Sand — form card background, input fills
  ivory:   '#FAF7F0',   // Ivory White — right panel page background
}
```

Use these token names consistently across all Tailwind classes throughout both files.

---

## Full Page Layout (App.tsx)

```
┌────────────────────────┬─────────────────────────────────────┐
│   LEFT PANEL (40%)     │        RIGHT PANEL (60%)            │
│   Dark gradient BG     │  Ivory White BG                     │
│   Three.js ECG canvas  │  Navbar (top, minimal)              │
│   ECG card overlay     │  Role Toggle Tabs                   │
│   Tagline + subtext    │  Provider Registration Form Card    │
│                        │  "Already have an account?" row     │
│                        │  Dark Footer                        │
└────────────────────────┴─────────────────────────────────────┘
```

- Root container: `flex h-screen w-full overflow-hidden`
- Left panel: `w-[40%] relative flex-shrink-0`
- Right panel: `w-[60%] overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Three.js + Overlay (App.tsx)

### Background
- Full panel gradient (top-dark to bottom-orange): `#1a0a00` → `#3B2F2F` → `#8B4010`
- Apply via `style` prop on the left panel `div` as a single `background` CSS string (only permitted inline style)

### Three.js Canvas
- `<canvas>` filling the entire left panel: `absolute inset-0 z-0 w-full h-full`
- Three.js scene:
  - `PerspectiveCamera` — FOV 60, z = 5
  - `AmbientLight` — color `#ffffff`, intensity 0.2
  - `PointLight` — color `#00e5cc`, intensity 1.5, position (0, 0, 3)
  - Geometry: `TorusGeometry(1.4, 0.03, 16, 200)` — the outer ECG circle ring
  - Second Torus: `TorusGeometry(1.1, 0.015, 16, 200)` — inner ring, slightly smaller
  - Material: `MeshStandardMaterial` with `emissive: '#00e5cc'`, `emissiveIntensity: 1.2`, `color: '#00e5cc'`
  - ECG line: `BufferGeometry` with a sine-wave-like flat line through the center of the torus, rendered as `Line` with `LineBasicMaterial` color `#00e5cc`
  - Animation loop: slow Y-axis rotation at `0.004` per frame; rings pulse via `Math.sin(elapsed * 1.5) * 0.04` on scale

### Overlay (above canvas, `z-10`, centered in lower 55% of panel)

**ECG Visual Card** (matches design — dark rounded card with the glowing ECG ring inside):
- Card: `rounded-2xl bg-[#0d2020]/70 backdrop-blur-md border border-[#00e5cc]/20 w-64 h-64 flex items-center justify-center mx-auto`
- Inside the card: the Three.js canvas IS this area — the canvas is clipped/framed by the card's visual border. Achieve this by placing the card as a transparent overlay border on top of the canvas. The canvas renders full-panel; the card is just the framing border div.

**Text block below the card:**
- Heading: `"Your Health. Tracked. Trusted."` — `text-3xl font-bold text-white text-center leading-tight`
- Subtext: `"Empowering providers with precision diagnostics and seamless patient management."` — `text-sm text-white/70 text-center mt-3 px-8 leading-relaxed`

### GSAP — Left Panel Animations
- On mount: overlay div slides in from `x: -50`, opacity 0 → 1, duration 1s, ease `power3.out`
- Card border: fade in with `delay: 0.3`
- Text block: fade in from `y: 20`, `delay: 0.6`

---

## RIGHT PANEL — Navbar (App.tsx)

**Minimal top navbar, no border, no card:**
- Layout: `flex items-center justify-between px-10 py-5`
- Logo left: `"HealthTrack"` — `text-xl font-bold text-coffee`
- Nav links center: `Find Doctors · Lab Tests · Articles · Trackers` — `text-sm text-coffee/60 hover:text-coffee transition`
- Right side: `"Sign In"` plain text link + `"For Patients"` dark pill button
  - Sign In: `text-sm text-coffee/70 hover:text-coffee`
  - For Patients pill: `bg-coffee text-white text-sm font-medium rounded-full px-5 py-2`

---

## Role Toggle Tabs (App.tsx, below navbar)

- Container: `flex justify-center mt-4 mb-8`
- Inner: `inline-flex items-center gap-2 bg-transparent`
- Three tab buttons:

| Tab | State | Style |
|---|---|---|
| For Patients | Inactive | Person icon + label, `text-coffee/60 text-sm px-5 py-2` |
| For Doctors | Inactive | Briefcase icon + label, `text-coffee/60 text-sm px-5 py-2` |
| For Providers | **Active** | Building/store icon + label, `bg-burnt text-white rounded-full px-6 py-2.5 text-sm font-semibold` |

- Tabs are display-only. "For Providers" is permanently active on this page.
- Icons: small SVG icons (person silhouette, briefcase, store/building) left of each label, `w-4 h-4`

---

## Form Card Container (App.tsx)

- `mx-auto w-[88%] max-w-xl`
- Card: `bg-sand rounded-2xl shadow-lg p-8`

---

## PROVIDER REGISTRATION FORM (ProviderForm.tsx)

All state via `useState`. No backend. TypeScript interfaces for all state shapes (defined in `types/index.ts`).

### Card Header
- Title: `"Register Your Health Business"` — `text-2xl font-bold text-coffee`
  - Note: "Health Business" is in bold weight, "Register Your" is slightly lighter — use `font-bold` on the full title but you may split into two `<span>` to replicate the weight variation visible in design
- Subtitle: `"Join our sanctuary of healthcare excellence."` — `text-sm text-coffee/55 mt-1`

---

### Section 1 — BUSINESS INFORMATION

Section label: `"BUSINESS INFORMATION"` — `text-[11px] font-bold tracking-widest text-burnt uppercase mb-4`

**Business Name** — full width
- Label: `"Business Name"` — `text-sm font-medium text-coffee mb-1`
- Input: placeholder `"Enter legal business name"`, full width

**Store Type** — label + 4 chip buttons in a row
- Label: `"Store Type"` — `text-sm font-medium text-coffee mb-2`
- Four chips in `flex flex-wrap gap-3`:
  - `Chemist` · `Pathology` · `Diagnostic` · `Polyclinic`
- Chip base style: `px-5 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-150`
- **Inactive chip**: `border-coffee/25 bg-ivory text-coffee/70 hover:border-burnt/50`
- **Active chip** (Diagnostic is active in design): `bg-burnt border-burnt text-white`
- State: `useState<string>('Diagnostic')` — single select
- GSAP on click: `gsap.to(chipRef, { scale: 0.95, duration: 0.08, yoyo: true, repeat: 1 })`

---

### Section 2 — CONTACT DETAILS

Section label: `"CONTACT DETAILS"` — same burnt orange uppercase style as above

**Row:** Phone Number | Business Email (2-column grid, `grid grid-cols-2 gap-4`)

- Phone Number:
  - Label: `"Phone Number"`
  - Joined input container: `flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-[#ddd0b8]`
  - Prefix box: `px-3 py-2.5 text-sm font-semibold text-coffee border-r border-coffee/20 bg-[#ddd0b8]` — text `"+91"`
  - Input: `flex-1 px-3 py-2.5 bg-[#ddd0b8] outline-none text-sm text-coffee placeholder:text-coffee/40`, placeholder `"9876543210"`

- Business Email:
  - Label: `"Business Email"`
  - Standard input, placeholder `"contact@business.com"`

---

### Section 3 — LOCATION

Section label: `"LOCATION"` — burnt orange uppercase style

**Full Address** — full width
- Label: `"Full Address"`
- `<textarea>` — 3 rows, placeholder `"Suite, Building, Street name"`, `resize-none`
- Style: same input class but `py-3 h-20`

**Row:** State (dropdown) | Pincode (input) — `grid grid-cols-2 gap-4`
- State: `<select>` dropdown, default option text `"Select State"`, chevron icon, placeholder option has value `""`
- Include a few options: Maharashtra, Delhi, Karnataka, Tamil Nadu, West Bengal
- Pincode: text input, placeholder `"Pincode"`, `type="text"` maxLength 6

**Map Placeholder Block** — full width, below the State/Pincode row
- Container: `w-full h-36 rounded-xl overflow-hidden relative mt-2`
- Background: static dark map-like gradient — `bg-gradient-to-b from-[#4a5568] to-[#718096]` with a subtle radial lighter center to mimic a map view
- Center: a map pin SVG icon in `#D96C2D` (Burnt Orange), `w-6 h-6`, absolutely centered
- Bottom-right corner: `"Open Picker"` button — `absolute bottom-3 right-3 bg-white/90 text-coffee text-xs font-medium px-3 py-1.5 rounded-lg shadow cursor-pointer hover:bg-white transition`
- No real map API — this is a static visual placeholder only

---

### Section 4 — VERIFICATION

Section label: `"VERIFICATION"` — burnt orange uppercase style

**Row:** GST Number | Owner Full Name — `grid grid-cols-2 gap-4`
- GST Number: label `"GST Number"`, placeholder `"22AAAAA0000A1Z5"`
- Owner Full Name: label `"Owner Full Name"`, placeholder `"Enter name as per Aadhaar"`

---

### Section 5 — ACCOUNT SETUP

Section label: `"ACCOUNT SETUP"` — burnt orange uppercase style

**Row:** Create Password | Confirm Password — `grid grid-cols-2 gap-4`
- Both are `type="password"` inputs showing dot placeholders (••••••••)
- Labels: `"Create Password"` / `"Confirm Password"`
- Each has show/hide eye icon toggle: `absolute right-3 top-1/2 -translate-y-1/2 text-coffee/40 cursor-pointer w-4 h-4`
- State: two independent `useState<boolean>(false)` for visibility

**OTP Verification** — full width, below passwords
- Label: `"OTP Verification"` — `text-sm font-medium text-coffee mb-3` (no section header style — this is just a field label)
- 6 OTP input boxes in a row, left-aligned (NOT centered — matches design):
  - Each box: `w-12 h-12 text-center text-lg font-medium border-2 border-coffee/15 rounded-xl bg-white/80 focus:border-burnt focus:ring-2 focus:ring-burnt/20 outline-none text-coffee`
  - Gap between boxes: `gap-3`
  - Auto-advance focus on input, backspace moves to previous box
  - State: `useState<string[]>(Array(6).fill(''))`

---

### Section 6 — Terms & CTA

**Terms Checkbox:**
- `flex items-start gap-3 mt-2`
- Checkbox: `w-4 h-4 mt-0.5 accent-burnt rounded`
- Label text (two lines as in design):
  - Line 1: `"I agree to the "` + `<a>Terms of Service</a>` + `" and "` + `<a>Privacy Policy</a>` + `". I certify that all provided information"`
  - Line 2: `"is accurate."`
- Links: `text-burnt underline cursor-pointer hover:text-[#c05a20]`
- Full label: `text-sm text-coffee/70 leading-relaxed`

**CTA Button:**
- Full width, `mt-5`
- Style: `w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-base py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`
- Text: `"Start Your Journey"` + arrow icon `→` (right arrow, `text-lg`)
- On hover: GSAP scale to 1.02
- On click: brief loading state — replace text with a small spinner for 1.5s, then restore

---

### Below Card — Sign In Link

Outside the card, centered below it:
- `text-sm text-coffee/55 text-center mt-4 mb-8`
- Text: `"Already have an account? "` + `<a>Sign In here</a>`
- Link: `text-burnt underline font-medium cursor-pointer`

---

## Footer (App.tsx, bottom of right panel)

Dark full-width footer matching design:
- Background: `bg-coffee`
- Layout: `flex items-start justify-between px-12 py-8`
- Left: `"HealthTrack Sanctuary"` — `text-white font-bold text-base`
- Right: two rows of links
  - Row 1: `PRIVACY POLICY · TERMS OF SERVICE · COOKIE POLICY · ACCESSIBILITY` — `text-white/50 text-xs tracking-wider`
  - Row 2: `"© 2024 HEALTHTRACK CLINICAL SANCTUARY. ALL RIGHTS RESERVED."` — `text-white/35 text-xs mt-2`
- Link hover: `hover:text-white/80 transition`

---

## Shared Input Styling

All standard text/email/number inputs and textarea share this Tailwind class set:

```
w-full bg-[#ddd0b8] border border-coffee/20 rounded-lg px-4 py-2.5
text-sm text-coffee placeholder:text-coffee/40
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/25
transition-all duration-150
```

Note: input background is `#ddd0b8` (a slightly deeper sand than the card background `#E6D3B3`) — this matches the design's visible input fill contrast.

---

## GSAP Animations (App.tsx + ProviderForm.tsx)

### Page Load Sequence (single `useEffect` on mount, `gsap.timeline()`):
1. Navbar: fade in from `y: -20`, opacity 0 → 1, duration `0.5s`
2. Role tabs: fade in from `y: -10`, opacity 0 → 1, delay `0.25s`
3. Form card: fade in from `y: 35`, opacity 0 → 1, duration `0.7s`, ease `power2.out`, delay `0.4s`
4. Form sections: stagger reveal — each section `div` animates from `y: 20`, opacity 0 → 1, stagger `0.08s`, delay `0.7s`

### Input Focus:
- `onFocus`: `gsap.to(el, { scale: 1.01, duration: 0.12 })`
- `onBlur`: `gsap.to(el, { scale: 1, duration: 0.12 })`

### CTA Button:
- `onMouseEnter`: `gsap.to(btnRef.current, { scale: 1.02, duration: 0.15 })`
- `onMouseLeave`: `gsap.to(btnRef.current, { scale: 1, duration: 0.15 })`
- `onClick`: `gsap.to(btnRef.current, { scale: 0.97, duration: 0.08, yoyo: true, repeat: 1 })`

---

## TypeScript Types (types/index.ts)

```ts
export type StoreType = 'Chemist' | 'Pathology' | 'Diagnostic' | 'Polyclinic';

export interface ProviderFormState {
  businessName: string;
  storeType: StoreType;
  phone: string;
  email: string;
  fullAddress: string;
  state: string;
  pincode: string;
  gstNumber: string;
  ownerName: string;
  password: string;
  confirmPassword: string;
  otp: string[];
  agreed: boolean;
}

export interface OTPInputProps {
  otp: string[];
  onChange: (otp: string[]) => void;
}

export interface StoreTypeChipProps {
  label: StoreType;
  active: boolean;
  onClick: (label: StoreType) => void;
}
```

---

## Rules & Constraints

- No inline styles except for the left panel background gradient (one permitted exception)
- Zero `any` types in TypeScript — use the interfaces from `types/index.ts`
- No external UI libraries — Tailwind only (no shadcn, MUI, Radix, etc.)
- No backend calls or real API integration of any kind
- "Open Picker" button is UI-only — no real map API
- State/District dropdowns use hardcoded options — no API
- OTP is UI-only — no SMS or email verification logic
- All form sections must use consistent spacing: `mt-6` between sections
- Keep `ProviderForm.tsx` focused on form only — all layout/nav/three.js stays in `App.tsx`

---

## Output Checklist

- [ ] Three.js ECG torus rings render and animate (rotation + pulse) in left panel
- [ ] ECG glowing card frame overlay renders correctly above canvas
- [ ] GSAP page load sequence fires in correct order
- [ ] Navbar renders with Sign In + "For Patients" pill button
- [ ] Role tabs render with "For Providers" as active (burnt orange pill)
- [ ] Business Name input renders full width
- [ ] Store Type chips render as 4 pills — single select with Burnt Orange active state
- [ ] Contact row renders as 2-column grid with +91 prefix on phone
- [ ] Full Address renders as textarea (3 rows)
- [ ] State dropdown + Pincode render as 2-column row
- [ ] Map placeholder block renders with pin icon + "Open Picker" button
- [ ] GST Number + Owner Full Name render as 2-column row
- [ ] Password fields have independent show/hide toggles
- [ ] OTP boxes (6) auto-advance and backspace correctly, left-aligned
- [ ] Terms checkbox with burnt orange links renders on two lines
- [ ] CTA "Start Your Journey →" button shows loading state on click
- [ ] "Already have an account? Sign In here" renders below card
- [ ] Dark footer renders with HealthTrack Sanctuary + links + copyright
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] Pixel-accurate match to design reference image

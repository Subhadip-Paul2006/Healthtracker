# HealthTracker — Doctor Registration Page
## Frontend Implementation Prompt (React + Vite + TypeScript + Tailwind + GSAP + Three.js)

---

## Objective

Build the **Doctor Registration Page** for HealthTracker — a premium healthcare SaaS platform. The implementation must **pixel-accurately match the provided design reference image**. The left panel is identical to the Patient Registration left panel (same 3D avatar card, same tagline, same feature badges). The right panel contains a long scrollable doctor-specific registration form with 10 structured sections. The role tab shows "For Doctors" as active.

Implement this design from Figma.<br>
Figma MCP of Doctors: @https://www.figma.com/design/zxejwysw660pSV5ZYy1QAY/Healthtracker-UI?node-id=13-444&m=dev<br>
Sample image: Prompt_Assets/Doctors_Registration.png
**Design feel:** Premium · Clinical · Structured · Trustworthy

---

## File Structure

Strictly follow this structure. Do not touch any sibling folders:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page/              ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
├── Patients/               ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
├── Service_Provider/       ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
└── Doctors/
    ├── Log_In/             ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
    └── Registration_Page/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            └── components/
                └── Form.tsx
```

- `App.tsx` → full split-screen layout, navbar, sliding role tabs, Three.js left panel, imports `Form.tsx`
- `Form.tsx` → all 10 form sections, all state, all interactions
- No additional component files — keep everything in these two files

---

## Tech Stack (Strict)

| Tool | Usage |
|---|---|
| React 18 + Vite | Component rendering, app shell |
| TypeScript | Strict mode — zero `any` types |
| Tailwind CSS | All styling — no inline styles, no CSS modules |
| GSAP | Page load animations + micro-interactions |
| Three.js | Left panel 3D glowing doctor avatar visual |

---

## Color System

Define in `tailwind.config.ts`. Never change these values:

```ts
colors: {
  coffee:  '#3B2F2F',
  burnt:   '#D96C2D',
  sand:    '#E6D3B3',
  ivory:   '#FAF7F0',
}
```

---

## Full Page Layout (App.tsx)

```
┌─────────────────────┬──────────────────────────────────────────┐
│   LEFT PANEL (40%)  │           RIGHT PANEL (60%)              │
│   Dark gradient BG  │  Ivory White BG                          │
│   Three.js canvas   │  Navbar (top)                            │
│   Avatar card       │  Sliding Role Toggle Tabs                │
│   Tagline + badges  │  Doctor Registration Form Card           │
│                     │  Footer (bottom)                         │
└─────────────────────┴──────────────────────────────────────────┘
```

- Root: `flex h-screen w-full overflow-hidden`
- Left: `w-[40%] relative flex-shrink-0`
- Right: `w-[60%] overflow-y-auto flex flex-col bg-ivory`

---

## LEFT PANEL — Three.js + Overlay (App.tsx)

**This panel is pixel-identical to the Patient Registration left panel. Reuse the exact same implementation.**

### Background
- Full panel gradient via single inline `style` prop (only permitted inline style):
  `background: 'linear-gradient(to bottom, #1a0f0f 0%, #3B2F2F 40%, #8B4513 100%)'`

### Three.js Canvas
- `<canvas>` filling entire left panel: `absolute inset-0 z-0 w-full h-full`
- Scene:
  - `PerspectiveCamera` — FOV 60, z = 4
  - `AmbientLight` — color `#ffffff`, intensity 0.4
  - `PointLight` — color `#D96C2D`, intensity 1.2, position (2, 3, 4)
  - Geometry: `SphereGeometry(1.2, 64, 64)`, `MeshStandardMaterial` color `#5a9ea0`, roughness 0.3, metalness 0.6
  - Animation: Y-axis rotation `0.003` per frame + `Math.sin(elapsed) * 0.15` floating on Y

### Overlay (`z-10`, centered in lower half)

**Avatar Card** (dark glassy card with glowing circular figure inside):
- `rounded-2xl bg-[#0d1f1f]/80 backdrop-blur-sm border border-white/10 w-64 h-64 flex items-center justify-center mx-auto`
- Inside: radial gradient circle `w-40 h-40 rounded-full` with `bg-[radial-gradient(circle,rgba(90,158,160,0.4),transparent)]` representing the glowing doctor figure
- Card bottom label: `"CLINIAL SACNTOURY"` — `text-xs tracking-[0.3em] text-white/50 uppercase mt-3 text-center`

**Text block below card:**
- Heading: `"Your Health. Tracked. Trusted."` — `text-3xl font-bold text-white text-center leading-tight mt-6`
- Subtext: `"Join the next generation of clinical management and wellness monitoring tailored for high-precision care."` — `text-sm text-white/65 text-center mt-3 px-6 leading-relaxed`

**Feature Badges Row** (`flex gap-3 justify-center mt-6`):
- 3 badges: **SECURE · REAL-TIME · VITALITY**
- Each: `bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex flex-col items-center gap-1 border border-white/10 w-20`
- Icon: SVG (Shield / Chart / Heart), `w-5 h-5 text-white`
- Label: `text-[10px] tracking-widest text-white/60 uppercase`

### GSAP — Left Panel
On mount, `gsap.timeline()`:
1. Avatar card: `x: -40 → 0`, opacity 0 → 1, duration `1s`, ease `power3.out`
2. Text block: `y: 20 → 0`, opacity 0 → 1, delay `0.4s`
3. Badges: stagger `y: 10 → 0`, opacity 0 → 1, stagger `0.15s`, delay `0.7s`

---

## RIGHT PANEL — Navbar (App.tsx)

- `flex items-center justify-between px-10 py-4`
- Logo: `"HealthTrack"` — `text-xl font-bold text-coffee`
- Nav links: `Find Doctors · Lab Tests · Articles · Trackers` — `text-sm text-coffee/60 flex gap-6 hover:text-coffee transition`
- Right: `"Sign In"` — `bg-coffee text-white text-sm font-medium rounded-full px-5 py-2`

---

## Role Toggle Tabs — Sliding Pill Indicator (App.tsx)

### Structure
- Centered wrapper: `flex justify-center mt-6 mb-8`
- Outer container: `relative inline-flex items-center bg-sand rounded-full p-1`
- 3 tab buttons: `For Patients · For Doctors · For Providers`

### Sliding Indicator
- A `<div>` inside the container: `absolute top-1 bottom-1 left-1 rounded-full bg-burnt`
- Width: `calc(33.333% - 2px)`
- Shadow: `shadow-[0_0_12px_rgba(217,108,45,0.45)]`
- No z-index — sits behind text (tab text is `z-10`)

### State & Refs
- `useState<'Patients'|'Doctors'|'Providers'>('Doctors')` — default is **Doctors**
- `useRef` for indicator div
- `useRef<(HTMLButtonElement|null)[]>([])` array for 3 tab buttons

### GSAP Behavior
- On page load: `gsap.set(indicatorRef.current, { x: '100%' })` — snap to Doctors instantly, no animation
- On tab click: `gsap.to(indicatorRef.current, { x: index * 100 + '%', duration: 0.45, ease: 'power3.inOut' })`
- Active tab scale: `gsap.to(activeTabRef, { scale: 1.05, duration: 0.3 })`
- Inactive tabs: `gsap.to(inactiveTabRefs, { scale: 1, duration: 0.3 })`

### Active / Inactive Text
- Active tab: `text-white font-semibold`
- Inactive: `text-coffee/65 hover:text-coffee`

### Behavior Note
- Tabs are display-only — clicking animates indicator only, no page navigation

---

## Form Card Container (App.tsx)

- `mx-auto mt-2 mb-12 w-[90%] max-w-2xl`
- Card: `bg-sand rounded-2xl shadow-xl p-8`

---

## DOCTOR REGISTRATION FORM (Form.tsx)

All state via `useState`. No backend. Strict TypeScript interfaces. All 10 sections scroll inside the right panel.

### Card Header
- Title: `"Welcome Doctor !!!"` — `text-2xl font-bold text-coffee`
- Subtitle: `"Connect and serve patients across India"` — `text-sm text-coffee/55 mt-1`

---

### Section Label Style (shared across all sections)

```
text-[11px] font-bold tracking-widest text-coffee/50 uppercase mt-6 mb-4
```

---

### Section 1 — BASIC INFO

Section label: `"BASIC INFO"`

**Profile Photo Upload** + **Full Name** (side by side, `flex items-start gap-5`):

- Photo upload circle (left):
  - `w-16 h-16 rounded-full bg-[#ddd0b8] border-2 border-coffee/20 flex items-center justify-center relative cursor-pointer flex-shrink-0`
  - Inside: camera SVG icon `w-6 h-6 text-coffee/40` + small text `"photo"` below icon — `text-[9px] text-coffee/40`
  - Edit badge (bottom-right of circle): `absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-burnt flex items-center justify-center`
  - Pencil SVG inside badge: `w-3 h-3 text-white`
  - No real file upload — click triggers `useState` toggle only

- Full Name input (right, `flex-1`):
  - Label: `"Full Name"` — standard field label style
  - Input: placeholder `"Dr. Jane Smith"`

**Gender + Date of Birth** (2-column grid, `grid grid-cols-2 gap-4 mt-3`):
- Gender: `<select>`, placeholder option `"Select Gender"`, options: Male / Female / Other / Prefer not to say
- Date of Birth: `<input type="date">`, placeholder style `"mm/dd/yyyy"`

**Registration Number + Medical Council + Years of Experience** (3-column grid, `grid grid-cols-3 gap-4 mt-4`):

- Registration Number: text input, placeholder `"REG-12345"`
- Medical Council: `<select>`, default `"Select Council"`, options: MCI / State Medical Council / NMC
- Years of Experience — **custom stepper widget**:
  - Label: `"Years of Experience"` — standard label style
  - Container: `flex items-center gap-2`
  - Minus button: `w-8 h-8 rounded-full border border-coffee/25 bg-ivory flex items-center justify-center text-coffee font-bold hover:bg-sand transition cursor-pointer` — text `"−"`
  - Number display: `w-12 text-center font-semibold text-coffee text-sm border border-coffee/20 rounded-lg py-1 bg-ivory`
  - Plus button: same style as minus — text `"+"`
  - State: `useState<number>(5)`, min 0, max 60

---

### Section 2 — CONTACT DETAILS

Section label: `"CONTACT DETAILS"`

**Mobile Number + Alternate Mobile Number** (2-column grid):

Both use the joined prefix pattern:
- Container: `flex items-center border border-coffee/20 rounded-lg overflow-hidden bg-[#ddd0b8]`
- Prefix: `px-3 py-2.5 text-sm font-semibold text-coffee border-r border-coffee/20 bg-[#ddd0b8]` — text `"+91"`
- Input: `flex-1 px-3 py-2.5 bg-[#ddd0b8] outline-none text-sm text-coffee placeholder:text-coffee/40`
- Mobile placeholder: `"98765 43210"` — Alternate placeholder: `"Optional"`

**Email Address** (full width, `mt-4`):
- Placeholder: `"doctor.name@healthtrack.com"`

---

### Section 3 — LOCATION

Section header row: `"LOCATION"` label left + `"Pick on Map"` link right
- Pick on Map: pin icon + `text-sm text-burnt cursor-pointer`

**Address Line** — full width, placeholder `"Clinic/Hospital Address"`

**State + District** (2-column grid):
- State: `<select>`, default `"Select State"`, hardcoded options: Maharashtra / Delhi / Karnataka / Tamil Nadu / West Bengal
- District: `<select>`, default `"Select District"`, dependent on state — use a few hardcoded options per state

**City / Village + Pincode** (2-column grid):
- City placeholder: `"Enter locality"`
- Pincode placeholder: `"400001"`, default value shown

---

### Section 4 — QUALIFICATION

Section label: `"QUALIFICATION"`

**Primary Degree + Additional Degrees** (2-column grid):
- Primary: placeholder `"MBBS"`
- Additional: placeholder `"MD, MS, etc."`

**Specialization** (full width, `mt-4`):
- Label: `"Specialization"` — standard label style
- Selected chips row (`flex flex-wrap gap-2 mb-2`):
  - Each chip: `inline-flex items-center gap-1 bg-burnt text-white text-xs font-medium px-3 py-1 rounded-full`
  - Remove button: `×` — `cursor-pointer hover:bg-[#b85a22] transition ml-1`
  - Default chips showing: `Cardiology ×` and `Internal Medicine ×`
  - State: `useState<string[]>(['Cardiology', 'Internal Medicine'])`
- Add Specialization dropdown below chips:
  - `<select>` with default option `"Add Specialization"`, chevron right-aligned
  - On change: adds selected value to chips array, resets select to default

**Certifications Upload** (full width, `mt-5`):
- Label: `"Certifications Upload"` — standard label
- Upload box: `w-full h-24 border-2 border-dashed border-coffee/25 rounded-xl bg-ivory/50 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 transition`
- Inside: document SVG icon `w-8 h-8 text-coffee/30` + text `"UPLOAD CERTIFICATES"` — `text-xs tracking-wider text-coffee/40 mt-2`

---

### Section 5 — VERIFICATION

Section label: `"VERIFICATION"`

3 equal upload cards in a row (`grid grid-cols-3 gap-4`):

Each card:
- `border border-coffee/20 rounded-xl bg-ivory/60 h-24 flex flex-col items-center justify-center cursor-pointer hover:border-burnt/40 hover:bg-ivory transition`
- Icon: SVG icon (shield/badge for license, ID card for ID proof, building for clinic), `w-7 h-7 text-coffee/40`
- Label below icon in `text-[10px] tracking-widest uppercase text-coffee/50 text-center mt-2`

Card 1: shield icon + `"MEDICAL LICENSE"`
Card 2: ID card icon + `"ID PROOF (AADHAAR/PAN)"`
Card 3: building icon + `"CLINIC REGISTRATION"`

---

### Section 6 — ADDITIONAL INFO

Section label: `"ADDITIONAL INFO"`

**Professional Bio** (full width):
- Label: `"Professional Bio"`
- `<textarea>` — 4 rows, `resize-none`, placeholder `"Tell patients about your expertise..."`

**Languages Spoken + Awards & Recognitions** (2-column grid, `mt-4`):

- Languages Spoken (left):
  - Label: `"Languages Spoken"`
  - Selected language chips row:
    - `English` chip + `Hindi` chip — same burnt orange chip style as Specialization
    - State: `useState<string[]>(['English', 'Hindi'])`
  - Add Language dropdown: `<select>` default `"Add Language"`, options: English / Hindi / Tamil / Telugu / Bengali / Marathi
  - On change: adds to chips, resets select

- Awards & Recognitions (right):
  - Label: `"Awards & Recognitions"`
  - Text input, placeholder `"Best Physician 2023"`

**Linked Pharmacy / Lab** (full width, `mt-4`):
- Label: `"Linked Pharmacy / Lab"`
- Container: `relative flex items-center`
- Left icon: search/magnifying glass SVG — `absolute left-3 w-4 h-4 text-coffee/40`
- Input: `type="text"`, placeholder `"Search for nearby facilities..."`, `pl-9`

---

### Section 7 — ACCOUNT SETUP

Section label: `"ACCOUNT SETUP"`

**Create Password + Confirm Password** (2-column grid):
- Create Password: `type="password"`, eye icon toggle right side
- Confirm Password: `type="password"`, eye icon toggle right side
- Both: independent `useState<boolean>(false)` for show/hide

**OTP Verification** (full width, centered, `mt-5`):
- Label: `"OTP Verification"` — `text-sm font-medium text-coffee text-center mb-3`
- 6 boxes centered: `flex justify-center gap-3`
  - Each: `w-11 h-11 text-center text-base border border-coffee/20 rounded-lg bg-[#d9d0c0] focus:border-burnt focus:ring-1 focus:ring-burnt/30 outline-none text-coffee font-medium`
  - Auto-advance focus on input, backspace moves to previous
  - State: `useState<string[]>(Array(6).fill(''))`
- Resend link below (`text-center mt-3`):
  - `"Don't receive? "` + `<a>Resend OTP</a>`
  - Text: `text-xs text-coffee/55`
  - Link: `text-burnt underline text-xs cursor-pointer hover:text-[#b85a22] transition`

---

### Section 8 — Terms & CTA

**Terms Checkbox** (`flex items-start gap-3 mt-4`):
- Checkbox: `w-4 h-4 mt-0.5 accent-burnt`
- Label (two lines as in design):
  - `"I agree to the "` + `<a>Terms & Conditions</a>` + `" and certify that all medical credentials provided are authentic and valid."`
  - Links: `text-burnt underline cursor-pointer`
  - Full label: `text-sm text-coffee/65 leading-relaxed`

**CTA Button** (`mt-5`):
- `w-full bg-burnt hover:bg-[#b85a22] text-white font-semibold text-base py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2`
- Text: `"Start Your Journey"` + arrow `→`
- GSAP hover: `scale: 1.02`, duration `0.15s`
- GSAP click: `scale: 0.97`, yoyo, repeat 1
- On click: spinner replaces text for 1.5s then restores

---

## Footer (App.tsx, bottom of right panel)

Identical to Patient Registration footer:
- `border-t border-sand mt-auto py-6 px-10 flex items-start justify-between`
- Background: `bg-coffee`
- Left: `"HealthTrack"` — `text-white font-bold`
- Center: `Privacy Policy · Terms of Service · Help Center` — `text-white/50 text-xs flex flex-col gap-1`
- Right: `"© 2024 HEALTHTRACK CLINICAL SANCTUARY."` — `text-white/35 text-xs text-right`

---

## Shared Input Styles

All standard text inputs, selects, and textareas:

```
w-full bg-[#ddd0b8] border border-coffee/20 rounded-lg px-4 py-2.5
text-sm text-coffee placeholder:text-coffee/40
focus:outline-none focus:border-burnt focus:ring-1 focus:ring-burnt/25
transition-all duration-150
```

---

## TypeScript Interfaces (Form.tsx)

```ts
interface DoctorFormState {
  photo: string | null;
  fullName: string;
  gender: string;
  dob: string;
  registrationNumber: string;
  medicalCouncil: string;
  yearsExperience: number;
  mobile: string;
  alternateMobile: string;
  email: string;
  address: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  primaryDegree: string;
  additionalDegrees: string;
  specializations: string[];
  languages: string[];
  bio: string;
  awards: string;
  linkedFacility: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  otp: string[];
  agreed: boolean;
  isLoading: boolean;
}
```

---

## GSAP Animations — Full Sequence (App.tsx)

`gsap.timeline()` on mount:

| Step | Target | Animation | Delay |
|---|---|---|---|
| 1 | Navbar | `y: -20 → 0`, opacity 0 → 1, `0.5s` | 0s |
| 2 | Role tabs | `y: -10 → 0`, opacity 0 → 1 | 0.2s |
| 3 | Form card | `y: 35 → 0`, opacity 0 → 1, ease `power2.out`, `0.7s` | 0.35s |
| 4 | Form sections | stagger `y: 20 → 0`, opacity 0 → 1, stagger `0.07s` | 0.7s |

### Input Focus:
- `onFocus`: `gsap.to(el, { scale: 1.01, duration: 0.12 })`
- `onBlur`: `gsap.to(el, { scale: 1, duration: 0.12 })`

---

## Rules & Constraints

- No inline styles except the left panel gradient (one permitted exception)
- Zero `any` types anywhere
- No external UI libraries — Tailwind + GSAP only
- No backend, no real file upload, no real OTP logic
- "Pick on Map" is a styled link only — no map API
- Stepper min value: 0, max value: 60
- Chip remove: removes item from array state, chips re-render instantly
- Do not touch `Home_Page/`, `Patients/`, `Service_Provider/`, or `Doctors/Log_In/`

---

## Output Checklist

- [ ] Left panel Three.js sphere + glow avatar card renders with "CLINIAL SACNTOURY" label
- [ ] Tagline "Your Health. Tracked. Trusted." renders correctly
- [ ] Three feature badges (SECURE · REAL-TIME · VITALITY) render with icons
- [ ] Navbar renders with logo, nav links, Sign In pill
- [ ] Sliding pill tab defaults to "For Doctors" (gsap.set x: 100%)
- [ ] Tab indicator slides smoothly on click with power3.inOut
- [ ] Card title "Welcome Doctor !!!" + subtitle render
- [ ] Profile photo circle with camera icon + burnt orange edit badge renders
- [ ] Full Name input renders alongside photo upload
- [ ] Gender dropdown + Date of Birth date picker render in 2-col grid
- [ ] Registration Number + Medical Council + Years of Experience stepper render in 3-col grid
- [ ] Stepper −/+ buttons increment/decrement correctly, default value 5
- [ ] Mobile + Alternate Mobile with +91 prefix render in 2-col grid
- [ ] Email input full width renders
- [ ] Location section with "Pick on Map" link renders
- [ ] Address Line full width renders
- [ ] State + District dropdowns in 2-col grid render
- [ ] City + Pincode in 2-col grid render
- [ ] Primary Degree + Additional Degrees in 2-col grid render
- [ ] Specialization chips (Cardiology + Internal Medicine) render with × remove
- [ ] Add Specialization dropdown adds chips on change
- [ ] Certifications Upload dashed box renders with upload icon
- [ ] 3 Verification upload cards in equal 3-col grid render with correct icons and labels
- [ ] Professional Bio textarea renders
- [ ] Language chips (English + Hindi) render with Add Language dropdown
- [ ] Awards & Recognitions input renders alongside Languages
- [ ] Linked Pharmacy/Lab search input with magnifying glass icon renders
- [ ] Create Password + Confirm Password with eye toggles in 2-col grid render
- [ ] 6 OTP boxes centered, auto-advance, backspace navigation works
- [ ] "Don't receive? Resend OTP" link renders below OTP boxes
- [ ] Terms checkbox with burnt orange links renders
- [ ] "Start Your Journey →" CTA full width burnt orange renders
- [ ] CTA shows loading spinner on click
- [ ] Footer renders with dark coffee background, 3-column layout
- [ ] GSAP load sequence fires correctly
- [ ] Zero TypeScript errors
- [ ] Zero console errors
- [ ] No sibling folders touched

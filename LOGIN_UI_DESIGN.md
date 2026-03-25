# HealthTrack — Authentication Page UI Design Brief

> **Role:** Act as a Senior UI/UX Designer with expertise in healthcare SaaS products.
> **Task:** Design a modern, premium, and production-ready **Authentication Page** for a healthcare web application named **"HealthTrack"**.

---

> ⚠️ **IMPORTANT CONSTRAINT**
> This is a **UI/UX Design-only** task.
> **Do NOT generate any code** (HTML, CSS, JS, or otherwise).
> Deliver visual design descriptions, layout specifications, component behavior, spacing rules, and interaction guidelines **only**.

---

## 🎯 Design Objective

Create a **split-layout authentication page** that supports two states:

| State | Default |
|---|---|
| Register | ✅ Active |
| Log In | Inactive (switchable) |

### Design Personality
The UI must feel:
- **Trustworthy** — Medical-grade professionalism; users are handing over health data
- **Premium & Polished** — Startup-level quality; investor-demo ready
- **Approachable** — Friendly, not clinical or cold
- **Modern** — Subtle futuristic cues without being overdone

---

## 🎨 Visual Identity & Style System

### Color Palette

| Role | Color | Hex |
|---|---|---|
| Background Start | Deep Espresso | `#1A1209` |
| Background Mid | Warm Taupe | `#6B5744` |
| Background End | Soft Ivory | `#F5EFE6` |
| Primary Accent | Medical Teal | `#00B4A6` |
| Secondary Accent | Trust Blue | `#2D7DD2` |
| Form Card BG | Pure White / Glassmorphism | `#FFFFFF` / `rgba(255,255,255,0.85)` |
| Text Primary | Deep Charcoal | `#1C1C1E` |
| Text Secondary | Muted Gray | `#6E6E73` |
| Input Border | Light Smoke | `#E0E0E5` |
| Input Focus Ring | Teal Glow | `#00B4A6` at 40% opacity |
| CTA Button | Teal → Blue Gradient | `#00B4A6` → `#2D7DD2` |
| Danger / Error | Soft Red | `#FF453A` |

> **Background Treatment:**
> Apply a subtle **radial or diagonal gradient mesh** across the full page:
> `Deep Espresso → Warm Taupe → Soft Ivory` flowing from bottom-left to top-right.
> Overlay a very faint **noise/grain texture** (3–5% opacity) for depth and premium feel.

---

### Typography

| Element | Font | Weight | Size |
|---|---|---|---|
| Logo | Poppins | 700 Bold | 22px |
| Page Heading | Poppins | 600 SemiBold | 26px |
| Form Labels | Inter | 500 Medium | 14px |
| Input Text | Inter | 400 Regular | 15px |
| CTA Button | Poppins | 600 SemiBold | 15px |
| Helper / Caption | Inter | 400 Regular | 12px |
| Nav Links | Inter | 500 Medium | 14px |

> **Line Heights:** 1.5× for body, 1.2× for headings.
> **Letter Spacing:** +0.3px on labels and button text for readability.

---

### Border Radius & Shadows

| Component | Border Radius |
|---|---|
| Form Card | `24px` (2xl) |
| Input Fields | `12px` (lg) |
| CTA Button | `14px` |
| Toggle Tabs | `999px` (full pill) |
| Navbar Buttons | `999px` (full pill) |
| Illustration Container | `20px` |

| Shadow Level | Usage | CSS Reference |
|---|---|---|
| Soft Lift | Form card | `0 8px 40px rgba(0,0,0,0.12)` |
| Subtle | Input fields on focus | `0 0 0 4px rgba(0,180,166,0.15)` |
| Deep | Floating illustration elements | `0 20px 60px rgba(0,0,0,0.25)` |

---

## 🧭 Navbar — Top Bar

### Layout
Full-width, fixed or sticky, clean horizontal strip.

```
[ HealthTrack Logo ]   [ Find Doctors ]  [ Lab Tests ]  [ Articles ]  [ Trackers ]         [ For Doctors ▾ ]  [ For Providers ▾ ]  [ Log In / Sign Up ]
```

### Specifications

| Element | Style Details |
|---|---|
| Background | White `#FFFFFF` with `1px` bottom border in `#EEEEEE` |
| Logo | Teal accent dot or medical cross icon before "HealthTrack" text |
| Nav Links | Plain text, `#1C1C1E`, hover → teal underline animation |
| Dropdown Buttons (For Doctors / For Providers) | Pill-shaped, outlined border `#E0E0E5`, dropdown chevron icon |
| Log In / Sign Up | Filled pill button, CTA gradient (Teal → Blue), white text |
| Height | `64px` |
| Padding | `0 48px` horizontal |

---

## 🖥️ Main Content — Split Screen Layout

Divide the page into two equal vertical halves below the navbar:

```
┌─────────────────────────────────────────────────────────┐
│  NAVBAR                                                  │
├──────────────────────────┬──────────────────────────────┤
│                          │                              │
│   LEFT PANEL             │   RIGHT PANEL                │
│   (Illustration)         │   (Auth Form Card)           │
│   50% width              │   50% width                  │
│                          │                              │
└──────────────────────────┴──────────────────────────────┘
```

---

## 🟣 Left Panel — Visual / Illustration Section

### Purpose
Build brand trust, convey "connected healthcare", and add visual richness that balances the functional form on the right.

### Layout & Composition

- **Background:** Inherits the page gradient (deep to warm tones)
- **Main Illustration:** A stylized **3D isometric globe** surrounded by floating healthcare UI cards and medical icons
- **Composition style:** Layered depth — background glow → globe → floating elements → foreground icons

### Illustration Elements

| Layer | Element | Style |
|---|---|---|
| Background | Soft radial gradient glow | Teal + Blue, low opacity |
| Core | 3D Globe / planet shape | Blue-teal gradient, smooth shading |
| Floating Cards | Mini UI cards (heart rate, appointment, vitals) | White card, soft shadow, rounded |
| Icons | Stethoscope, pill, ECG line, DNA, shield | Line-art style, teal or white |
| Particles | Small dots, rings, dashes | Low-opacity white, scattered |

### Decorative Details
- Add **2–3 abstract geometric shapes** (circles, arcs) in the background at low opacity for depth
- Subtle **glow halo** behind the globe in teal (`rgba(0,180,166,0.2)`)
- Floating elements should appear **slightly tilted** (10–15°) to suggest motion and dynamism

### Typography on Left Panel
- Headline: `"Healthcare at your fingertips"` — Poppins 600, white, 28px
- Subtext: `"Connect with verified doctors across India"` — Inter 400, light gray, 15px
- Positioned at the **bottom-left** of the panel with generous padding

---

## ⚪ Right Panel — Authentication Form Section

### Card Container
- Centered vertically and horizontally within the right panel
- Width: `460px` (desktop)
- Background: White `#FFFFFF` OR subtle glassmorphism `rgba(255,255,255,0.88)` with `backdrop-filter: blur(20px)`
- Padding: `40px 44px`
- Border: `1px solid rgba(255,255,255,0.5)`
- Shadow: Soft Lift shadow (see shadow table above)

---

### 🔄 Tab Toggle — Register / Log In

Positioned at the very top of the form card.

**Design:**
- Full-width **pill-shaped toggle bar**
- Background track: `#F0F0F5` (light gray)
- Active tab: Sliding pill indicator — CTA gradient fill, white text, subtle shadow
- Inactive tab: No background, muted gray text `#6E6E73`
- Transition: Smooth sliding animation on state switch (`300ms ease`)

```
┌──────────────────────────────────────────┐
│  ●  Register          │     Log In       │
└──────────────────────────────────────────┘
     [Active: Gradient]    [Inactive: Ghost]
```

---

### 📝 Register Form

**Header Block**
- Title: `"Welcome Doctor !!!"` — Poppins 600, 22px, `#1C1C1E`
- Subtitle: `"Communicate with doctors across India"` — Inter 400, 13px, `#6E6E73`
- Small spacing below (16px) before first field

**Form Fields — 2-Column Grid Layout Where Applicable**

| Row | Left Field | Right Field |
|---|---|---|
| 1 | First Name | Last Name |
| 2 | Mobile Number (+91 prefix) | Email |
| 3 | Gender (dropdown) | — (full width or empty) |
| 4 | Create Password | Confirm Password |

**Input Field Specs**

| Property | Value |
|---|---|
| Height | `48px` |
| Border | `1.5px solid #E0E0E5` |
| Border Radius | `12px` |
| Font | Inter 400, 14px, `#1C1C1E` |
| Placeholder | Inter 400, 14px, `#ABABAB` |
| Focus State | Border → Teal `#00B4A6`, glow ring (4px, 15% opacity) |
| Error State | Border → `#FF453A`, small red caption below |
| Left icon | Subtle field-type icon (person, phone, email, lock) in `#ABABAB` |

**Mobile Number Field — Special Handling**
- Left section: `+91` prefix with Indian flag emoji, separated by a `1px` divider
- Dropdown arrow for country code selection
- Right section: Number input

**Gender Dropdown**
- Custom styled (not native browser dropdown)
- Chevron icon on right
- Opens a clean list with: Male, Female, Other, Prefer not to say

**Password Fields**
- Include a **show/hide toggle** eye icon on the right side of each field
- Password strength indicator (subtle colored bar below) — only on "Create Password"

---

### ✅ Terms & Conditions Checkbox

```
[ ✓ ]  I accept the Terms of Service and Privacy Policy
```

| Property | Style |
|---|---|
| Checkbox | Custom styled, teal fill when checked, rounded corners `4px` |
| Label text | Inter 400, 13px, `#6E6E73` |
| Links ("Terms", "Privacy Policy") | Teal `#00B4A6`, underline on hover |

---

### 🔘 Primary CTA Button — "Send OTP"

| Property | Value |
|---|---|
| Width | Full-width (100% of card) |
| Height | `52px` |
| Background | Gradient: `#00B4A6` → `#2D7DD2` (left to right) |
| Text | "Send OTP" — Poppins 600, 15px, White |
| Border Radius | `14px` |
| Hover State | Gradient shifts slightly, `translateY(-2px)`, deeper shadow |
| Active State | Slight scale down `scale(0.98)` |
| Disabled State | `opacity: 0.5`, `cursor: not-allowed` |

---

### 🔗 Secondary Action Links

Placed **below the form card**, centered:

```
Already have an account?  [ Click here ]

Not a Doctor?  [ Click here ]
```

| Property | Style |
|---|---|
| Container | Pill-shaped, `#F0F0F5` background, `8px 24px` padding |
| Plain text | Inter 400, 13px, `#6E6E73` |
| "Click here" | Poppins 600, 13px, Teal `#00B4A6`, no underline (underline on hover) |
| Spacing between the two rows | `12px` |

---

## ✨ Micro-Interaction Design Hints

> These are **design intent notes** for the developer handoff — not to be coded now.

| Interaction | Behavior |
|---|---|
| Tab switch (Register ↔ Login) | Sliding pill transition `300ms ease-in-out`, form fields fade/slide in |
| Input focus | Border color transitions to teal, glow ring expands `200ms` |
| Button hover | Gradient subtly shifts hue, button lifts `2px` with deeper shadow |
| Button click | Scale down `0.98` for `100ms`, then returns |
| Checkbox check | Checkmark draws in with a brief stroke animation |
| Error state | Field shakes horizontally `3px` for `300ms` (gentle nudge) |
| Page load | Form card fades up from `translateY(20px)`, illustration floats in from left |

---

## 📱 Responsive Layout Specifications

### 🖥️ Desktop (1280px+)
- Full split-screen: Left illustration 50% / Right form 50%
- Navbar fully expanded

### 💻 Tablet (768px – 1279px)
- Left panel shrinks to **40%**, right panel **60%**
- Illustration scales down; some floating elements hidden
- Form card width adjusts to fill right panel with `32px` padding

### 📱 Mobile (< 768px)
- **Single column stacked layout:**
  1. Navbar collapses to hamburger menu
  2. Illustration section → **compact banner** at top (150px height, simplified graphic)
  3. Form card takes **full width** below, `16px` horizontal margin
- 2-column field grid collapses to **1 column**
- Font sizes scale down slightly (headings -2px)
- CTA button remains full width

---

## 🏁 Final Design Quality Checklist

Before finalizing, verify against these standards:

- [ ] **Visual Hierarchy** — Eye naturally flows: Navbar → Illustration headline → Form heading → Fields → CTA
- [ ] **Whitespace** — No cramped sections; every component has breathing room
- [ ] **Color Consistency** — All teal and blue accents use the defined palette; no ad-hoc colors
- [ ] **Typography Consistency** — Poppins only for headings/CTAs; Inter only for body/labels
- [ ] **Alignment** — All elements grid-aligned; no orphaned or off-center items
- [ ] **Contrast Ratio** — All text meets **WCAG AA** minimum (4.5:1 for body text)
- [ ] **Premium Feel** — Would pass as a real funded healthcare startup product
- [ ] **Balance** — Illustration and form feel like one cohesive page, not two separate designs

---

*Design Brief Version 1.0 — HealthTrack Authentication Page*
*Prepared for: Senior UI/UX Designer Handoff*

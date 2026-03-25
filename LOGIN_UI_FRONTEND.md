# HealthTrack — Authentication Page · Master Code Prompt

> **Stack:** React 18 · TypeScript · Tailwind CSS · GSAP · Three.js
> **Task:** Build a production-ready, fully animated authentication page for **HealthTrack** — a healthcare web application.

---

## ⚙️ Tech Stack & Versions

| Technology | Version | Purpose |
|---|---|---|
| React | 18+ | UI component architecture |
| TypeScript | 5+ | Type safety across all components |
| Tailwind CSS | 3+ | Utility-first styling system |
| GSAP | 3+ | All animations and transitions |
| Three.js | r160+ | 3D canvas illustration on left panel |
| @gsap/react | latest | GSAP React integration hooks (`useGSAP`) |
| @types/three | latest | Three.js TypeScript types |

---


## 🎨 Design Tokens — Tailwind Config Extension

In `tailwind.config.ts`, extend the theme with the following custom tokens:

```ts
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      espresso:  "#1A1209",
      taupe:     "#6B5744",
      ivory:     "#F5EFE6",
      teal:      { DEFAULT: "#00B4A6", dark: "#008F84", light: "#33C3B8" },
      trust:     { DEFAULT: "#2D7DD2", dark: "#1A5FA8" },
      smoke:     "#E0E0E5",
      muted:     "#6E6E73",
      charcoal:  "#1C1C1E",
    },
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body:    ["Inter", "sans-serif"],
    },
    borderRadius: {
      "2xl": "16px",
      "3xl": "24px",
      "4xl": "32px",
    },
    boxShadow: {
      "card":   "0 8px 40px rgba(0,0,0,0.12)",
      "input":  "0 0 0 4px rgba(0,180,166,0.15)",
      "button": "0 8px 24px rgba(0,180,166,0.35)",
      "deep":   "0 20px 60px rgba(0,0,0,0.25)",
    },
    backgroundImage: {
      "auth-gradient": "linear-gradient(135deg, #1A1209 0%, #6B5744 50%, #F5EFE6 100%)",
      "cta-gradient":  "linear-gradient(90deg, #00B4A6 0%, #2D7DD2 100%)",
    },
  }
}
```

---

## 🔷 TypeScript Interfaces (`types/auth.types.ts`)

Define and export these interfaces. All components must consume them — no `any` types allowed:

```ts
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  mobile: string;
  countryCode: string;
  email: string;
  gender: GenderOption | null;
  password: string;
  confirmPassword: string;
  acceptedTerms: boolean;
}

export interface LoginFormData {
  mobile: string;
  password: string;
}

export type GenderOption = "male" | "female" | "other" | "prefer_not_to_say";

export type AuthTab = "register" | "login";

export interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export interface ValidationErrors {
  [key: string]: string;
}
```

---

## 🌐 Three.js Scene — `HealthGlobe.tsx`

Build a **full-height Three.js canvas** that fills the entire left panel.

### Scene Requirements

```
Scene Setup:
  - Camera: PerspectiveCamera, FOV 60, position z: 5
  - Renderer: WebGLRenderer, alpha: true (transparent bg), antialias: true
  - Resize observer: canvas re-renders on window resize (useEffect cleanup)

Globe (main object):
  - Geometry: SphereGeometry(1.8, 64, 64)
  - Material: MeshPhongMaterial
      color: #1A8C99  (deep teal)
      emissive: #00B4A6 at 0.15
      wireframe: false
      shininess: 80
  - Add a second sphere slightly larger (scale 1.05):
      Material: MeshPhongMaterial, wireframe: true
      color: #00B4A6, opacity: 0.12, transparent: true
      → This creates a subtle wireframe shell effect

Lighting:
  - AmbientLight: #ffffff, intensity 0.4
  - DirectionalLight: #00B4A6, intensity 1.2, position (5, 3, 5)
  - PointLight: #2D7DD2, intensity 0.8, position (-4, -2, -3)

Floating Particles:
  - Create 200 small spheres (SphereGeometry 0.03)
  - Randomly distributed in a 8-unit radius sphere shell
  - Material: MeshBasicMaterial, color #ffffff, opacity 0.6
  - Each particle drifts slowly on its own random orbit path

Orbit Ring:
  - TorusGeometry(2.4, 0.008, 8, 100)
  - Material: MeshBasicMaterial, color #00B4A6, opacity 0.4
  - Rotate ring 20deg on X-axis to appear like a planet ring

Animation Loop (useGlobeScene hook):
  - Globe: slow Y-axis rotation, speed 0.003 per frame
  - Wireframe shell: counter-rotate Y at 0.001 (opposite direction)
  - Orbit ring: rotate Z-axis at 0.002 per frame
  - Particles: each moves on its own oscillating path using sin/cos with time offset
  - Use requestAnimationFrame inside useEffect; cancel on cleanup
```

### GSAP Entrance Animation for Globe
On component mount, use `gsap.from()`:
```
- Globe: scale from 0 → 1, duration 1.4s, ease: "elastic.out(1, 0.5)"
- Particles: staggered fade in, duration 2s, stagger 0.005s
- Orbit ring: rotate from 0 → full, duration 1.8s, ease: "power2.out"
```

---

## 🧩 Component Specifications

---

### `Navbar.tsx`

```
Layout: fixed top, full width, z-50
Height: h-16
Background: bg-white/95 backdrop-blur-md border-b border-smoke

Left: Logo
  - Text "HealthTrack" in font-display font-bold text-xl text-charcoal
  - Small teal circle or cross icon before text (CSS or SVG inline)

Center: Nav links (hidden on mobile, flex on md+)
  - "Find Doctors" | "Lab Tests" | "Articles" | "Trackers"
  - font-body text-sm text-charcoal hover:text-teal transition-colors duration-200

Right: Action buttons
  - "For Doctors ▾" — pill button, border border-smoke, text-sm, rounded-full px-4 py-1.5
  - "For Providers ▾" — same style
  - "Log In / Sign Up" — bg-cta-gradient text-white rounded-full px-5 py-2 font-display font-semibold text-sm

GSAP on mount:
  gsap.from(navRef.current, { y: -80, opacity: 0, duration: 0.8, ease: "power3.out" })
  Stagger children links: gsap.from(".nav-link", { opacity: 0, y: -10, stagger: 0.08, delay: 0.3 })
```

---

### `AuthToggle.tsx`

```
Props: { active: AuthTab; onToggle: (tab: AuthTab) => void }

Container: relative flex w-full bg-gray-100 rounded-full p-1

Sliding indicator:
  - Absolutely positioned div, same height as container minus padding
  - Background: bg-cta-gradient rounded-full shadow-button
  - GSAP: on tab switch, gsap.to(indicatorRef, { x: newX, duration: 0.35, ease: "power2.inOut" })
  - Do NOT use CSS transitions for this — use GSAP exclusively

Tab buttons:
  - Two full-width buttons inside the container
  - Active: text-white font-display font-semibold
  - Inactive: text-muted font-body
  - z-10 relative so text sits above the sliding indicator
```

---

### `FormField.tsx`

```tsx
// Fully typed reusable input
Props: FormFieldProps (from auth.types.ts)

Structure:
  <div className="flex flex-col gap-1.5">
    <label> — font-body font-medium text-sm text-charcoal
    <div className="relative">  ← wrapper for icon + input
      {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">}
      <input
        className="w-full h-12 rounded-xl border border-smoke bg-white
                   pl-10 pr-4 font-body text-sm text-charcoal
                   placeholder:text-gray-400
                   focus:outline-none focus:border-teal focus:shadow-input
                   transition-all duration-200"
      />
    </div>
    {error && <p className="text-red-500 text-xs font-body">{error}</p>}
  </div>

GSAP on error:
  If error is set, run: gsap.to(inputRef.current, { x: [-6, 6, -4, 4, 0], duration: 0.3 })
  → Horizontal shake to signal validation error
```

---

### `RegisterForm.tsx`

```
Layout: flex flex-col gap-4 w-full

Header:
  <h2> "Welcome Doctor !!!" — font-display font-semibold text-2xl text-charcoal italic
  <p> "Communicate with doctors across India" — font-body text-sm text-muted mt-1

2-Column Grid Rows:
  Row 1: <div className="grid grid-cols-2 gap-3">
    - FirstName FormField | LastName FormField

  Row 2: <div className="grid grid-cols-2 gap-3">
    - PhoneField (full custom) | Email FormField

  Row 3:
    - GenderDropdown (full width)

  Row 4: <div className="grid grid-cols-2 gap-3">
    - PasswordField (create) | PasswordField (confirm)

Terms checkbox:
  Custom checkbox with teal fill on check
  Label: "I accept the Terms of Service and Privacy Policy"
  "Terms of Service" and "Privacy Policy" → teal colored, underline on hover

OTPButton:
  Full width, h-13, bg-cta-gradient, rounded-2xl, text-white
  font-display font-semibold text-base tracking-wide

GSAP entrance (triggered when Register tab is active):
  gsap.from(".register-field", {
    opacity: 0, y: 24, stagger: 0.07, duration: 0.5,
    ease: "power2.out", delay: 0.1
  })

GSAP exit (when switching to Login tab):
  gsap.to(formRef.current, { opacity: 0, x: -30, duration: 0.25, ease: "power2.in" })
  → Then switch tab, then entrance animation for LoginForm
```

---

### `OTPButton.tsx`

```
States: idle | loading | success

idle:   "Send OTP" — normal gradient bg
loading: Show spinner (CSS spin animation), text "Sending..."
success: Flash green bg briefly, text "OTP Sent ✓"

GSAP on hover:
  gsap.to(btnRef.current, { scale: 1.02, duration: 0.2 })
  gsap.to(btnRef.current, { boxShadow: "0 12px 32px rgba(0,180,166,0.5)", duration: 0.2 })

GSAP on click:
  gsap.to(btnRef.current, { scale: 0.97, duration: 0.1, yoyo: true, repeat: 1 })
```

---

### `HealthGlobe.tsx` (Three.js Canvas Component)

```tsx
// Mount a <canvas> that fills the entire left panel
// Use useGlobeScene hook to setup and manage Three.js lifecycle
// The canvas must be:
//   - position: absolute, inset-0
//   - z-index: 0 (behind text overlay)
//   - pointer-events: none

// Text overlay positioned at bottom-left (z-10, relative):
//   <h3> "Healthcare at your fingertips"
//        font-display font-semibold text-3xl text-white
//   <p>  "Connect with verified doctors across India"
//        font-body text-sm text-white/70 mt-2

// GSAP entrance for text overlay:
//   gsap.from(textRef.current, { opacity: 0, y: 40, duration: 1, delay: 0.8, ease: "power3.out" })
```

---

## 🔄 Tab Switch Animation Flow (`useAuthToggle.ts`)

This hook must orchestrate the **complete tab transition sequence** using GSAP Timeline:

```ts
// When switching from Register → Login:
const tl = gsap.timeline()
tl.to(currentFormRef, { opacity: 0, x: -40, duration: 0.25, ease: "power2.in" })
  .call(() => setActiveTab("login"))                          // swap content at midpoint
  .from(newFormRef, { opacity: 0, x: 40, duration: 0.3, ease: "power2.out" })

// Toggle indicator: runs in parallel (not inside timeline)
gsap.to(indicatorRef, { x: targetX, duration: 0.35, ease: "power2.inOut" })

// When switching Login → Register: mirror the x directions (-40 / +40 swap)
```

---

## 📐 Full Page Layout (`AuthPage.tsx`)

```tsx
<div className="min-h-screen bg-auth-gradient flex flex-col">

  <Navbar />

  <main className="flex flex-1 pt-16">              {/* pt-16 = navbar height */}

    {/* LEFT PANEL */}
    <div className="hidden lg:flex w-1/2 relative overflow-hidden">
      <HealthGlobe />                                {/* Three.js canvas + text overlay */}
    </div>

    {/* RIGHT PANEL */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div className="w-full max-w-[460px] bg-white/90 backdrop-blur-xl
                      rounded-3xl shadow-card border border-white/50 p-10">

        <AuthToggle active={activeTab} onToggle={handleToggle} />

        <div className="mt-8">
          {activeTab === "register" ? <RegisterForm /> : <LoginForm />}
        </div>

      </div>
    </div>

  </main>

  <SecondaryLinks />   {/* Below the main split, centered */}

</div>
```

---

## 📱 Responsive Behavior

| Breakpoint | Layout Rule |
|---|---|
| `< lg (1024px)` | Left panel hidden. Form takes full width |
| `lg+` | Full split screen 50/50 |
| `< md (768px)` | Navbar collapses to hamburger menu |
| `< sm (640px)` | Form grid collapses to single column, padding reduced to `p-6` |

Tailwind classes to use:
- `hidden lg:flex` — on left panel
- `w-full lg:w-1/2` — on right panel
- `grid grid-cols-1 sm:grid-cols-2` — on 2-column field rows

---

## ✅ Code Quality Rules

Enforce these standards across all files:

```
TypeScript:
  ✅ No `any` types anywhere
  ✅ All props interfaces defined in auth.types.ts
  ✅ useRef typed: useRef<HTMLDivElement>(null)
  ✅ GSAP targets typed: gsap.to(ref.current!, {...})

React:
  ✅ All components are functional with proper FC<Props> typing
  ✅ useEffect cleanup functions for all GSAP animations (gsap.kill / ctx.revert())
  ✅ useGSAP hook from @gsap/react used instead of raw useEffect for GSAP
  ✅ Three.js renderer disposed on unmount: renderer.dispose()

Tailwind:
  ✅ No inline styles except where dynamically computed (e.g. GSAP transform targets)
  ✅ Custom tokens used from tailwind.config.ts (not hardcoded hex in className)
  ✅ Dark mode classes added where applicable

Performance:
  ✅ Three.js animation loop cancelled on component unmount
  ✅ ResizeObserver used for canvas resizing, disconnected on cleanup
  ✅ GSAP timelines stored in refs and killed on cleanup
  ✅ No memory leaks in animation hooks
```

---

## 🚀 Deliverable Checklist

When complete, the following must all work:

- [ ] Page loads with a **staggered entrance animation** (navbar → globe → form card)
- [ ] Three.js globe renders and rotates smoothly with particles
- [ ] Toggle between Register and Login with **smooth GSAP slide transition**
- [ ] All form fields are fully typed and functional with live validation
- [ ] OTP button has hover, click, loading, and success states
- [ ] Password fields have show/hide toggle
- [ ] Mobile layout collapses correctly (no globe, single-column form)
- [ ] Zero TypeScript errors (`tsc --noEmit` passes clean)
- [ ] No `console.error` warnings in browser
- [ ] All GSAP instances properly cleaned up on unmount

---

*Code Prompt Version 1.0 — HealthTrack Authentication Page*
*Stack: React 18 · TypeScript 5 · Tailwind CSS 3 · GSAP 3 · Three.js r160*

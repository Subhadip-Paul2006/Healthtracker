# HealthTracker — Login Page UI Prompt
### Optimized for Figma AI / Stitch AI

---

## 🎯 Task Summary

**Convert** an existing **Service Provider Registration Page** into a **Login Page** by replacing form content only.  
**Preserve** the entire visual design system — layout, spacing, colors, card structure, and component styles — without modification.

---

## 🧱 Base Reference Design

> Use the existing **HealthTracker Service Provider Registration Page** as the source design.

| Property | Value |
|---|---|
| Layout | Two-column split (Left visual panel + Right form card) |
| Left Panel | Full-height image with orange gradient overlay |
| Right Panel | Glassmorphism card (frosted glass effect, rounded corners, drop shadow) |
| Color Theme | Orange accent (`#FF6B35` or equivalent) on dark healthcare background |
| Card Style | Large border-radius, backdrop blur, semi-transparent white fill |
| Typography | Same font family, weight hierarchy, and size scale as registration page |
| Button Style | Solid orange, rounded, full-width, with arrow icon |

---

## ✅ What TO Change

### 1. Heading
```
REMOVE:   "Register Your Health Business"
REPLACE:  "Login to Your Account"
```

### 2. Subheading
```
REMOVE:   [existing registration subtext]
REPLACE:  "Access your healthcare dashboard securely"
```

### 3. Input Fields
Remove all existing form fields. Add **exactly two** input fields using the same field style (rounded borders, soft shadow, icon prefix):

| # | Label | Placeholder Text |
|---|---|---|
| 1 | User ID | Enter your User ID |
| 2 | Password | Enter your Password |

> Apply a **show/hide password toggle icon** inside the Password field (right-aligned).

### 4. Inline Utility Text
- **Forgot Password?** — Small body text, right-aligned, placed directly below the Password field.

### 5. CTA Button
```
REMOVE:   "Start Your Journey →"
REPLACE:  "Login →"
```

### 6. Redirect Link
- Place below the Login button, centered.
- Text: `Don't have an account?` followed by a clickable `Register` link in orange.

---

## ❌ What NOT TO Change

Do **not** modify any of the following:

- [ ] Left panel (image, gradient, brand copy, decorative elements)
- [ ] Card dimensions, border radius, shadow, or blur intensity
- [ ] Color palette (orange accent, dark background, glassmorphism card)
- [ ] Typography system (font, size, weight, line height)
- [ ] Spacing system (padding inside card, gap between fields, margins)
- [ ] Button visual style (only update the label text)
- [ ] Overall page background and ambient effects

> **Rule:** If it is not listed under "What TO Change," it must remain pixel-identical to the source registration page.

---

## 📐 Layout & Spacing Constraints

- Maintain the **same card height** as the registration page — do not shrink it.
- **Vertically center** the two input fields, button, and supporting text within the card.
- Keep **consistent gap** between each element (match the field-to-field spacing from the source).
- Do **not** redistribute or reflow horizontal alignment — keep all elements left-aligned within card padding.

---

## 🎨 Component Style Specifications

### Input Fields
- Rounded corners matching existing fields
- Soft 1px border (low opacity white or light gray)
- Focus state: orange glow / border highlight
- Icon prefix (user icon for User ID, lock icon for Password)

### Button
- Full-width within card
- Solid orange fill
- White label text, medium weight
- Arrow icon (`→`) after label
- Hover state: slight brightness increase or scale micro-animation

### Forgot Password Link
- Font size: small (12–13px)
- Color: muted white or light gray
- Alignment: right
- No underline by default; underline on hover

### Register Redirect
- Font size: body small
- Color: muted white
- "Register" portion: orange, semi-bold

---

## 👥 Role Variant Screens (Optional Extension)

Generate **3 separate artboards** using the identical card layout. Only update heading and subheading per role:

| Variant | Heading | Subheading |
|---|---|---|
| Patient | "Login to Your Account" | "Access your health records securely" |
| Doctor | "Doctor Login" | "Manage your appointments and patients" |
| Service Provider | "Provider Login" | "Access your healthcare dashboard securely" |

> All three artboards must be **visually identical** except for these two text strings.

---

## 🚫 Hard Restrictions

- **No new fields** — strictly two input fields only.
- **No layout restructuring** — two-column split must be preserved.
- **No color changes** — do not introduce new colors or modify existing ones.
- **No functionality or code** — this is a UI/UX design task only.
- **No compression** — do not reduce card size to accommodate fewer fields.
- **No style drift** — every component must match the registration page design system exactly.

---

## 🏁 Expected Output

A **Login Page UI artboard** (or set of 3 role variant artboards) that:

1. Is visually indistinguishable in style from the registration page
2. Contains only the two-field login form with supporting UI elements
3. Feels like a **native screen** within the HealthTracker product ecosystem
4. Passes a visual consistency check against the source registration page

---

*Design system: HealthTracker | Theme: Dark Healthcare + Orange Accent + Glassmorphism*

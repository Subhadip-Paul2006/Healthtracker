## 🎯 Objective

Design a **premium, modern healthcare landing page UI** called **HealthTrack**.

The product sits in the same tier as Practo, Apollo 247, and 1mg — but should feel more  
**startup-polished, visually refined, and forward-looking**.

The design must evoke:
- Clinical trustworthiness (without feeling cold or sterile)
- Warmth and accessibility (it serves real patients)
- Subtle technological sophistication (AI-powered health tools)
- Investment-ready visual maturity

---

## 🎨 COLOR SYSTEM — Dark Warm Palette (60-30-10 Rule)

| Role            | Name           | Hex       | Usage                                              |
|-----------------|----------------|-----------|----------------------------------------------------|
| Dominant (60%)  | Coffee Black   | #120903
| Page BG, navbar, footer, section fills             |
| Secondary (30%) | Graphite Grey  | #2C2C2C   | Cards, surface layers, input backgrounds           |
| Accent (10%)    | Burnt Orange   | #C2410C   | CTAs, active nav, stat numbers, icon badges        |
| Support         | Muted Sand     | #C9A87C   | Borders, subheadings, captions, dividers           |
| Highlight       | Soft Ivory     | #FAF3E0   | Headlines, body text, card text, logo text         |

**Extended Tonal Palette (derived shades — use these for depth):**
- Coffee Black Deep:   `#0A0502` — footer base, darkest surfaces
- Coffee Black Mid:    `#1A0D06` — section alternates, nav background
- Graphite Light:      `#3A3A3A` — card hover state, elevated surfaces
- Graphite Dark:       `#1E1E1E` — card borders, deep panel fills
- Burnt Orange Light:  `#EA580C` — hover glow, button hover state
- Burnt Orange Muted:  `#9A3412` — shadow tone behind orange elements
- Sand Light:          `#E8D5B7` — inactive carousel dots, placeholder text
- Sand Dark:           `#A0845A` — body copy on dark backgrounds
- Ivory Warm:          `#FFF8EE` — testimonial card bg, search card bg
- Ivory Dim:           `#EDE3D0` — secondary card surfaces, tag chips

**Gradient Language:**
- Hero BG:        `linear-gradient(135deg, #120903 0%, #1A0D06 60%, #2C2C2C 100%)`
- Section alt BG: `#1A0D06` — slightly warmer, breaks monotony between sections
- CTA Section:    `linear-gradient(120deg, #C2410C 0%, #EA580C 100%)` — full Burnt Orange
- Graph card inner:`radial-gradient(ellipse at 30% 20%, #1E1E1E, #120903)`
- Footer:         `#0A0502` — deepest Coffee Black
- Section divider line: `linear-gradient(90deg, transparent, #C2410C40, transparent)`

- 
## 🔲 GRID & SPACING SYSTEM

Use an **8pt base spacing grid** throughout:

- Base unit: `8px`
- Section vertical padding: `96px` (12 units)
- Card internal padding: `24px` (3 units)
- Component gap: `24px–32px`
- Max page width: `1280px`, centered with `auto` margins
- Column grid: **12-column** on desktop, 2-col on tablet, 1-col on mobile
- Gutter: `24px` fixed

**Spatial hierarchy rule:**
- H1 sections: 96px top/bottom padding
- Sub-sections: 64px
- Cards: 24px internal padding, 16px gap between
- Inline elements: 8px / 12px gaps

---

## ✍️ TYPOGRAPHY

- **Display / Hero Font**: `DM Serif Display` or `Fraunces` — elegant, medical authority
- **UI / Body Font**: `DM Sans` or `Nunito` — modern warmth, high legibility
- **Mono / Data Font**: `JetBrains Mono` — used only for stats and analytics data

**Type Scale (Desktop):**
- H1: 56px / Bold / Leading: 1.1
- H2: 40px / SemiBold / Leading: 1.2
- H3: 28px / SemiBold
- Body Large: 18px / Regular / Leading: 1.7
- Body: 16px / Regular / Leading: 1.6
- Caption: 13px / Medium / Color: #64748B

**Rules:**
- Never use Inter, Roboto, or Arial
- Avoid center-aligning body copy (left-align all paragraphs)
- Use typographic contrast (weight + size + color) to create hierarchy without needing lines or dividers

---

## 🧩 PAGE STRUCTURE (Detailed, Grid-Accurate)

### 1. 🔝 Navbar
- Position: Sticky, top: 0, z-index high
- Height: 72px
- Background: `rgba(255,255,255,0.85)` with `backdrop-filter: blur(12px)` — glassmorphism nav
- Layout: Logo left | Nav links center | Auth buttons right
- Logo: "HealthTrack" — Blue primary + Green dot or pulse icon on the "H"
- Nav links: Find Doctors | Lab Tests | Articles | Trackers
  - Active state: Blue underline with 2px accent
  - Hover: Smooth color fade, no jarring jumps
- Right section:
  - "For Doctors" + "For Providers" — ghost buttons with border
  - "Log In" — text link
  - "Sign Up" — solid Blue CTA pill button (rounded-full, 40px height)
- Add a subtle `box-shadow: 0 1px 0 #E2E8F0` on scroll

---

### 2. 🦸 Hero Section
- Layout: Full-width, min-height: 560px
- Background: `linear-gradient(135deg, #EFF6FF, #ECFDF5)` with subtle diagonal noise texture overlay
- Content: **Two-column layout** (60% text+search | 40% visual)
  - Left: Headline + subheadline + search bars
  - Right: A layered 3D-depth illustration — a floating phone mockup showing health data, overlaid with floating stat chips (e.g., "❤️ 98bpm", "🩺 Dr. Available Now") at rotated angles

**Headline Suggestion:**
> "Your health, tracked smarter."
> *Sub: Find doctors, book lab tests, and track your vitals — all in one place.*

- **Search Bar Design:**
  - Two pill-shaped inputs in a white card with shadow:
    - 📍 "Search your city..." (with location icon)
    - 🔍 "Search doctor, clinic, or speciality..."
  - One blue "Search" CTA button — rounded, right side of card
  - Entire search group: `border-radius: 16px`, `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`

- **Carousel Indicator:**
  - Dots at the bottom of the right visual area (not the full section)
  - Style: Filled circle for active, hollow ring for inactive — Blue color

---

### 3. 🩺 Services Section
- Section title: Left-aligned "Services Provided" — H2, deep navy
- "View all →" — Small link right-aligned on same row as title
- Layout: **4-column card grid**, equal width

**Each Service Card:**
- White background, `border-radius: 20px`
- `box-shadow: 0 4px 24px rgba(0,0,0,0.06)`
- Image area: 220px height, soft rounded top edges — real lifestyle/medical photography (not clipart)
- Content area: 24px padding
  - Icon badge (colored circle with icon) — top-left corner of image (absolute positioned)
  - Title: H3 weight, deep navy
  - Description: 2-line body text, cool gray
- Hover State (design hint): Translate Y by -6px, shadow deepens — smooth 300ms ease

**Cards:**
- 🎥 Video Consultation — "Available 24×7, Book your slot now"
- 📍 Doctors Near You — "Find doctors nearby, home consultation available"
- 🧪 Lab Tests — "At minimal cost, results at home"
- 📊 Personalized Trackers — "Customize trackers and plan your health"

---

### 4. 📰 Articles Section
- Background: Off-white `#F8FAFC` — contrast from white card section above
- Layout: **2-column** — Left: text + CTA | Right: horizontal scrolling article cards

**Left Column:**
- Label chip: "Expert Insights" — small, green, pill shape
- H2: "Get to know about Health Articles published by experts"
- Body: 2–3 lines of supporting copy
- "Read All Articles" — Blue outlined button

**Article Cards (Right column, scrollable row):**
- Card size: 280px wide × 320px tall
- Image: Top 160px, full-width, `border-radius: 12px 12px 0 0`
- Tag chip: Overlaid on bottom-left of image (e.g., "Coronavirus", "Nutrition")
- Doctor name: With avatar and blue dot "verified" indicator

---

### 5. 📈 Health Analytics Section
- Background: White
- Layout: **2 equal columns** on desktop, stacked on tablet/mobile
- Section header: Centered
  - Label: "Analytics" — coral accent, small caps
  - H2: "Monthly Health Graphs"
  - Subtext: "Visualize patterns and improve outcomes"

**Each Graph Card:**
- `border-radius: 20px`, subtle shadow
- Header area: Title + period selector (dropdown or tabs: "This Week / Month / Year")
- Chart placeholder: Realistic-looking SVG chart (line graph for one, pie/donut for the other)
  - Line chart: 3 colored lines — Primary Blue, Green, Coral
  - Pie chart: Matching palette, with center label showing dominant stat
- Footer: 3 stat chips below each chart (e.g., "Avg HR: 76bpm | Trend: ↑4%")

---

### 6. 💬 Testimonials Section
- Background: `linear-gradient(135deg, #1D4ED8, #0EA5E9)` — full-width blue gradient
- All text: White
- Section title: Centered, white, H2
- Card layout: Centered single card with 800px max-width
- Card style:
  - White background, deep navy text
  - `border-radius: 24px`
  - Large opening quote mark (decorative, coral colored, 80px)
  - Review text: 18px body
  - User info: Avatar (circular, 48px) + Name | City | Profession
  - ⭐ Star rating: 5 stars in coral
- Carousel dots: White outlined circles below card

---

### 7. 📱 CTA Section — "Only mobile required"
- Background: White
- Layout: **2 columns** — Left: Illustration | Right: Text + Input
- Illustration: A realistic phone mockup displaying the HealthTrack app dashboard — with slight 3D tilt (perspective transform, -10deg Y axis, 5deg X axis) + soft drop shadow
- Right column:
  - Label chip: "Get Started Free"
  - H2: "Only mobile required"
  - Body copy: 2–3 lines
  - Phone input row:
    - "+91" country pill (white, bordered)
    - Text input: "Enter your phone number"
    - "Get Link" — Coral CTA button
  - Social proof: "Join 10,00,000+ patients already on HealthTrack"

---

### 8. 📊 Stats Section
- Background: `#0F172A` (deep navy) — contrast section
- Layout: **4-column equal grid**
- Each stat block:
  - Number: `JetBrains Mono`, 48px, Coral (#F97316) — this is the focal hero element
  - Label: White, 16px, DM Sans
  - Thin top border accent: 2px coral line (like a progress indicator)
- Stats:
  - 10,00,000+ Active patients monthly
  - 200+ Labs & Collection Centers
  - 100+ Doctors across India
  - 100+ Pharmacy & Clinics connected

---

### 9. 🦶 Footer
- Background: `#0F172A` — deep navy
- Top border: 1px `#1E293B`
- Layout: 5-column grid (equal width)
  - Column 1: **HealthTrack** branding — logo, tagline, social icons row (YouTube, Facebook, LinkedIn, X, Instagram)
  - Column 2: **For Patients** — Profile, Search clinics, Book tests, Full body checkups, Explore trackers, Read articles, Routine checkup
  - Column 3: **For Clinics** — Profile, Search for clinics, Submit test results, Submit body checkups, Calendar
  - Column 4: **For Clinics (Providers)** — Profile, Submit Prescriptions, Calendar
  - Column 5: **More** — Help, Developers, Privacy Policy, Terms & Conditions
- All link text: `#94A3B8`, hover: White
- Section headers: White, 14px, SemiBold, letter-spacing: 0.05em
- Bottom bar: Full-width divider + "Copyright © 2026, HealthTrack. All rights reserved." — centered, small, `#64748B`

---

## ✨ 3D & DEPTH DESIGN LANGUAGE

Use **2.5D depth illusion** (not actual 3D rendering):

- **Hero visual**: Phone mockup with CSS `perspective: 1000px` + `rotateY(-15deg)` tilt, floating stat cards at different Z-depths (use `translateZ` or layered box-shadows)
- **Floating stat chips**: Absolutely positioned, `border-radius: 12px`, white background, shadow — showing "❤️ 98bpm", "✅ Appointment Confirmed", "📊 +12% this week"
- **Service cards on hover**: `transform: translateY(-8px)` + deeper shadow = perceived lift
- **Graph cards**: Use a subtle inner gradient on the chart container: `radial-gradient(ellipse at 70% 30%, #EFF6FF, transparent)` — creates depth within the card
- **Stats section numbers**: Add a subtle glow: `text-shadow: 0 0 24px rgba(249,115,22,0.4)` — coral glow on large stat numbers

---

## ⚡ MICRO-INTERACTION DESIGN HINTS

- Nav links: `border-bottom` slides in on hover (transform scaleX from 0→1)
- Service cards: Image scales to 1.04 on hover — smooth zoom
- CTA buttons: `box-shadow` expands on hover, slight scale: 1.02
- Article cards: Title color shifts to Blue on hover
- Search bar: Focused input gets a Blue `ring` (outline) with smooth transition
- Stat numbers: Count-up animation on scroll into viewport

---

## 📐 RESPONSIVE BREAKPOINTS

| Breakpoint | Grid         | Nav        | Hero Layout  |
|------------|--------------|------------|--------------|
| Desktop    | 12-col, 24px | Full menu  | 2-col        |
| Tablet     | 6-col, 16px  | Hamburger  | Stacked      |
| Mobile     | 4-col, 12px  | Drawer     | Single-col   |

- Services: 4-col → 2-col → 1-col
- Stats: 4-col → 2-col → 2-col
- Footer: 5-col → 2-col → 1-col

---

## 🎯 FINAL QUALITY BAR

This UI must pass the following tests:
- ✅ Would a VC firm use this as a product screenshot in a deck?
- ✅ Does it look better than Practo's current landing page?
- ✅ Is the color system consistent and intentional across all 9 sections?
- ✅ Does every card have proper internal padding and shadow?
- ✅ Is there zero visual clutter — does whitespace breathe?
- ✅ Do the 3D/depth elements feel tasteful, not gimmicky?

**Texture Rule:**
- Apply

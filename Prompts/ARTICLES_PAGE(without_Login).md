# HealthTrack — Articles Page Recreation Prompt

Copy the entire block below into v0 (or any capable AI coding assistant) to recreate this animated, coffee-themed HealthTrack Articles page end-to-end. It is self-contained: palette, typography, layout, components, animations, and content cues are all specified.

---

## Prompt

> Build a **fully animated, production-quality "Articles" section** for a health-tech brand called **HealthTrack** using **Next.js App Router + TypeScript + Tailwind CSS v4 + shadcn/ui**. Every surface, chip, card, gradient, and chart must be driven by design tokens in `app/globals.css` so the whole theme can be recolored from one place. Ship it as a single route (`app/page.tsx`) composed of small, focused components in `components/articles/*`.

### 1. Color System (exact hex)

Define these in `:root` inside `app/globals.css` using the `@theme inline` pattern for Tailwind v4. Never use raw Tailwind color utilities like `bg-emerald-500`; always use semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-primary-foreground`, `bg-card`, `bg-muted`, `border-border`, etc.).

| Role | Name | Hex |
|------|------|-----|
| `--background` | Coffee Black (main) | `#120903` |
| `--popover` / deepest wells | Coffee Deep | `#0A0502` |
| `--card` / elevated surfaces | Coffee Mid | `#1A0D06` |
| `--muted` | Coffee Muted | `#22130A` |
| `--border` / `--input` | Coffee Line | `#2A1A10` |
| `--foreground` | Cloudy White | `#F2EAE0` |
| `--muted-foreground` | Warm Sand | `#B8A494` |
| `--primary` / `--ring` | Burnt Orange | `#E56B2A` |
| `--primary-foreground` | Coffee Black | `#120903` |
| `--secondary` / `--accent` | Mint Sand | `#C7D3BD` |
| `--secondary-foreground` / `--accent-foreground` | Coffee Black | `#120903` |
| `--destructive` | `#D7453A` |
| `--radius` | `1rem` |

Chart tokens: `--chart-1` Burnt Orange, `--chart-2` Mint Sand, `--chart-3` Cloudy White, `--chart-4` Warm Tan `#B8A494`, `--chart-5` Coffee Mid.

Sidebar tokens mirror the main palette (sidebar = Coffee Deep, sidebar-accent = Coffee Mid).

Also set the `<html>` tag's background to `bg-background` and update the Next.js `viewport.themeColor` to `#120903` (light) and `#0A0502` (dark) so mobile browser chrome blends in.

### 2. Typography & File Structure

- **Body / sans:** `Geist` via `next/font/google`, assigned to the `--font-sans` CSS variable.
- **Display / serif:** `Fraunces` via `next/font/google`, assigned to `--font-serif`. Use italic Fraunces for the wordmark and large section headings.
- Register both in `app/layout.tsx` and expose them in `globals.css` via `@theme inline`.
- Use `font-serif` for hero headline, featured article headline, and section titles.
- Use `font-sans` everywhere else.
- Body copy uses `leading-relaxed`. Long headlines get `text-balance`, long paragraphs get `text-pretty`.

#### File Structure

Strictly follow this structure. Do not deviate or add extra files unless listed:

```
Healthtracker/
├── MASTER_PROMPT.md
├── Home_Page/                      ← ONLY FOR HYPERLINKING
├── Patients/                       ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
├── Doctors/                       ← EXISTING FOLDER — DO NOT TOUCH OR REGENERATE
└── Articles/
    └── Without_Login/
        ├── index.html
        ├── tailwind.config.ts
        ├── tsconfig.json
        └── src/
            ├── main.tsx
            ├── App.tsx
            └── components/
                └── Form.tsx
```


### 3. Global Animations (in `app/globals.css`)

Define these keyframes and utility classes — all must honor `prefers-reduced-motion: reduce` (set `animation: none !important; transition: none !important;`).

**Keyframes**

- `float` — translateY(0 → -12px → 0), 6s ease-in-out infinite.
- `pulse-glow` — box-shadow pulse using `--primary` at 20%/40% opacity, 2.4s infinite.
- `shimmer` — background-position-x: -200% → 200%, 2.5s linear infinite (use on a 200%-wide linear-gradient mask over buttons and image skeletons).
- `gradient-shift` — background-position: 0% 50% → 100% 50% → 0% 50%, 8s ease infinite (for animated mesh backgrounds).
- `marquee` — translateX(0 → -50%), 30s linear infinite.
- `fade-up` — opacity 0 → 1, translateY(16px → 0), 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards.
- `count-up` — used with JS IntersectionObserver (no keyframe needed; animate numeric value over ~1.4s ease-out).
- `tilt-in` — opacity 0 → 1, rotateX(8deg) → 0, translateY(20px → 0), 0.8s.
- `ring-spin` — conic-gradient background rotation, 6s linear infinite.
- `ripple` — scale(0) opacity 0.6 → scale(4) opacity 0, 0.8s ease-out.

**Utilities**

- `.mesh-bg` — a radial-gradient mesh using `--primary`/`--secondary` at very low alpha over `--background`, combined with `gradient-shift`.
- `.grain` — a subtle SVG fractal-noise data-URI overlay at ~4% opacity (use as a pseudo-element, pointer-events: none, mix-blend-mode: overlay).
- `.glow-primary`, `.glow-accent` — soft radial glows used as decorative blobs.
- `.reveal` — starts `opacity-0 translate-y-4`; when `.is-visible` class is added by IntersectionObserver, triggers `fade-up`. Stagger children via `transition-delay` based on `--stagger` custom property.
- `.card-tilt` — on `group-hover`, applies `rotateX`/`rotateY` via CSS custom properties (`--rx`, `--ry`) set from JS `pointermove`.

### 4. Route + Layout

**`app/layout.tsx`**
- Import Geist + Fraunces, bind to CSS variables.
- `<html lang="en" className={`${geist.variable} ${fraunces.variable} bg-background`}>`.
- `<body className="min-h-svh bg-background text-foreground font-sans antialiased">`.
- Metadata: `title: "HealthTrack — Articles"`, descriptive `description`, OpenGraph tags.
- `viewport.themeColor` as specified above.

**`app/page.tsx`** composes these sections in order:

1. `<SiteHeader />`
2. `<HeroSection />`
3. `<FeaturedArticle />`
4. `<TrendingSection />`
5. `<ArticleGrid />`
6. `<TrustSection />`
7. `<NewsletterCTA />`
8. Footer (simple, muted).

### 5. Components

#### `components/articles/site-header.tsx`
- Sticky top, `backdrop-blur`, semi-transparent `bg-background/70`, `border-b border-border/60`.
- Small **40×40** hexagon icon (SVG clip-path or `clip-path: polygon(...)`), translucent cloudy-white fill, with an italic serif `H` centered inside.
- Next to it: italic Fraunces wordmark `HealthTrack`.
- Left-aligned nav links: `Find Doctors`, `Lab Tests`, `Articles`, `Trackers`. Active link (`Articles`) in `text-primary` with a short `after:` underline; others `text-foreground/80` with hover → `text-foreground`.
- Right cluster:
  - `Emergency:` in `text-muted-foreground` + bold cream `102` with a tiny pulsing orange dot (`animate-ping` + solid dot overlay).
  - `Log In` plain text link.
  - `Sign Up →` → rounded-full solid `bg-primary text-primary-foreground` pill with an inline `ArrowRight` icon. On hover: translate-y -1px, subtle shadow, and a `shimmer` gradient sweep across its surface.
- Mobile: collapse nav into a `Menu` icon button; slide-down panel with staggered link fade-in.

#### `components/articles/hero-section.tsx`
- Full-bleed section with the `.mesh-bg` and `.grain` overlays.
- Decorative floating **pill badges** absolutely positioned around the hero (e.g., "Lab Result Ready", "98 bpm", "2,340 steps", "Sleep: 7h 42m"). Each pill uses `bg-card/70 border border-border` with a small emoji-free icon (Lucide: `Beaker`, `HeartPulse`, `Footprints`, `Moon`), and runs `float` with staggered `animation-delay`.
- Small eyebrow chip: `AI-POWERED HEALTH PLATFORM` in uppercase tracked-wide text inside a rounded-full border.
- Large Fraunces headline (e.g., `Your health, tracked.`) with a gradient fill (`from-foreground via-foreground to-primary`) using `bg-clip-text text-transparent`.
- Muted subhead paragraph.
- Dual CTA row: primary `Explore Articles` (solid orange, shimmer on hover) + ghost `Browse Doctors`.
- **Live stat ticker** row: 3 numeric stats (`12M+ articles read`, `4.9★ avg rating`, `30s avg read`) that count up via IntersectionObserver when the section enters view.
- **Category filter chip row** beneath the CTAs: `All`, `Nutrition`, `Fitness`, `Mental Health`, `Sleep`, `Diabetes`, `Immunity`. The active chip has `bg-primary text-primary-foreground`, others `bg-muted text-foreground/80 hover:bg-accent hover:text-accent-foreground`. Chips animate in with a staggered fade-up.

#### `components/articles/featured-article.tsx`
- Two-column grid on `lg:` (`grid-cols-1 lg:grid-cols-2 gap-10`), single column on mobile.
- Left: big rounded image (`rounded-3xl overflow-hidden`) of `public/images/featured-heart-health.jpg`.
  - On hover: `scale-105` over 700ms, a subtle parallax shift on a second inner layer, and a soft orange glow behind the card (`glow-primary` blob that scales up).
  - A **`Featured`** burnt-orange chip floats over the top-left corner with `pulse-glow`.
- Right: category badge (`Cardiology`), date + read-time row with Lucide icons, Fraunces headline, summary paragraph, author row (circular avatar `public/images/doctor-sarah.jpg`, name + credential), a stat row (views, likes, bookmarks) with subtle icons, and a primary CTA `Read full article →`.
- A bookmark/save icon button in the top-right of the card; clicking it morphs (`Bookmark` → filled `BookmarkCheck`) with a tiny confetti burst of orange dots (CSS only, 6 dots radiating).
- Entire card wrapped in `.reveal` + `.card-tilt`.

#### `components/articles/article-card.tsx`
- Reusable card used in the grid.
- `bg-card border border-border rounded-2xl overflow-hidden` with subtle shadow.
- Image area `aspect-[16/10]` with:
  - A **gradient top border** that fades in on hover using the category's accent color.
  - A **shimmer skeleton** behind the image while loading.
  - `group-hover:scale-105` image zoom (700ms cubic-bezier).
  - A category chip overlay at bottom-left, tinted with the category's token color.
- Body:
  - Fraunces title (2 lines, `line-clamp-2`).
  - Muted excerpt (`line-clamp-2`).
  - Footer row: small avatar + author name on the left; a `Heart` icon with like count + `Clock` icon with read time on the right. Liking animates: the heart scales up with a pop (0.9 → 1.2 → 1), fills with `--primary`, and the count increments.
- Card-level hover: `translate-y-[-4px]`, shadow grows, `.card-tilt` subtle 3D response to pointer movement, and a thin `ring-1 ring-primary/40` appears.
- Enters via `.reveal` with a staggered delay based on its index (`style={{ "--stagger": `${i * 80}ms` }}`).

#### `components/articles/article-grid.tsx`
- Section title `Latest articles` (Fraunces) + muted subtitle + small `Sort by` select on the right.
- Responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Renders 9 `ArticleCard`s from `lib/articles-data.ts`.
- Below the grid, a centered `Load more` button:
  - Rounded-full, `bg-card border border-border`.
  - On click: fires a **ripple** animation from the click point and appends 3 more cards with fade-up stagger.
  - Label icon is `Plus` that rotates 90° on hover.

#### `components/articles/trending-section.tsx`
- Two-column split on `lg:`:
  - Left: Fraunces heading `Trending this week` with a short intro and a TrendingUp icon animated with a gentle bob.
  - Right: ordered list of 5 trending articles.
- Each row:
  - Large rank numeral (`01`–`05`) in Fraunces, `text-primary/80`, that animates in with `tilt-in`.
  - Tiny circular author avatar.
  - Two-line title + meta row (category dot + reads).
  - Thin per-row progress bar (`h-[2px] bg-muted`) whose `--primary` fill width animates from 0 → target% when scrolled into view (target based on relative read counts).
- Hover a row: background shifts to `bg-muted/60`, numeral scales 1.04, progress bar pulses.

#### `components/articles/trust-section.tsx`
- Full-width band with the `.mesh-bg` and a faint `.grain` overlay.
- 4 stat tiles in a `grid-cols-2 lg:grid-cols-4 gap-6`:
  - `500+` Board-certified doctors
  - `2.4M` Articles read monthly
  - `98%` Reader satisfaction
  - `12yrs` Clinically reviewed
- Each tile: large Fraunces numeral that **counts up** on intersect, icon chip above, muted label below.
- Tiles tilt subtly on hover and have an animated orange underline under the icon.

#### `components/articles/newsletter-cta.tsx`
- Centered card `bg-card border border-border rounded-3xl p-10` with orbiting floating icons (`Mail`, `Sparkles`, `Heart`, `Leaf`) animated with `float` at different delays.
- Fraunces heading `Get weekly health wisdom, curated.`.
- Muted subhead.
- Inline input + submit button (`InputGroup` shadcn pattern): input with mail icon, rounded-full orange submit pill.
- On submit (client-side): button morphs into a `Spinner`, then to a `Check` icon with a quick green flash and a success toast.
- Micro-footnote `No spam. One click to unsubscribe.`.

### 6. Data

Create `lib/articles-data.ts` exporting:

- `featuredArticle` — one rich article object (Cardiology).
- `articles` — an array of 9 articles spanning Nutrition, Fitness, Mental Health, Sleep, Diabetes, Immunity, Hydration, Meditation, and one Cardiology follow-up.
- `trending` — an array of 5 with `reads` counts for the progress bars.
- Each article: `id`, `title`, `excerpt`, `category`, `image`, `author: { name, role, avatar }`, `publishedAt`, `readMinutes`, `likes`, `views`, `slug`.

Create `lib/category-meta.tsx` mapping each category to a Lucide icon + a token-safe accent class (e.g., Nutrition → `Leaf`, Fitness → `Dumbbell`, Mental Health → `Brain`, Sleep → `Moon`, Diabetes → `Droplets`, Immunity → `ShieldCheck`, Hydration → `GlassWater`, Meditation → `Flower2`, Cardiology → `HeartPulse`). Accent classes use `bg-primary/15 text-primary`, `bg-secondary/30 text-secondary-foreground`, etc. — never raw Tailwind palette colors.

### 7. Images

Generate (or reference existing) editorial healthcare photos at `public/images/`:

- `featured-heart-health.jpg` — stethoscope + red anatomical heart model on a warm, minimal surface.
- `article-nutrition.jpg`, `article-fitness.jpg`, `article-mental-health.jpg`, `article-sleep.jpg`, `article-diabetes.jpg`, `article-hydration.jpg`, `article-immunity.jpg`, `article-meditation.jpg` — clean editorial stills.
- `doctor-sarah.jpg`, `doctor-raj.jpg`, `doctor-emily.jpg` — professional headshots for author avatars.

All images must have meaningful `alt` text.

### 8. Animation Orchestration

- Build a tiny `useReveal` hook that wires an IntersectionObserver and adds `.is-visible` to elements with `.reveal` when 15% visible. Disconnect after first reveal.
- Build a `useCountUp` hook for numeric stats: animates from 0 to target using `requestAnimationFrame`, easing `easeOutQuart`, duration 1400ms. Respects reduced motion (snaps to final value).
- Build a `useMagneticTilt` hook for `.card-tilt` cards: on `pointermove`, compute `--rx`/`--ry` from cursor position relative to the card center; reset on `pointerleave`. Skip if `prefers-reduced-motion`.
- All hover interactions use CSS transitions (`transition-[transform,box-shadow,background-color] duration-300 ease-out`) — no JS spring libraries required.

### 9. Accessibility

- Every interactive element is a real `<button>` or `<a>`, with visible `focus-visible:ring-2 ring-primary ring-offset-2 ring-offset-background` states.
- Decorative floating pills and glow blobs are `aria-hidden="true"`.
- Images have descriptive `alt`; purely decorative ones use `alt=""`.
- Color contrast: Cloudy White on Coffee Black passes AAA; Burnt Orange on Coffee Black passes AA for large text — do NOT use orange for body copy.
- Respect `prefers-reduced-motion` everywhere.
- Semantic landmarks: `<header>`, `<main>`, `<section aria-labelledby=...>`, `<footer>`.

### 10. Performance

- Use `next/image` for every photo with explicit `width`/`height` and `sizes`.
- Lazy-load below-the-fold sections (`loading="lazy"` on images outside the hero).
- Prefer CSS animations over JS. No framer-motion required.
- Avoid large client components — keep page a Server Component and mark only the interactive pieces (`"use client"`) where needed (header mobile menu, card like button, newsletter form, hooks).

### 11. Copy Tone

Warm, clinical-but-human, confident. Avoid hype. Prefer short Fraunces headlines and pragmatic sans subheads. Example headlines:

- Hero: `Your health, tracked.`
- Featured: `The small daily habits that quietly protect your heart.`
- Trending: `Trending this week`
- Grid: `Latest articles`
- Trust: `Built with clinicians. Trusted by millions.`
- Newsletter: `Get weekly health wisdom, curated.`

### 12. Deliverables

- `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- `components/articles/site-header.tsx`
- `components/articles/hero-section.tsx`
- `components/articles/featured-article.tsx`
- `components/articles/article-card.tsx`
- `components/articles/article-grid.tsx`
- `components/articles/trending-section.tsx`
- `components/articles/trust-section.tsx`
- `components/articles/newsletter-cta.tsx`
- `lib/articles-data.ts`
- `lib/category-meta.tsx`
- `hooks/use-reveal.ts`, `hooks/use-count-up.ts`, `hooks/use-magnetic-tilt.ts`
- All images under `public/images/`
- No ORM, no database — this is a static, content-driven page.

Ship it polished: every card animates in, every button has a micro-interaction, every number counts up, nothing feels static. Keep the whole theme controllable from `app/globals.css`.

---

*End of prompt.*



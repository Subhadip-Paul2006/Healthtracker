# HealthTracker — Multi-Role Registration UI Prompt
## For Stitch AI

---

## 🎯 Design Goal

Create a **high-fidelity, desktop-first registration screen** for a healthcare SaaS platform called **HealthTracker**. The UI must support three user roles — **Patient**, **Doctor**, and **Service Provider** — with a single dynamic layout that switches form content based on the selected role.

Design tone: **Clean · Trustworthy · Modern · Healthcare SaaS**

---

## 🎨 Color Tokens (Use Exactly)

| Token | Hex |
|---|---|
| Primary Dark | `#3B2F2F` (Dark Coffee) |
| Accent | `#D96C2D` (Burnt Orange) |
| Surface | `#E6D3B3` (Muted Sand) |
| Background | `#FAF7F0` (Ivory White) |

Apply Burnt Orange `#D96C2D` as the primary CTA button color, input focus ring, and active tab indicator. Use Ivory White as the page background. Use Muted Sand as card/panel background.

---

## 🖥️ Page Layout

Split-screen layout, horizontal, desktop (1440px wide):

**Left Panel (40% width)**
- Full-height illustration area
- Background: gradient blend of `#3B2F2F` and `#D96C2D`
- Centered healthcare illustration — doctor + patient + health icons, slightly futuristic and friendly
- Platform tagline below illustration: *"Your Health. Tracked. Trusted."*
- Illustration style: flat/semi-flat, modern, uses palette colors

**Right Panel (60% width)**
- Background: `#FAF7F0`
- Contains: Navbar → Role Toggle Tabs → Registration Card Form

---

## 🔝 Navbar (Inside Right Panel, Top)

- Logo left: **HealthTrack** (bold, dark coffee color)
- Nav links right: `Find Doctors` · `Lab Tests` · `Articles` · `Trackers`
- Font: clean sans-serif, 14px, muted color
- Bottom border: 1px `#E6D3B3`

---

## 🔀 Role Toggle (Below Navbar)

Three pill-style tabs, centered:

`For Patients` · `For Doctors` · `For Providers`

- Active tab: filled pill, `#D96C2D` background, white text
- Inactive tab: outlined pill, `#3B2F2F` text
- Tab switching changes the form fields below (show one mode at a time)

---

## 📋 Registration Card

- Background: `#E6D3B3`
- Border-radius: 16px
- Padding: 32px
- Soft drop shadow
- Scrollable if content overflows
- Section headers inside card: 13px uppercase, `#3B2F2F`, letter-spacing

---

## 👤 MODE 1 — Patient Registration

**Card Title:** Create Your Patient Account

**Section: Basic Info**
- First Name (text input)
- Last Name (text input)
- Gender (segmented select: Male / Female / Other)
- Date of Birth (date picker)

**Section: Contact**
- Mobile Number (with +91 country prefix)
- Email Address

**Section: Location**
- Address Line (text input)
- State (dropdown)
- District (dropdown, dependent on State)
- City / Village (text input)
- Pincode (number input)
- Map Pin toggle (optional — "Pick on Map" link)

**Section: Account Setup**
- Password (masked input with show/hide toggle)
- Confirm Password
- OTP Verification (6-box segmented OTP input, Burnt Orange focus)

**Section: Terms**
- Checkbox: "I agree to the Terms & Conditions and Privacy Policy"

**CTA Button:** `Send OTP` — full width, `#D96C2D`, white text, 14px rounded

---

## 🩺 MODE 2 — Doctor Registration

**Card Title:** Join as a Doctor

**Section: Doctor Profile**
- Full Name
- Profile Photo Upload (circular avatar upload area)
- Gender (segmented)
- Date of Birth
- Medical Registration Number
- Medical Council (dropdown)
- Years of Experience (number input)

**Section: Contact**
- Phone Number
- Alternate Phone
- Email Address

**Section: Location**
- Address Line, State, District, City, Pincode, Map Picker

**Section: Qualifications**
- Primary Degree (text/dropdown)
- Additional Degrees (tag-style multi-input)
- Specialization (multi-select chips)
- Certifications (file upload)

**Section: Verification Documents**
- Medical License Upload
- Government ID Proof
- Clinic Proof (optional, labeled as such)

**Section: Account Setup**
- Password + Confirm Password + OTP (same as Patient mode)

**Section: Additional Info**
- Short Bio (textarea, 200 char limit)
- Languages Spoken (multi-select chips)
- Awards / Achievements (optional text)
- Linked Lab or Pharmacy (optional search field)

**Section: Terms**
- Checkbox: Terms + Privacy Policy

**CTA Button:** `Start Your Journey` — full width, Burnt Orange

---

## 🏪 MODE 3 — Service Provider Registration

**Card Title:** Register Your Health Business

**Section: Business Information**
- Provider / Store Name (text input)
- Store Type (multi-select chip group):
  `Chemist & Druggist` · `Doctor Chamber` · `Pathology Lab` · `Diagnostic / Imaging Center` · `Sample Collection Point` · `Vaccination Center` · `Blood Donor & Collection` · `Health Products / Supplements` · `Health Camp Point`

**Section: Contact Details**
- Primary Phone Number
- Alternate Contact Number
- Business Email Address

**Section: Location**
- Store Address, State, District, City / Village, Pincode, Map Location Picker

**Section: Business Verification**
- GST Number
- License Number (if applicable)
- Owner Full Name
- Owner Phone Number

**Section: Account Setup**
- Create Password + Confirm Password + OTP (Email or Phone)

**Section: Terms**
- Checkbox: Terms & Conditions

**CTA Button:** `Start Your Journey` — full width, Burnt Orange

---

## 🧩 Component Specifications

| Component | Spec |
|---|---|
| Input fields | Height 44px, border-radius 10px, border `#D0B99A`, focus ring `#D96C2D` |
| Dropdowns | Same height, chevron icon right-aligned |
| Buttons (CTA) | Height 48px, border-radius 12px, font-weight 600 |
| Pill Tabs | Height 36px, border-radius 999px |
| OTP boxes | 6 boxes, 44×44px each, gap 8px, border-radius 8px |
| Section headers | 11–12px, uppercase, letter-spacing 1px, `#3B2F2F` |
| Labels | 13px, `#3B2F2F`, font-weight 500 |
| Card shadow | `box-shadow: 0 8px 32px rgba(59,47,47,0.10)` |

---

## ✨ UX & Interaction Design Notes

- Role tabs switch form content with a smooth cross-fade transition
- Active input fields highlight with Burnt Orange border and subtle background tint
- OTP input is a 6-segment inline box row, not a single text field
- Optional fields should be visually labeled as "Optional" in muted text
- File upload areas: dashed border, upload icon centered, "Click to upload or drag & drop" label
- Multi-select chips: selected chips show filled `#D96C2D` background with white text and × remove button
- Progress stepper (optional): subtle horizontal dots or numbered steps above card

---

## 📐 Technical Design Requirements

- Desktop-first at 1440px canvas width
- Use Figma Auto Layout for all form sections and card components
- All form elements as reusable components with variants (Default / Focus / Filled / Error / Disabled)
- All three role forms as separate frame variants within the same component
- Use Figma Variables for color tokens
- Consistent 8px spacing grid

---

## ❌ Do NOT Include

- Neon or bright gradient backgrounds
- lottie references
- Any color outside the defined palette
- Cluttered layouts or more than 2 columns in the form

## ✅ Include

- Dark mode & Light Mode 
- Sidebar navigation
- Complex animations 
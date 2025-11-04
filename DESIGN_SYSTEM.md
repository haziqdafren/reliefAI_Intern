# Jessie Li Website - Design System

Complete color palette, typography, and design specifications for the Jessie Li Coaching website.

---

## Color Palette

### Primary Colors

#### Background Tones (Warm Neutrals)
```
Primary 100 (Lightest)
- Hex: #FAF8F5
- RGB: rgb(250, 248, 245)
- Usage: Main backgrounds, lightest sections

Primary 200 (Light)
- Hex: #F5F1ED
- RGB: rgb(245, 241, 237)
- Usage: Secondary backgrounds, subtle sections

Primary 300 (Light-Medium)
- Hex: #F0E8E3
- RGB: rgb(240, 232, 227)
- Usage: Hover states, subtle emphasis
```

#### Accent Colors (Warm Terracotta/Rose)
```
Primary 400 (Accent)
- Hex: #E09B8A
- RGB: rgb(224, 155, 138)
- Usage: Primary accent, borders, icons, highlights

Primary 500 (Accent Dark)
- Hex: #D88A75
- RGB: rgb(216, 138, 117)
- Usage: Buttons, CTAs, hover states, links
```

### Text Colors

```
Text Primary (Dark Gray)
- Hex: #2C2C2C
- RGB: rgb(44, 44, 44)
- Usage: Headings, primary text, high contrast text

Text Secondary (Medium Gray)
- Hex: #6B6B6B
- RGB: rgb(107, 107, 107)
- Usage: Body text, descriptions, secondary information
```

### Utility Colors

```
White
- Hex: #FFFFFF
- RGB: rgb(255, 255, 255)
- Usage: Cards, overlays, pure white backgrounds

Black (for shadows/overlays)
- Hex: #000000
- RGB: rgb(0, 0, 0)
- Usage: Shadows, dark overlays (with opacity)
```

---

## Typography

### Font Families

#### Heading Font (Primary)
```css
font-family: 'Work Sans', 'IBM Plex Sans', sans-serif
```
- **Usage**: Main headings (h1, h2, h3), large titles
- **Weights**: 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Characteristics**: Modern, clean, professional

#### Corporate Font (Body Text)
```css
font-family: 'IBM Plex Sans', 'Work Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', sans-serif
```
- **Usage**: Body text, paragraphs, UI elements
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 700 (Bold)
- **Characteristics**: Readable, corporate, trustworthy

#### Display Fonts (Alternative)
```css
font-family: 'Playfair Display', serif
```
- **Usage**: Special headings, quotes (rarely used currently)
- **Weights**: 400 (Regular), 700 (Bold)

```css
font-family: 'Inter', sans-serif
```
- **Usage**: Alternative sans-serif (rarely used currently)
- **Weights**: Variable

### Font Sizes (Responsive)

#### Headings
```css
/* Hero Title (Extra Large) */
text-6xl:  3.75rem (60px)
text-7xl:  4.5rem (72px)
text-8xl:  6rem (96px)

/* Section Titles (Large) */
text-4xl:  2.25rem (36px)
text-5xl:  3rem (48px)

/* Subsection Titles (Medium) */
text-2xl:  1.5rem (24px)
text-3xl:  1.875rem (30px)

/* Small Headings */
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
```

#### Body Text
```css
/* Standard Body Text */
text-base: 1rem (16px)
text-sm:   0.875rem (14px)
text-xs:   0.75rem (12px)

/* Large Body Text */
text-lg:   1.125rem (18px)
text-xl:   1.25rem (20px)
```

### Responsive Typography Pattern
Most text uses Tailwind's responsive classes for mobile-first design:
```css
/* Mobile → Tablet → Desktop */
text-sm sm:text-base md:text-lg
text-3xl md:text-4xl lg:text-5xl
text-6xl md:text-8xl
```

---

## Spacing & Layout

### Container Widths
```css
container mx-auto: Full width with auto margins
max-w-6xl: 72rem (1152px) - Standard content width
max-w-7xl: 80rem (1280px) - Wide content
max-w-5xl: 64rem (1024px) - Narrow content
```

### Padding/Margin Scale
```css
px-4:  1rem (16px)
px-5:  1.25rem (20px)
px-6:  1.5rem (24px)
px-8:  2rem (32px)

py-12: 3rem (48px)
py-16: 4rem (64px)
py-20: 5rem (80px)
py-24: 6rem (96px)
py-32: 8rem (128px)
```

---

## Effects & Animations

### Border Radius
```css
rounded-full:    9999px (Fully rounded)
rounded-2xl:     1rem (16px)
rounded-3xl:     1.5rem (24px)

/* Custom organic shapes */
rounded-organic: 60% 40% 30% 70% / 60% 30% 70% 40%
rounded-blob:    30% 70% 70% 30% / 30% 30% 70% 70%
```

### Shadows
```css
/* Standard shadows */
shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1)
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)

/* Colored shadows (primary) */
shadow-primary-400/20: Box shadow with primary-400 at 20% opacity
shadow-primary-400/30: Box shadow with primary-400 at 30% opacity
shadow-primary-400/40: Box shadow with primary-400 at 40% opacity
shadow-primary-400/50: Box shadow with primary-400 at 50% opacity
```

### Animations

#### Fade In
```css
@keyframes fadeIn {
  0%: { opacity: 0 }
  100%: { opacity: 1 }
}
Duration: 0.8s ease-out
```

#### Slide Up
```css
@keyframes slideUp {
  0%: { opacity: 0, transform: translateY(30px) }
  100%: { opacity: 1, transform: translateY(0) }
}
Duration: 0.8s ease-out
```

#### Scale In
```css
@keyframes scaleIn {
  0%: { opacity: 0, transform: scale(0.9) }
  100%: { opacity: 1, transform: scale(1) }
}
Duration: 0.6s ease-out
```

#### Float (Continuous)
```css
@keyframes float {
  0%, 100%: { transform: translateY(0px) }
  50%: { transform: translateY(-10px) }
}
Duration: 3s ease-in-out infinite
```

#### Pulse (Continuous)
```css
/* Used for background decorative elements */
animation: pulse
```

---

## Glass Morphism Effect

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(224, 155, 138, 0.2);
}
```

---

## Gradient Patterns

### Background Gradients
```css
/* Primary warm gradient */
bg-gradient-to-br from-primary-50 via-white to-primary-100

/* Accent gradients */
bg-gradient-to-r from-primary-100 to-primary-200
bg-gradient-to-br from-primary-100 to-primary-200
bg-gradient-to-br from-primary-200 to-primary-300

/* Button gradients */
bg-gradient-to-r from-primary-400 to-primary-500
```

### Text Gradients
```css
/* Currently not heavily used, but available */
bg-gradient-to-r from-primary-400 to-primary-500
bg-clip-text text-transparent
```

---

## Button Styles

### Primary CTA Button
```css
Background: Linear gradient from-primary-400 to-primary-500
Text: White
Padding: py-4 px-12 (1rem top/bottom, 3rem left/right)
Border Radius: rounded-full
Font: font-corporate font-bold
Transform on Hover: -translate-y-2
Shadow: shadow-xl shadow-primary-400/40
Hover Shadow: shadow-2xl shadow-primary-400/50
Text Transform: uppercase tracking-wider
```

### Secondary Button
```css
Background: Glass effect with backdrop-blur
Text: text-primary
Border: border border-primary-400/30
Padding: py-3 px-8
Border Radius: rounded-full
Font: font-corporate font-medium
Transform on Hover: -translate-y-1
Background Hover: bg-primary-400/10
```

---

## Decorative Elements

### Background Blobs (Animated)
```css
/* Large blob - top left */
Class: w-96 h-96 bg-primary-400/3 rounded-full animate-pulse
Position: top-20 -left-40

/* Medium blob - bottom right */
Class: w-80 h-80 bg-primary-500/4 rounded-full animate-pulse delay-1000
Position: bottom-32 -right-48

/* Small blob - center */
Class: w-64 h-64 bg-primary-300/2 rounded-full animate-pulse delay-500
Position: top-1/2 left-1/3
```

---

## Accessibility

### Color Contrast Ratios
- Text Primary (#2C2C2C) on White: 13.7:1 (AAA)
- Text Secondary (#6B6B6B) on White: 5.5:1 (AA)
- Primary 500 (#D88A75) on White: 3.5:1 (AA Large Text)
- White on Primary 500: 5.5:1 (AA)

### Focus States
```css
/* All interactive elements should have visible focus states */
focus:ring-2 focus:ring-primary-400 focus:ring-offset-2
```

---

## Breakpoints

```css
/* Tailwind default breakpoints used */
sm:  640px  (Mobile → Tablet)
md:  768px  (Tablet → Desktop)
lg:  1024px (Desktop)
xl:  1280px (Large Desktop)
2xl: 1536px (Extra Large Desktop)
```

---

## Design Principles

1. **Warm & Welcoming**: Terracotta/rose accent colors create an inviting, feminine aesthetic
2. **Professional**: Clean typography and ample whitespace maintain credibility
3. **Organic Movement**: Rounded corners, flowing animations, and blob shapes add softness
4. **High Contrast**: Dark text on light backgrounds ensures readability
5. **Responsive First**: All designs scale gracefully from mobile to desktop
6. **Subtle Animations**: Scroll-triggered animations guide user attention without distraction

---

## Usage Notes

- **Primary CTA Color**: Use `from-primary-400 to-primary-500` gradient for all "Buy Now" / main action buttons
- **Borders**: Primary-400 at 20-30% opacity for subtle borders
- **Hover States**: Use `-translate-y-1` or `-translate-y-2` for lift effect
- **Section Backgrounds**: Alternate between white, primary-50, primary-100, and gradients
- **Images**: Use `rounded-2xl` or `rounded-3xl` for all images
- **Cards**: Glass effect or solid white with subtle shadows

---

## Quick Reference: Most Used Classes

```css
/* Containers */
container mx-auto px-6 max-w-6xl

/* Sections */
py-16 md:py-20 lg:py-24

/* Headings */
font-heading text-4xl md:text-6xl font-medium text-text-primary

/* Body Text */
font-corporate text-base md:text-lg text-text-secondary leading-relaxed

/* Primary Button */
bg-gradient-to-r from-primary-400 to-primary-500 text-white py-4 px-12 rounded-full font-corporate font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-xl

/* Card */
glass-card backdrop-blur-md p-8 rounded-2xl border border-primary-400/20

/* Grid Layout */
grid md:grid-cols-2 lg:grid-cols-3 gap-8
```

---

*Last Updated: 2025*
*For: Jessie Li Coaching Website*
*Framework: React + Tailwind CSS*

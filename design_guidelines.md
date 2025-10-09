# Design Guidelines: 대한민국 가방배달 서비스

## Design Approach
**Reference-Based Approach** inspired by modern Korean delivery services (Coupang, Baemin) combined with travel/luggage services (LuggageHero). Focus on creating a trustworthy yet youthful experience that emphasizes convenience and freedom.

## Brand Personality
"청춘의 편하고 즐거운시간" - Youthful convenience and joyful experiences. The design should feel liberating, reliable, and modern with warm Korean sensibility.

## Color Palette

**Light Mode:**
- Primary: 220 90% 50% (Trust blue - reliable delivery service)
- Secondary: 200 95% 45% (Supportive sky blue)
- Accent: 35 85% 55% (Warm orange - energy and action)
- Success: 145 70% 45% (Delivery completed green)
- Background: 210 20% 98% (Soft white)
- Surface: 0 0% 100% (Pure white cards)
- Text Primary: 220 15% 20% (Dark charcoal)
- Text Secondary: 220 10% 50% (Medium gray)

**Dark Mode:**
- Primary: 220 85% 60%
- Secondary: 200 80% 55%
- Accent: 35 80% 60%
- Success: 145 65% 50%
- Background: 220 20% 10%
- Surface: 220 15% 15%
- Text Primary: 210 20% 95%
- Text Secondary: 210 15% 70%

## Typography

**Fonts:**
- Primary: 'Noto Sans KR' (Google Fonts) - Clean, modern Korean typography
- Secondary: 'Inter' (Google Fonts) - For numerals and English text

**Hierarchy:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subheadings: text-xl md:text-2xl, font-semibold
- Body: text-base md:text-lg, font-normal
- Captions: text-sm, font-medium

## Layout System

**Spacing Units:** Use Tailwind spacing primitives: 4, 6, 8, 12, 16, 20, 24 as primary units
- Component padding: p-6 to p-8
- Section spacing: py-16 md:py-20 lg:py-24
- Card gaps: gap-6 to gap-8
- Form spacing: space-y-6

**Container System:**
- Max width: max-w-7xl mx-auto
- Form containers: max-w-2xl mx-auto
- Content sections: px-6 md:px-8 lg:px-12

## Component Library

### Landing Page Structure

**1. Hero Section (80vh):**
- Large hero image: Young travelers/students enjoying freedom, bags being delivered
- Overlay gradient: from-blue-900/40 to-blue-900/10
- Centered headline emphasizing freedom from heavy bags
- Primary CTA button (large, accent color)
- Trust indicators below (e.g., "5,000+ 배달 완료")

**2. 가방배달 신청 Form Section:**
- White/surface card with shadow-xl, rounded-2xl
- Two-column layout on desktop (현재 주소 | 배달할 주소)
- Single column on mobile
- Form fields: rounded-lg, border-2, focus:ring-2 focus:ring-primary
- Large submit button with loading state

**3. Why Use Service Section:**
- 3-column grid (lg:grid-cols-3)
- Each benefit card: icon (top), heading, description
- Icons: Use Heroicons (outline style) in accent color
- Cards: hover:shadow-lg transition
- Emphasize: 편한 여행, 즐거운 시간, 자유로운 청춘

**4. Trust/Social Proof:**
- Statistics row: 4-column grid of key metrics
- Large numbers with animated counting effect
- Labels below in secondary text

**5. Advertiser Section (Footer Area):**
- Distinct background color (bg-slate-50 dark:bg-slate-900)
- Two-column: Information (left) + Form (right)
- Form similar style to delivery form
- Clear CTA for businesses

### Admin Page Structure

**Login Page:**
- Centered card (max-w-md)
- Simple, secure design
- Blue primary theme matching landing
- Remember me checkbox
- Clear error states

**Dashboard:**
- Top navigation bar with logout
- Two-tab system: "배달 신청" | "광고 신청"
- Data tables: striped rows, hover states
- Status badges for entries
- Responsive table with horizontal scroll on mobile

## Form Design Patterns

**Input Fields:**
- Height: h-12
- Border: border-2 border-gray-300 dark:border-gray-600
- Focus state: ring-2 ring-primary/50
- Rounded: rounded-lg
- Placeholder text in gray-400

**Buttons:**
- Primary: bg-accent text-white, px-8 py-3, rounded-lg, font-semibold
- Secondary: variant="outline" with backdrop-blur-sm on images
- Hover: transform hover:scale-105 transition

**Form Validation:**
- Inline error messages below fields
- Red accent for errors
- Success checkmarks for validated fields

## Images

**Hero Section:**
- Large, vibrant image of young Koreans enjoying travel/leisure
- Bags visible but not central - focus on liberation
- Bright, sunny atmosphere suggesting freedom
- Composition: Left-aligned subjects with right space for text

**Benefits Section Icons:**
- Use Heroicons: truck-icon, clock-icon, heart-icon
- Size: w-12 h-12
- Color: accent color with light background circle

**Optional Decorative:**
- Subtle pattern/texture in footer advertiser section
- Light dotted pattern in background (opacity 5%)

## Animations

Use sparingly and purposefully:
- Hero CTA: subtle pulse effect
- Form submission: loading spinner
- Cards: hover lift (transform translate-y-1)
- Page transitions: fade-in on load
- NO scroll-triggered animations
- NO parallax effects

## Responsive Breakpoints

- Mobile first approach
- sm: 640px - Stack forms to single column
- md: 768px - Introduce 2-column layouts
- lg: 1024px - Full 3-column feature grid
- xl: 1280px - Max container width

## Accessibility & Korean UX

- High contrast ratios (WCAG AAA where possible)
- Clear focus indicators (ring-2)
- Korean text optimized sizing (slightly larger)
- Form labels always visible (no floating labels)
- Clear error messaging in Korean
- Touch targets minimum 44px on mobile
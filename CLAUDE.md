# UX Portfolio Design System & Guidelines

This document outlines the design system and guidelines for constructing a modern UX portfolio based on the established style guide.

## Design Principals

## Typography

**Primary Font:** IBM Plex Sans (Google Fonts)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- Fallback: `-apple-system, BlinkMacSystemFont, sans-serif`
- Monospace: IBM Plex Mono (Google Fonts, weights 400 and 600) via `--font-family-mono`, fallback `'SF Mono', Monaco, monospace`. Used for code and the nav wordmark logo. Always load it as a web font so it renders the same on every device
- Ligatures: Enabled site-wide for improved readability (fi, fl, ff, ffi, ffl)

**Typography System - CSS Variables:**

All typography is standardized using CSS custom properties in `_variables.css`. Each element has variables for size, weight, letter-spacing, and line-height.

```css
/* Hero Title */
--typo-hero-title-size: clamp(48px, 8vw, 96px)
--typo-hero-title-weight: 300 (Light)
--typo-hero-title-spacing: -0.02em
--typo-hero-title-line-height: 0.9

/* Subtitle */
--typo-subtitle-size: clamp(18px, 2.5vw, 32px)
--typo-subtitle-weight: 400 (Regular)
--typo-subtitle-line-height: 1.5

/* Section Title */
--typo-section-title-size: clamp(36px, 5vw, 48px)
--typo-section-title-weight: 300 (Light)
--typo-section-title-spacing: -0.02em
--typo-section-title-line-height: 1.2

/* Section Subtitle */
--typo-section-subtitle-size: 16px
--typo-section-subtitle-weight: 400 (Regular)
--typo-section-subtitle-line-height: 1.7

/* Heading 1 */
--typo-h1-size: clamp(32px, 5vw, 48px)
--typo-h1-weight: 300 (Light)
--typo-h1-spacing: -0.02em
--typo-h1-line-height: 1.2

/* Heading 2 */
--typo-h2-size: clamp(24px, 4vw, 32px)
--typo-h2-weight: 400 (Regular)
--typo-h2-spacing: -0.01em
--typo-h2-line-height: 1.3

/* Heading 3 */
--typo-h3-size: clamp(20px, 3vw, 24px)
--typo-h3-weight: 500 (Medium)
--typo-h3-line-height: 1.4

/* Heading 4 */
--typo-h4-size: clamp(18px, 2.5vw, 20px)
--typo-h4-weight: 500 (Medium)
--typo-h4-line-height: 1.4

/* Heading 5 */
--typo-h5-size: clamp(16px, 2vw, 18px)
--typo-h5-weight: 600 (Semi-Bold)
--typo-h5-line-height: 1.5

/* Heading 6 */
--typo-h6-size: clamp(14px, 1.5vw, 16px)
--typo-h6-weight: 600 (Semi-Bold)
--typo-h6-line-height: 1.5

/* Body Text */
--typo-body-size: 16px (desktop), 12px (mobile)
--typo-body-weight: 400 (Regular)
--typo-body-line-height: 1.7

/* Small Text */
--typo-small-size: 14px
--typo-small-weight: 400 (Regular)
--typo-small-line-height: 1.6

/* Type Label */
--typo-label-size: 14px
--typo-label-weight: 500 (Medium)
--typo-label-spacing: 0.05em
```

**Usage:**
All typography elements use these variables for consistency. To apply typography styles:
```css
.my-heading {
    font-size: var(--typo-h2-size);
    font-weight: var(--typo-h2-weight);
    letter-spacing: var(--typo-h2-spacing);
    line-height: var(--typo-h2-line-height);
}
```

## Link Styles

**Link System - CSS Variables:**

All link styles are standardized using CSS custom properties in `_variables.css`:

```css
/* Link Styles */
--link-color: var(--color-accent)
--link-hover-opacity: 0.5
--link-underline-height: 2px
--link-underline-offset: -2px
--link-transition: 0.3s ease
--link-font-weight: 500 (Medium)
```

**Standard Link Components:**

1. **Accent Link (`.accent-link`)** - Standard link with animated underline
   - Deep emerald accent colour
   - Underline animates from left to right on hover
   - Text fades to 50% opacity on hover using `color-mix()`
   - Usage: Internal navigation, section links, primary CTAs

2. **Accent Link with Arrow (`.accent-link-arrow`)** - Navigation link with right arrow
   - Same styling as accent link with right-pointing arrow (→)
   - Arrow included in link text
   - Usage: "Read more" links, case study links, directional navigation

3. **External Link (`.external-link`)** - For external resources opening in new tab
   - Same styling as accent link with 45-degree arrow (↗)
   - Arrow included in link text
   - Usage: External websites, documentation links, resources that open in new window

**Usage:**
```html
<!-- Accent Link -->
<a href="#section" class="accent-link">Internal link</a>

<!-- Accent Link with Arrow -->
<a href="/case-study" class="accent-link-arrow">Read the case study →</a>

<!-- External Link -->
<a href="https://example.com" target="_blank" class="external-link">View documentation ↗</a>
```

## Color Palette

**Primary Colors:**
- Primary: `#0f0f0f` (darker than neutral 900)
- Secondary: `#525252`
- Tertiary: `#737373`

**Accent Color (Emerald):**
- Accent: `#047857` (deep emerald) - variable `--color-accent-cool`, used through `--color-accent`
- Secondary accent: `#34d399` (bright mint) - variable `--color-accent-warm`, for charts and the bottom bar's glow

**Color Theory:**

This is a software engineer portfolio, so the accent is green: the colour of terminal prompts, passing tests, green CI builds and the contribution graph. The deep emerald passes WCAG AA for link text (about 5.5:1 on the page) and keeps the light page calm and classy. The site owner also tried the reference design's bright sky blue (`#15B5FF`, too light for small text at about 2.2:1) and a deep blue (`#0369a1`), and chose emerald. Use the mint secondary (`--color-accent-warm`) only for decoration (glows, chart fills), never for small text.

**Neutral Scale:**
- White: `#ffffff`
- Neutral 50: `#fafafa`
- Neutral 100: `#f5f5f5` 
- Neutral 200: `#e5e5e5`
- Neutral 300: `#d4d4d4`
- Neutral 400: `#a3a3a3`
- Neutral 500: `#737373`
- Neutral 600: `#525252`
- Neutral 700: `#404040`
- Neutral 800: `#262626`
- Neutral 900: `#171717`

## Layout & Spacing

**Container:**
- Max-width: 1200px
- Width: 100% (liquid until max-width)
- Padding: 120px 60px (desktop), 80px 24px (mobile)

**Modular Spacing Scale:**
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 48px, xxl: 80px

**Spacing Utilities:**

Available margin utilities (replace inline styles with these):
- `.m-0` - margin: 0
- `.mb-3` - margin-bottom: 12px
- `.mb-4` - margin-bottom: 16px
- `.mb-6` - margin-bottom: 24px
- `.mb-8` - margin-bottom: 32px
- `.mb-12` - margin-bottom: 48px
- `.mb-30` - margin-bottom: 120px
- `.mt-6` - margin-top: 24px
- `.mt-8` - margin-top: 32px
- `.mt-12` - margin-top: 48px

**Layout Utilities:**

Flexbox utilities (replace inline flex styles with these):
- `.flex-center` - Centers content horizontally with flexbox
- `.flex-column-gap-6` - Vertical flex column with 24px gap, left-aligned
- `.flex-wrap-gap-6` - Horizontal flex with 24px gap and wrapping

**Grid System:**
- CSS Grid with `.grid`, `.grid-cols-{n}`, `.col-span-{n}`
- Responsive breakpoints: 768px (tablet), 1024px (desktop)
- Gap options: `.gap-1` (4px) to `.gap-16` (64px)

## Interactive Elements & Effects

**Glassmorphism Design Language:**
- Buttons: Semi-transparent backgrounds with backdrop blur
- Cards: Subtle transparency with enhanced shadows

**Transitions & Animations:**
- Standard: `transition: all 0.3s ease`
- Fast: `transition: all 0.15s ease`  
- Slow: `transition: all 0.5s ease`
- Smooth cubic-bezier: `cubic-bezier(0.4, 0, 0.2, 1)`

**Hover States:**
- `.hover-lift`: translateY(-2px) with enhanced shadow
- `.hover-scale`: scale(1.02)
- `.hover-fade`: opacity(0.8)

## Theme System

**The site is light-only.** Dark mode was removed on purpose because it didn't suit the feel of the portfolio. Do not add a theme toggle or dark-mode styles back.

**Light Mode:**
- Background: `#fafafa` (`--bg-primary`)
- Text: `#1a1a1a` (`--text-primary`)
- Accent: Deep emerald `#047857` (`--color-accent`)

**How light-only is enforced:**
- `initTheme()` in `public/assets/js/core/theme-system.js` removes any `data-theme` attribute and clears a `theme` value saved in `localStorage` from when dark mode existed
- `<meta name="color-scheme" content="only light">` in `app/(site)/layout.tsx` asks browsers (e.g. Chrome Android "auto-darken") not to force-darken the site
- There is no theme toggle in the nav, mobile menu or lab page

**No dark-mode CSS:** all `[data-theme="dark"]` rules and dark-only images/logos were deleted. `--color-accent-warm` remains only as a secondary green used by a few charts. Never write dark-mode rules or add `-dark` image variants.

**Colour variables:** always use CSS variables (e.g. `var(--color-accent)`, `var(--link-color)`) instead of hardcoded hex values or `rgba()` with hardcoded RGB. For tints, use `color-mix(in srgb, var(--color-accent) 10%, transparent)`. The lab page (`content/pages/lab.html`) is the reference for variable usage.

## Component Library

**Buttons:**
```css
.btn-primary: Dark glass with white text
.btn-secondary: Light glass with dark text
Border-radius: 50px (pill-shaped)
Padding: 16px 32px
```

**Cards:**
```css
.card: Standard card with glass effect
.glass-card: Enhanced glass card with more blur
.interactive-card: Card with hover lift effect
Border-radius: 16-20px
Backdrop-filter: blur(10-20px)
```

**Interactive Text:**
```css
.interactive-text: Underline animation on hover
Color: Theme-appropriate accent color
Transition: width 0.3s ease
```

**Lab Page Components:**
```css
.wave-slider-container: Centers slider with 120px bottom margin (80px mobile)
.wave-slider: Responsive slider with width: min(500px, 100%)
.interactive-checkbox-label: Checkbox label with 12px gap and left alignment
```

## Portfolio Construction Guidelines

**Page Structure:**
1. Header with navigation (glass effect)
2. Hero section with large typography
3. Project showcase grid
4. About section
5. Contact/footer

**Project Cards:**
- Use `.glass-card` with hover effects
- Include project thumbnails, titles, descriptions
- Maintain consistent spacing and alignment
- Responsive grid: 1 col (mobile) → 2-3 cols (desktop)

**Navigation:**
- Fixed or sticky header with glass effect
- Smooth scroll to sections
- Active state indicators using accent colors
- **Phones (≤768px): floating menu button** (`.fab-nav`, rendered by `lib/nav.ts` on every page, styled in `_navigation.css`, opened by `initFabNav()` in `navigation.js`). A small round frosted-glass button in the bottom-right corner (☰, turns into ✕) pops up a glass card with the same `LINKS` as the desktop menu (About, Work, Blog); the current one is in the accent colour. It closes on a link tap, a tap elsewhere, or Escape. It replaces the hamburger menu on phones. The body gets bottom padding and the back-to-top / back-to-projects buttons stack above it (84px + `env(safe-area-inset-bottom)`, which needs `viewportFit: 'cover'` in `app/(site)/layout.tsx`); anything new fixed to the bottom-right on phones must clear it too. (A full-width glass bottom tab bar was tried before this and dropped.)

**Performance Considerations:**
- Optimize backdrop-filter usage (can be expensive)
- Use CSS transforms for smooth animations
- Implement lazy loading for project images
- Maintain accessibility with proper contrast ratios

**Content Guidelines:**
- Use sentence case for most text
- Maintain consistent voice and tone
- Include case studies with problem/solution structure
- Showcase diverse project types and skills

## Coding Best Practices

**Avoid Inline Styles:**
- NEVER use inline `style=""` attributes in HTML
- Use utility classes from `_utilities.css` for spacing, layout, and common patterns
- Create component classes in `_components.css` for reusable patterns
- Inline styles prevent responsive adjustments and theme switching

**Use CSS Variables:**
- ALWAYS use CSS variables instead of hardcoded color values
- Use `var(--color-accent-cool)` instead of `#047857`
- Use `var(--color-accent-warm)` instead of `#34d399`
- This ensures proper theme switching and maintains consistency
- Reference the complete variable list in `_variables.css`

**Consistent Corner Rounding:**
- All images across the site should have rounded corners using `var(--radius-sm)` (8px)
- This applies to: blog body images, carousel containers, viz panels, timeline modal images, and any future image elements
- Use `border-radius: var(--radius-sm)` on the image element, or `border-radius: var(--radius-sm)` + `overflow: hidden` on its container
- Cards use `var(--radius-md)` (12px) with `overflow: hidden` to clip child images
- Never use hardcoded `border-radius` pixel values — always reference the design system variables (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`)

**Responsive Patterns:**
- Use `min()` function for responsive sizing: `width: min(500px, 100%)`
- Use `clamp()` for responsive typography (already defined in variables)
- Prefer CSS Grid and Flexbox utilities over custom inline styles

**Component Reusability:**
- If a pattern appears more than once, create a reusable class
- Document new components in this file for future reference
- Keep lab-specific components in a dedicated section of `_components.css`

## Page Transitions

Page transitions use a `body::after` pseudo-element overlay instead of fading the `body` opacity directly. This keeps the fixed nav visible throughout transitions.

```css
/* _charts.css — overlay sits below nav (z-index 1200), above content */
body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 1100;
    background: var(--bg-primary);
    pointer-events: none;
    opacity: 1; /* opaque until JS fades it out */
    transition: opacity var(--transition-page);
}
.page-transition-in::after { opacity: 0; }  /* reveal content */
.page-transition-out::after { opacity: 1; } /* cover content */
```

**CRITICAL: Never use `body { opacity }` for transitions** — it hides the fixed nav.

## Implementation Notes

- All effects work cross-browser with `-webkit-` prefixes
- **Keep backdrop blur small on short elements.** Chrome silently drops `backdrop-filter: blur()` when the radius is too large for the element's height (on the 52px bottom bar, 12px works and 16px already fails), and the glass shows faded but sharp text instead. Test glass by screenshotting it over body text, not just by reading the computed style
- **Put the `-webkit-` declaration BEFORE the standard one** (`-webkit-backdrop-filter: var(--blur-lg); backdrop-filter: var(--blur-lg);`). Next.js's CSS minifier merges the pair when the value is a `var()` and keeps only the last one; if `-webkit-` is last, Chrome gets no blur and the glassmorphism silently disappears
- Mobile-first responsive approach
- Semantic HTML structure for accessibility  
- Test glass effects on various backgrounds
- Ensure sufficient color contrast in both themes
- Use `prefers-reduced-motion` for accessibility

## Next.js Architecture

The site is a Next.js App Router project exported as static HTML (`output: 'export'`, `trailingSlash: true`) and hosted on **GitHub Pages**. There is no server: no admin panel, logins or database. Content lives in files; edit them and push to `main`, and `.github/workflows/pages.yml` builds and publishes the site.

- `npm run dev` for local development; `npm run build` writes the site to `out/` (`npm start` serves it).
- `app/(site)/` holds the routes and their root layout. Imports use the `@/` alias (`@/lib/page`).
- `lib/page.tsx` renders a page and its metadata from `content/pages/<route>.{html,json}`; `lib/nav.ts` is the single source of the nav.
- Page bodies are injected HTML, not JSX, because the classic scripts in `public/assets/js` mutate them. Those scripts rely on `DOMContentLoaded`, so internal links are plain `<a>` tags (full page loads). Do not use `next/link` for them.
- Use root-relative, trailing-slash URLs (`/work/ai-strategy/`, `/assets/...`). This is why the site must be served from a root address (`jerinjosevlh.github.io` or a custom domain), never a `/repo-name/` subpath.
- Routes with server-only features (cookies, Server Actions, proxy, dynamic route handlers) don't work with static export; route handlers must be `dynamic = 'force-static'`.

### Where content comes from

| Content | File | Served by |
|---|---|---|
| Home page = the résumé: photo card with the name (h1), About me, Built by me (projects), Experience, Skills, Contact | `content/pages/index.html` (the summary text is in the HTML) | The old `/resume/` page is gone; `public/resume/index.html` redirects old links to `/#resume` |
| Experience and skills | `public/data/experience.json`, `public/data/skills.json` | `resume-renderer.js` fills `.experience-timeline` and `.skills-grid` |
| Old About text and hero text (no longer shown) | `content/site.json` | `{{SITE_*}}` tokens in `lib/site.ts`, unused by the current home page |
| About photo cards | `content/about-carousel.json` (currently one card: the photo) | `app/(site)/data/about-carousel.json/route.ts` → `out/data/about-carousel.json`. With one card there are no dots, swiping or rotation (`.about-carousel.is-single`); add more cards to the file and the carousel comes back automatically, sized to the card count |
| Project cards | `content/legacy-projects.json` (case study pages in `content/pages/work/`) | `app/(site)/data/projects.json/route.ts` → `out/data/projects.json` |
| Blog posts | `public/assets/content/blog/<slug>/post.json` | `build/build-blog.js` generates `content/pages/blog/*` and `content/generated/` (git-ignored); `app/(site)/assets/js/blog/blog-data.js/route.ts` serves the module the blog scripts import |
| Person data (structured data) | `public/data/person.json` | `helpers.js` `generatePersonSchema()`; only public facts, empty fields are dropped. Never put private contact details here |

- Files starting with `_` in `content/pages/*` are templates, never routes.

## File Organization

```
/.github/workflows/pages.yml # Builds out/ and publishes it to GitHub Pages on push to main
/app/
  /(site)/                   # Routes, site root layout, data routes (/data/*.json, blog-data.js)
/lib/                        # page.tsx, nav.ts, content.ts, site.ts, blog.ts, markdown.ts
/content/
  /pages/                    # Page bodies (.html) and metadata (.json), by route; _*.html are templates
  /generated/                # Built by build-blog.js (git-ignored)
  site.json, about-carousel.json, legacy-projects.json  # Home page content
  blog-template.html         # Blog post template
/build/                      # build-blog, html-to-page, stamp-assets, convert-to-webp
/public/
  /assets/css/               # Modular stylesheets, imported by app/(site)/layout.tsx
  /assets/js/                # Classic scripts and blog ES modules
  /assets/content/blog/      # Blog sources: post.json and images
  /assets/images/, /logos/, /icons/
  /data/                     # Static JSON loaded at runtime by core/data-loader.js
```

## Technical Architecture

### Modular CSS System
The stylesheet is organized as a series of CSS modules imported into `main.css`:
1. **Variables** - CSS custom properties and theme tokens (`--container-max-width`, colors, fonts)
2. **Base** - Reset, foundational styles, text selection
3. **Navigation** - Header, menu
4. **Hero** - Hero section, back-to-top button
5. **Particles** - Particle canvas (no settings panel; its slider, toggle and checkbox styles remain for the Lab page)
6. **Components** - Reusable UI components (buttons, cards)
7. **Carousels** - Carousel implementations
8. **Sections** - Page sections (projects, about, brands, contact)
9. **Project Pages** - Case study layouts
10. **Charts** - Data visualizations
11. **Utilities** - Helper classes, responsive overrides (must load last)

### Cache Busting Strategy
CSS is hashed by Next.js. Scripts in `public/assets/js` are unhashed, so `build/stamp-assets.js` runs after every build and stamps script tags and relative ES module imports in `out/` with one build-wide `?v=`. No manual version bumps are needed; never add `?v=` to source files.

### Container Strategy
Max-width containers prevent content from becoming excessively wide on large displays:
- **CSS Variable:** `--container-max-width: 1200px` (defined in `_variables.css`)
- **Applied to:** Hero content, navigation, sections
- **Behavior:** Content is fluid up to 1200px, then centers with whitespace on sides
- **Rationale:** Maintains readability and prevents "tiny elements spread out" on 4K+ displays

### Known Limitations & Best Practices

**Viewport Scaling on Large Displays:**
CSS cannot replicate browser zoom behavior when using `vh` (viewport height) units. Attempts to use `transform: scale()` or CSS `zoom` property will break layouts that depend on viewport units because:
- Browser zoom recalculates viewport dimensions **before** layout
- CSS scaling happens **after** layout (viewport units already computed)
- Result: Misaligned or broken `vh`-based elements

**Recommended Approaches for Large Displays:**
1. ✅ **Max-width containers** (current implementation) - Prevents excessive spread
2. ✅ **Targeted media queries** - Increase specific font sizes at 2K/4K if needed
3. ✅ **User-controlled zoom** - Let users apply browser zoom themselves
4. ❌ **Avoid** `transform: scale()` or `zoom` property with `vh` layouts

**Future Considerations:**
If elements feel too small on ultra-high-resolution displays, consider:
- Increasing `--container-max-width` to 1400-1600px
- Adding media queries for larger base font sizes at 2560px+ breakpoints
- Adjusting specific component sizes (nav, buttons) via targeted media queries

### Development Workflow
The site is hosted on GitHub Pages from the public repo `jerinjosevlh/jerinjosevlh.github.io` (address https://jerinjosevlh.github.io). Pushing `main` runs `.github/workflows/pages.yml` (npm ci, npm run build, publish `out/`). Pages must be set to "GitHub Actions" as its source. `public/.nojekyll` stops Pages from hiding the `_next/` folder. Day-to-day work happens on `dev`, then merges into `main`. The repo is public: never commit private details (phone numbers, addresses, private emails, secrets).

This design system provides a comprehensive foundation for building a modern, professional UX portfolio that stands out with sophisticated glassmorphism effects and intelligent theming.
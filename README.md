# SolarPro — Solar Energy Website

React 19 · TypeScript (strict) · Vite 7 · Tailwind CSS v4 · Motion for React · Lucide · React Router 7

A responsive, accessible recreation of the SolarPro homepage design, plus working inner pages
(service details, all projects, blog, privacy, terms, 404).

## Getting started

```bash
npm install
cp .env.example .env    # optional — see Configuration
npm run dev             # http://localhost:5173
```

## Production build

```bash
npm run build           # type-checks (tsc -b) then builds to dist/
npm run preview         # serve the production build locally
npm run lint
```

`dist/` is a static single-page app. Configure your host to fall back to `index.html` for unknown
paths (Netlify `_redirects`: `/* /index.html 200`; Vercel does this automatically for Vite).

## Configuration

| Variable | Purpose | When empty |
|---|---|---|
| `VITE_QUOTE_ENDPOINT` | URL that receives quote requests as a JSON `POST` | Form runs in a clearly labelled **demo mode** and says nothing was sent |
| `VITE_HERO_VIDEO_URL` | YouTube/Vimeo embed URL or `.mp4`/`.webm` file for “Watch Video” | Modal shows a “video coming soon” notice with a consultation CTA |

Company details, social links and section ids live in `src/lib/constants.ts`.
All copy and card content lives in `src/data/*`.

## Images

The photos were generated to match the reference mockup scene-for-scene (hero house at sunset,
rooftop installer, the four service photos, the three project photos and the CTA landscape).

They are self-hosted as responsive WebP files in `public/images/`, built by `scripts/build-images.mjs`
from the list in `src/data/image-manifest.json`:

1. `npm install` runs the script automatically (`postinstall`); you can re-run it with `npm run images`.
2. The script downloads each full-resolution original into `assets-src/images/<name>.png`
   and encodes WebP variants at the widths listed in the manifest.
3. **The download links expire on 20 October 2026.** Run `npm install` (or `npm run images`) before
   then and commit `assets-src/images/` so you keep the originals permanently.
4. If an original can't be downloaded, the script falls back to the low-resolution previews in
   `assets-src/previews/` so the site still renders — it prints which images are previews.

To replace any photo, drop a PNG/JPG at `assets-src/images/<name>.png`, update its
`width`/`height` in the manifest if the aspect ratio changed, and run `npm run images`.

Customer testimonials show initials avatars. To add portraits, add an `avatar` (an `ImageAsset`)
to an entry in `src/data/testimonials.ts`.

## Structure

```
src/
  app/            App, router, UI provider (quote / video / search dialogs)
  assets/icons/   Custom SVG icons (CO₂ cloud, social brands)
  components/
    animations/   Reveal, StaggerContainer
    cards/        Service, Project, Testimonial, Statistic cards
    common/       Container, Button, IconButton, SectionHeading, Logo, SmartImage, PageHeader, Seo
    forms/        QuoteForm
    layout/       Header, MobileMenu, NavLinkItem, Footer, MainLayout
    ui/           Modal, QuoteModal, VideoModal, SearchDialog, BackToTop, ScrollManager
  data/           navigation, services, projects, testimonials, steps, blog, legal, search index, images
  hooks/          scroll position, scroll-spy, media query, focus trap, body scroll lock, section nav
  lib/            animations (shared motion variants), constants, utils
  pages/          Home, Service, Projects, Blog, Legal, NotFound
  sections/       Hero, About, Services, HowItWorks, Projects, Testimonials, CTA
  styles/         globals.css (Tailwind v4 @theme design tokens)
```

## Notes

- **Colour & contrast:** `primary` (#4BAF24) matches the reference and is used for icons, accents
  and text on dark backgrounds. Buttons use `primary-600` and small green text uses `primary-700`
  so white-on-green and green-on-white text meet WCAG AA (4.5:1).
- **Motion:** all variants are in `src/lib/animations.ts`; only transform/opacity animate.
  `<MotionConfig reducedMotion="user">` plus a CSS media query honour `prefers-reduced-motion`.
- **Accessibility:** skip link, landmark/heading structure, focus-trapped dialogs and mobile menu
  with Escape + focus restore, keyboard/swipe carousel with live announcements, labelled form
  errors, 44px touch targets.

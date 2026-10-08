# Gyang Corporate Consult — Website

Corporate website for **Gyang Corporate Consult**, a Ghanaian consultancy in security management, corporate crime investigation, due diligence, asset tracing, debt recovery, ADR, training and proposal development.

Content source: [docs/company-profile-notes.docx](docs/company-profile-notes.docx).

## Stack

- **Vue 3** + **TypeScript** + **Vue Router**, built with **Vite**
- **vite-ssg**: every page is pre-rendered to static HTML at build time, for SEO, fast first paint and hosting anywhere static
- **@unhead/vue** for per-page `<title>`, meta description, canonical URL, Open Graph/Twitter tags and JSON-LD
- Self-hosted variable fonts (Inter, Source Serif 4), with no third-party requests
- Vitest + Vue Test Utils, ESLint (flat config) + Prettier

## Getting started

```bash
npm install
cp .env.example .env      # set VITE_SITE_URL (and optionally VITE_CONTACT_ENDPOINT)
npm run dev               # http://localhost:5173
```

| Script               | Purpose                                                       |
| -------------------- | ------------------------------------------------------------- |
| `npm run dev`        | Dev server with hot reload                                    |
| `npm run build`      | Type-check, then pre-render all pages to `dist/`              |
| `npm run preview`    | Serve the production build locally                            |
| `npm run check`      | Lint + type-check + tests (use in CI)                         |
| `npm run logo -- <file>` | Generate the logo mark, social image and touch icon from the official logo |

## Editing content

All copy lives in `src/content/`. There's no need to touch components to change wording:

- `site.ts`: company facts, **contact details**, about/vision/mission, leadership, principles, client sectors, partners
- `services.ts`: the eight core services (each gets its own page at `/services/<slug>`)

### Before launch

1. **Contact details**: fill `contact.email`, `contact.phones` and `contact.address` in `src/content/site.ts`. They were placeholders in the source notes. They appear automatically in the footer, contact page and structured data.
2. **Domain**: set `VITE_SITE_URL` in `.env`. It's used for canonical URLs, the sitemap, robots.txt and social tags.
3. **Logo**: save the official logo (square PNG, white background) and run
   `npm run logo -- path/to/logo.png`. This writes `src/assets/brand/logo-mark.png` (used in the header and footer automatically), `public/og-image.png` and `public/apple-touch-icon.png`. Until then a drawn fallback mark is shown.
4. **Contact form delivery**: set `VITE_CONTACT_ENDPOINT` to a JSON form endpoint (e.g. Formspree, Basin, or your own API). Without it, the form opens the visitor's email app addressed to `contact.email`.
5. **Leadership photo** (optional): the profile currently shows initials.

## Standards covered

- **Accessibility (WCAG 2.2 AA)**: semantic landmarks, skip link, one `h1` per page, visible focus rings, ≥4.5:1 text contrast, 48px touch targets, keyboard-operable menu (Esc closes and returns focus), focus moved to content on navigation, accessible form errors (summary + `aria-invalid` + `aria-describedby`), `prefers-reduced-motion` respected
- **SEO**: pre-rendered HTML, unique titles and descriptions, canonical links, `sitemap.xml` and `robots.txt` generated at build, Organization/ProfessionalService and BreadcrumbList JSON-LD, `noindex` 404
- **Performance**: route-level code splitting, critical CSS inlined, inline SVG icons, self-hosted fonts loaded by unicode range, hashed and immutable assets
- **Security**: CSP and hardening headers in `public/_headers` (Netlify/Cloudflare Pages format), contact-form honeypot, no third-party scripts
- **Responsive**: fluid type and spacing, layouts tested from 390px to 1440px; print stylesheet

## Deployment

`npm run build` outputs a fully static site in `dist/` (including `404.html`). Deploy to Netlify, Cloudflare Pages, Vercel, GitHub Pages or any static web server. On hosts other than Netlify/Cloudflare, replicate the headers in `public/_headers`.

**Hostinger (Apache/LiteSpeed)**: `public/.htaccess` already carries the headers, HTTPS redirect, clean URLs and 404 page. Build, then upload the *contents* of `dist/` (including the hidden `.htaccess`) into `public_html/`.

## Project structure

```
src/
  content/      site copy and data (edit here)
  components/   header, footer, hero, cards, contact form, icons
  views/        one component per page
  router/       routes + static path list (used for pre-rendering and sitemap)
  composables/  page meta, contact-form logic
  styles/       design tokens and global styles
scripts/        logo asset generator
tests/          unit and component tests
```

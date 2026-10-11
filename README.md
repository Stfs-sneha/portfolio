# Snehangshu Roy — Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide.

## Setup

```bash
npm install        # or: pnpm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Deploy: push to GitHub and import the repo on Vercel (zero config).

## Before you publish — edit `lib/data.ts`

- `site.github` and `site.linkedin` are placeholders → put your real profile URLs.
- Check every project's copy and the SugarPath demo link (`sugarpath-care.netlify.app`).
- All copy (projects, timeline, skills, bio, terminal output) lives in this one file.

## Structure

```
app/
  layout.tsx        fonts (Geist), metadata, global shell
  template.tsx      route entry transition (uses pageTransition variant)
  page.tsx          section composition
  globals.css       tokens, glass, grain, spotlight-border styles
components/
  Background.tsx    mesh gradient + grain + vignette
  ParticleField.tsx interactive Canvas2D spring-dot grid
  Cursor.tsx        spring cursor (fine pointers only)
  MagneticButton.tsx
  SplitText.tsx     masked staggered word reveal
  Nav.tsx           floating pill nav + scroll-progress bar
  Hero.tsx          headline, CTAs, cursor-reactive gradient sphere
  Projects.tsx      3D-tilt cards + slide-in case-study drawer
  Timeline.tsx      scroll-filled vertical timeline
  Skills.tsx        bento grid w/ spotlight borders + marquee
  Terminal.tsx      interactive shell (` key toggles)
  Contact.tsx       availability pulse, magnetic socials, springy form
lib/
  variants.ts       all Framer Motion variants + spring presets
  data.ts           content
  utils.ts
```

## Terminal commands

`help · bio · projects · skills · timeline · contact · open <section> · theme <indigo|emerald|amber|rose> · render <grid|off> · clear · exit`

## Notes

- The contact form opens the visitor's mail client (no backend needed). To send
  server-side, add `app/api/contact/route.ts` (e.g. Resend) and POST from `ContactForm`.
- Tailwind extensions (keyframes, animations, theme colours driven by CSS variables,
  extra blur) are in `tailwind.config.ts`.
- Respects `prefers-reduced-motion`; custom cursor only on fine pointers.

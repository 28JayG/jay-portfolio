# Jay Gandhi — Portfolio

Personal portfolio and case studies. Next.js 16 (App Router, Cache Components), React 19, TypeScript (strict), Tailwind CSS v4, Framer Motion, Lucide.

## Run it

```bash
yarn install
yarn dev           # http://localhost:3000
yarn build         # production build (works offline: fonts are self-hosted in src/fonts)
yarn start         # serve the production build
yarn lint
yarn tsc --noEmit
```

## Configure before deploying

| What | Where |
| --- | --- |
| Site URL (canonical, sitemap, robots, OG image URLs) | `NEXT_PUBLIC_SITE_URL` env var, e.g. `https://example.com`. Falls back to `http://localhost:3000`. |
| Email, resume path, availability pill, socials | `src/data/site.ts` |
| Resume PDF | `public/resume/Jay_Gandhi_Resume.pdf` (path set in `site.ts`; `null` hides the download) |

## Where content lives

All copy is data. Components only render it.

```
src/data/
  site.ts            personal info, links, availability
  projects.ts        homepage project cards (order = display order)
  case-studies/      one file per case study: sections, diagrams, decisions
  experience.ts      timeline + interests
  skills.ts          engineering capabilities
  types.ts           shared types (Block, CaseStudy, ...)
```

Case-study sections are made of typed blocks (`p`, `list`, `callout`, `code`, `diagram`, `cards`, `decisions`). A `callout` with `tone: "placeholder"` renders a dashed "Content needed" slot, so missing details are visible rather than invented.

Placeholders show in `npm run dev` only. Production builds strip them (`src/lib/placeholders.ts`), along with any section or sub-section left empty, and renumber the rest. Timeline entries marked `placeholder: true` are dropped the same way. To keep them in a production build, for example on a review deploy, build with `SHOW_CONTENT_PLACEHOLDERS=true`.

Diagrams are HTML (not images) in `src/components/projects/Diagrams.tsx`, registered by id.

## Confidentiality

- **EMS** is an internal product under NDA. Keep it generic: no client, region, screens or source code.
- **R3** is client work. No brand, domains, people, data or internal security details.
- Code samples on case-study pages are illustrative patterns and are labelled as such.

## Structure

```
src/app/            routes, metadata files (sitemap, robots, manifest, icons, OG images), 404
src/components/
  layout/           Navbar, Footer, BackToTop, MotionProvider, JsonLd
  sections/         homepage sections
  projects/         cards, case-study layout, blocks, diagrams
  ui/               Button, Tag, Terminal, Reveal, CopyButton, ...
src/lib/            utils, OG image renderer
```

Server Components by default. Client components are limited to the navbar, back-to-top, the case-study index, reveal animations, the hero headline and the copy button.

Animations respect `prefers-reduced-motion`. Content stays visible without JavaScript.

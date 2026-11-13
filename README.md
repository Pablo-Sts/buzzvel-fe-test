# Luma — Buzzvel Front-End Engineer challenge (November 2026)

A responsive landing page for **Luma**, an online-learning brand, built from the _Buzzvel FE Test 2026_ Figma file with **Next.js 16 (App Router), TypeScript and Tailwind CSS v4**.

## Getting started

Requirements: Node.js 20.9+ (developed on Node 24) and pnpm. The repo pins pnpm through the `packageManager` field, so Corepack picks the right version.

```bash
corepack enable          # once, if pnpm is not installed
pnpm install
pnpm dev                 # http://localhost:3000
```

| Script           | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Development server                                  |
| `pnpm build`     | Production build (the page is prerendered as static) |
| `pnpm start`     | Serve the production build                          |
| `pnpm lint`      | ESLint (Next.js core-web-vitals + TypeScript rules)  |
| `pnpm typecheck` | Generates route types and runs `tsc --noEmit`        |
| `pnpm test`      | Vitest + Testing Library                            |

## Project structure

```
src/
  app/                layout (metadata, fonts), page (composition only), global tokens
  assets/fonts/       self-hosted variable woff2 fonts (Inter, Plus Jakarta Sans)
  components/
    ui/               design-system primitives: Button, Section, Container, Heading/Text/Overline,
                      SectionHeader, Chip, AvatarStack, TextField/TextAreaField, icons
    layout/           Header (server) + MobileMenu (client), Footer
    sections/         one component per page section (Hero, Categories, FeaturedCourse, …)
  hooks/              useDisclosure (menu state), useContactForm (form state and rules)
  lib/                pure logic: validation, mock contact service, cn()
  types/              content contracts shared by the data layer and the UI
  data/               mock content for the page
public/images/        photos exported from the Figma file
```

## Key decisions

- **Presentation and logic are separate.** The page only composes sections and passes them their data. Components render props and do nothing else. State and rules live in hooks (`useDisclosure`, `useContactForm`) and in pure functions (`validateContact`, `submitContact`). That makes the logic easy to unit test and the UI easy to change. The form depends on a `SubmitContact` signature, so replacing the mock with a real endpoint or a Server Action means editing one file.
- **Server Components by default.** Only the two interactive leaves ship JavaScript: `MobileMenu` and `ContactForm`. Everything else renders on the server and the route is prerendered as static HTML.
- **Own `ui/` primitives instead of a UI library.** The design uses a small, consistent vocabulary (4 button styles, one card style, one field style), so typed primitives are lighter and closer to the design than a third-party kit. Primitives forward native attributes (`ComponentPropsWithoutRef<…>`) and expose `variant`/`size` props, so call sites never restyle them ad hoc.
- **Design tokens from Figma variables.** Colours, shadows and the full type scale (Figma text styles, mobile → desktop) are defined once in `globals.css` (`@theme` + `@utility`). Components use semantic names (`text-ink-secondary`, `text-display-3`, `bg-surface-warm`).
- **Exact assets.** All photos and icons were downloaded from the Figma file through the Figma MCP server. The SVG icons were turned into typed React components with the paths kept verbatim (`components/ui/icons.tsx`). Photos are served through `next/image`, which produces responsive AVIF/WebP with correct `sizes`. Only the hero image is preloaded, as the LCP element.
- **Same fonts as the prototype, self-hosted.** Inter and Plus Jakarta Sans variable woff2 files (latin subset, from Fontsource, OFL licence) are loaded with `next/font/local`. There is no third-party font request, and `display: swap` uses size-adjusted fallbacks to avoid layout shift.
- **The people collage keeps the design's geometry.** Column offsets and photo sizes are copied from Figma and scaled together with a single CSS variable (`--s`), so the composition is identical on mobile and desktop.

### Interactions

- **Mobile menu.** The toggle has `aria-expanded`/`aria-controls`. The menu closes on Escape, on link click and when the viewport reaches desktop width. It also locks page scroll while open and returns focus to the toggle.
- **Contact form.** Client-side validation runs on blur and on submit. Errors are linked with `aria-invalid`/`aria-describedby`, and focus moves to the first invalid field. The button shows a sending state, and a polite live region announces the result. Submission is mocked, since no backend was required.
- **Links and cards.** Navigation, CTAs and category cards link to page sections with smooth scrolling, with a scroll offset for the sticky header. Hover and `:focus-visible` states are on every interactive element.
- **Motion.** The hero badges have a subtle float animation, and cards and arrows have hover motion. All of it runs only under `motion-safe`. A global `prefers-reduced-motion` rule also disables smooth scrolling and transitions.

### Accessibility

- Semantic landmarks: `header`, `nav` (labelled), `main`, labelled `section`s, `footer`.
- A skip link and one `h1`, with a logical heading order.
- `dl` for the stats, `figure`/`blockquote` for the testimonial.
- Descriptive `alt` text on content photos and `alt=""` on decorative ones.
- Visually hidden context where the visible text is ambiguous, for example "Explore *Product Design courses*" and "Rated 4.9 out of 5".

## Where I deviated from the design (and why)

| Design | Implementation | Reason |
| --- | --- | --- |
| Mobile contact form is in Portuguese ("Nome completo", "Enviar mensagem"…), desktop is in English | English on all breakpoints | Looks like a leftover. The page is in English and `lang="en"`. |
| Desktop "How it works" labels all read "STEP 01" | STEP 01 / 02 / 03 | The mobile frame numbers them correctly. |
| `text-tertiary` #6d7384 and the "Browse all courses" link #e7e7ec | #6a7081 and white | The Figma colours measure 4.45:1 on their backgrounds, just under WCAG AA (4.5:1). The visual change is negligible. |
| No tablet frame | `md` = 2-column category grid with stacked sections, `lg` (≥1024px) = desktop layout | Reasonable middle ground between the two frames. |
| Header scroll behaviour not specified | Sticky header | Keeps navigation within reach on a long page. |
| Destinations of links/buttons not specified | In-page anchors to the most relevant section | There are no other pages. Terms/Privacy point to `#`. |
| Menu open state not designed | Full-height panel under the header with the nav links and both CTAs; the close icon matches the menu icon's stroke | — |
| People section copy is lorem ipsum | Kept as in the design | Not mine to rewrite for a fidelity test. |

## Quality checks

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (9 tests) and `pnpm build` all pass.
- Checked visually against the Figma screenshots at 1280, 768 and 402 px, with no horizontal scroll at any width.
- Checked keyboard-only navigation of the menu and form.
- Lighthouse on the production build (`pnpm build && pnpm start`, local, headless Chrome):

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile (simulated slow 4G) | 94 | 100 | 100 | 100 |

The mobile LCP is about 3.0 s. The LCP element is the hero photo, which is preloaded and served as responsive WebP/AVIF.

## Known gaps

- The contact form has no backend. `lib/contact-service.ts` simulates the request.
- Legal links (Terms, Privacy) and auth links (Log in, Start learning) have no destination pages and point to sections of this page.
- The OpenGraph image reuses the hero photo rather than a dedicated 1200×630 social card.
- Only the visual states in the design were matched. Hover, focus, error and success states are my own, built from the same tokens.

## AI usage

I used **Claude Code** (Anthropic) as a pair programmer throughout:

- **Reading the design.** Claude used the **Figma MCP server** to read the file structure, variables (colours and text styles) and per-section reference code, and to download the exact image and SVG assets. That is how the tokens and measurements were taken, rather than eyeballing screenshots.
- **Scaffolding and implementation.** Claude helped write the components, hooks, tests and this README, following the architecture rules I set: SOLID, presentation-only components, logic in hooks and `lib`, Server Components by default, and our own `ui/` folder.
- **How I checked the output.**
  - Compared every section side by side with the Figma screenshots at desktop, tablet and mobile widths in a browser.
  - Exercised the menu and the form with the keyboard.
  - Ran lint, type-check, unit tests, the production build and Lighthouse.
  - Reviewed the code so I can explain every part of it.

**Approximate time spent:** ~X hours _(update before submitting)_.

| footer | −2 px | 2.1% | −1 px | 0.9% || final-cta | +1 px | 1.7% | +3 px | 1.7% || contact | +2 px | 1.7% | +2 px | 2.3% || people | 0 px | 2.7% | 0 px | 6.5% || testimonial | 0 px | 2.4% | +3 px | 3.3% || how-it-works | +1 px | 2.5% | −1 px | 1.6% || featured | 0 px | 2.0% | +2 px | 3.5% || categories | +1 px | 2.4% | −1 px | 1.5% || hero | 0 px | 0.9% | +2 px | 1.3% || header | 0 px | 1.1% | 0 px | 0.2% |# Luma — Buzzvel Front-End Engineer challenge (November 2026)

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
scripts/
  visual-diff.mjs     pixel-perfect check: site vs. Figma exports (Playwright + pixelmatch)
design/
  reference/          Figma exports for the check (PNGs not committed; README.md explains how to export them)
  diff/               generated diff/overlay images (not committed)
  visual-diff-report.json   numbers from the last run
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

## Pixel-perfect check

`pnpm visual-diff` compares the rendered page with the Figma frames, section by section. It works like a visual regression test, with the design as the baseline:

1. **Reference images.** Each Figma section frame is exported as a 1x PNG to `design/reference/{desktop,mobile}/<section>.png`.
2. **Capture.** Playwright (system Chrome) opens the site at the frame widths (1280 px and 402 px). Animations are frozen, fonts are loaded and every lazy image is decoded. It then screenshots each section element.
3. **Compare.** For each section, the script reports the **height delta** against the Figma frame (layout and spacing drift) and the **share of mismatched pixels** (pixelmatch, anti-aliasing ignored).
4. **Output.** It writes `*.diff.png` (red pixels) and `*.overlay.png` (50% onion skin) to `design/diff/`, and the numbers to [`design/visual-diff-report.json`](design/visual-diff-report.json). The report is committed as evidence of the last run.

### Running it yourself

The Figma exports are **not committed**, because the test design is confidential. To reproduce the check:

1. Export the ten section frames of each breakpoint from Figma: select the frame, then **Export → 1x → PNG**. View-only access is enough.
2. Save them with the expected file names:

   ```
   design/reference/desktop/   header.png  hero.png  categories.png  featured.png  how-it-works.png
                               testimonial.png  people.png  contact.png  final-cta.png  footer.png
   design/reference/mobile/    (same ten names, from the "FE - Mobile" frame)
   ```

   [`design/reference/README.md`](design/reference/README.md) maps every file name to its Figma frame, for example `featured.png` → *FE - Desktop → App → Main Content → FeaturedCourse*.
3. Run the site and the script:

   ```bash
   pnpm build && pnpm start      # or pnpm dev
   pnpm visual-diff --url=http://localhost:3000 [--only=mobile] [--section=hero]
   ```

Missing files are skipped, and the output names the expected path. Transparent exports, from frames without their own fill, are flattened onto the page background.

I used it to close the gaps one section at a time, measuring element positions on the reference images rather than eyeballing:

- Mobile paragraph colours.
- Mobile spacing in "people", "contact", "categories" and "footer".
- The hero photo's mobile aspect ratio (346×380) and its decorative shapes.
- The 1136 px content box Figma uses in "featured" and "testimonial".
- The collage's left alignment, its own mobile scale (0.69 × 0.625), the 12 px column gap and per-column offsets measured on the mobile frame.
- The mobile contact form card padding (24 px vertical) and textarea height (100 px), plus category card padding and the featured secondary button.
- Desktop half-pixel details:
  - Figma draws strokes inside the frame, so cards with a 1 px border get 1 px less padding.
  - Figma clips some text boxes below their line height, so the spacing compensates. Examples: the 69 px "How it works" heading box, the 41 px step label boxes, the 94 px CTA heading box and the 166 px footer link row.

Final result (1x exports for both frames):

| Section | Desktop height Δ | Desktop mismatch | Mobile height Δ | Mobile mismatch |
| --- | --- | --- | --- | --- |
| header | 0 px | 1.1% | 0 px | 0.2% |
| hero | 0 px | 1.0% | +2 px | 1.3% |
| categories | 0 px | 1.2% | −1 px | 1.5% |
| featured | 0 px | 0.6% | +2 px | 3.5% |
| how-it-works | 0 px | 0.6% | −1 px | 1.6% |
| testimonial | 0 px | 0.9% | +3 px | 3.3% |
| people | −1 px | 1.8% | 0 px | 6.5% |
| contact | 0 px | 0.8% | +2 px | 2.3% |
| final-cta | +1 px | 0.3% | +3 px | 1.7% |
| footer | 0 px | 0.8% | −1 px | 0.9% |

On desktop, every section matches the Figma height within 1 px (the remaining pixel comes from Figma's half-pixel sizes, such as 722.4 px and 469.5 px). On mobile, every section is within 3 px. What remains is mostly font rasterisation: Figma and Chrome render text slightly differently. The mobile people collage is the highest at 6.5%. Its photo boxes were measured on the mobile export and match within 1–3 px; the rest is the crop of each photo inside its box.

## Quality checks

- `pnpm lint`, `pnpm typecheck`, `pnpm test` (9 tests) and `pnpm build` all pass.
- **Design fidelity, measured.** `pnpm visual-diff` compared every section against 1x Figma exports at 1280 and 402 px; see [Pixel-perfect check](#pixel-perfect-check). On desktop every section is within 1 px of the Figma height with at most 1.8% mismatched pixels. On mobile every section is within 3 px. The last run's numbers are in [`design/visual-diff-report.json`](design/visual-diff-report.json).
- **Tablet (768 px), checked visually.** The design has no tablet frame, so I reviewed it in the browser and confirmed there is no horizontal scroll at any width.
- Checked keyboard-only navigation of the menu and form.
- Lighthouse on the production build (`pnpm build && pnpm start`, local, headless Chrome):

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Desktop | 100 | 100 | 100 | 100 |
| Mobile (simulated slow 4G) | 95 | 100 | 100 | 100 |

**About mobile LCP (≈2.9 s simulated, ≈0.27 s measured unthrottled).** The LCP element is the hero photo. It is in the initial HTML, loaded eagerly with `fetchpriority="high"`, and served as AVIF at the rendered size: 17 KB, down from 24 KB as WebP. I measured each change separately (median of 3 Lighthouse runs):

| Change | LCP (sim.) | Result |
| --- | --- | --- |
| Baseline (WebP, `preload`) | 2.87 s | — |
| `fetchpriority="high"` instead of `preload` | 2.87 s | kept: correct hint, Lighthouse no longer flags it |
| AVIF output | 2.87–3.01 s | kept: ~30% fewer image bytes for real users |
| `experimental.inlineCss` | 3.01 s | dropped: no LCP gain, and the CSS is no longer cacheable |
| No preload for the body font | 2.95 s, FCP 0.92 → 1.24 s | dropped: worse |
| Removing `cacheComponents` / `partialPrefetching` | 2.87 s | dropped: same JS size |

What remains is Lighthouse's bandwidth simulation. It counts every request started before LCP, and most of that is the ~143 KB of React/Next.js runtime that any App Router page ships. A real browser fetches those scripts at low priority, after the high-priority hero image.

## Known gaps

- The contact form has no backend. `lib/contact-service.ts` simulates the request.
- Legal links (Terms, Privacy) and auth links (Log in, Start learning) have no destination pages and point to sections of this page.
- The OpenGraph image reuses the hero photo rather than a dedicated 1200×630 social card.
- Only the visual states in the design were matched. Hover, focus, error and success states are my own, built from the same tokens.

## AI usage

I used **Claude Code** (Anthropic) as a pair programmer throughout:

- **Reading the design.** Claude used the **Figma MCP server** to read the file structure, variables (colours and text styles) and per-section reference code, and to download the exact image and SVG assets. That is how the tokens and measurements were taken, rather than eyeballing screenshots.
- **Scaffolding and implementation.** Claude helped write the components, hooks, tests and this README, following the architecture rules I set: SOLID, presentation-only components, logic in hooks and `lib`, Server Components by default, and our own `ui/` folder.
- **Pixel-perfect validation.** Claude wrote `scripts/visual-diff.mjs` (Playwright + pixelmatch) to compare the site with the Figma exports. It also measured element positions on the reference images, such as content bands and photo rectangles, to find each drift. I exported the Figma frames at 1x and reviewed every fix against the diff and overlay images.
- **How I checked the output.**
  - Ran `pnpm visual-diff` after each change, until every section matched the Figma frames (numbers in [`design/visual-diff-report.json`](design/visual-diff-report.json)).
  - Compared the page side by side with the design at desktop, tablet and mobile widths in a browser.
  - Exercised the menu and the form with the keyboard.
  - Ran lint, type-check, unit tests, the production build and Lighthouse.
  - Reviewed the code so I can explain every part of it.

**Approximate time spent:** ~X hours _(update before submitting)_.

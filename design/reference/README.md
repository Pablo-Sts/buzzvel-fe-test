# Figma reference images

`pnpm visual-diff` compares each page section with a PNG export of the matching Figma frame. The PNGs are not committed, because the test design is confidential. Export them from the Figma file and save them here.

## How to export

1. Open the **Buzzvel FE Test 2026** file in Figma. View-only access is enough to export.
2. In the layers panel, select the frame listed in the table below. Select the section frame itself, not a child layer.
3. In the right sidebar, open **Export**, click **+**, and choose **1x** and **PNG**.
4. Click **Export <frame name>** and save the file with the name from the table.

Tip: select all ten frames of one breakpoint, set the export to 1x PNG once, and export them together. Then rename each file to the names below.

## Where to save

```
design/reference/
  desktop/   ← frames from "FE - Desktop" (1280 px wide)
  mobile/    ← frames from "FE - Mobile"  (402 px wide)
```

| File name          | Desktop frame (FE - Desktop → App → …) | Mobile frame (FE - Mobile → App → …)    |
| ------------------ | -------------------------------------- | --------------------------------------- |
| `header.png`       | Header                                 | Header                                  |
| `hero.png`         | Main Content → Hero                    | Main Content → Hero                     |
| `categories.png`   | Main Content → Categories              | Main Content → Categories               |
| `featured.png`     | Main Content → FeaturedCourse          | Main Content → FeaturedCourse           |
| `how-it-works.png` | Main Content → HowItWorks              | Main Content → HowItWorks               |
| `testimonial.png`  | Main Content → Testimonial             | Main Content → Testimonial              |
| `people.png`       | Main Content → Section                 | Main Content → Section                  |
| `contact.png`      | Main Content → contact-section         | Main Content → contact-section-mobile   |
| `final-cta.png`    | Main Content → FinalCTA                | Main Content → FinalCTA                 |
| `footer.png`       | Footer                                 | Footer                                  |

Notes:

- **Export at 1x** to get exact numbers. Other scales still work: the script resizes the render to the reference width, but resampling inflates the mismatch percentage.
- **Transparent exports are fine.** Frames without their own fill, such as the people "Section", export with a transparent background. The script fills it with the page background before comparing.
- **Missing files are skipped.** You can export only the sections you want to check.

## Run

```bash
pnpm build && pnpm start          # or: pnpm dev
pnpm visual-diff --url=http://localhost:3000
pnpm visual-diff --only=mobile --section=hero   # one breakpoint / one section
```

Results are printed as a table and saved to `design/visual-diff-report.json`. Diff images are written to `design/diff/<viewport>/`:

- `*.actual.png`: the rendered section.
- `*.diff.png`: differing pixels, in red.
- `*.overlay.png`: a 50% onion-skin overlay of the design and the render.

#!/usr/bin/env node
/**
 * Pixel-perfect check: captures every page section at the Figma frame widths
 * and compares it with the matching Figma export, pixel by pixel.
 *
 *   pnpm build && pnpm start          # or `pnpm dev`
 *   pnpm visual-diff [--url=http://localhost:3000] [--only=desktop|mobile] [--section=hero]
 *
 * For each section it reports:
 *   - size delta: rendered height vs. the Figma frame (layout/spacing drift)
 *   - mismatch: share of differing pixels over the shared area (pixelmatch)
 * and writes, to design/diff/<viewport>/:
 *   - <section>.actual.png   the rendered section (scaled to the reference width)
 *   - <section>.diff.png     differing pixels in red over a faded reference
 *   - <section>.overlay.png  50% onion-skin of reference and render
 *
 * Reference images live in design/reference/<viewport>/<section>.png (exported
 * from Figma; desktop sections may be exported at 0.8x, renders are scaled to match).
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pixelmatch from "pixelmatch";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  }),
);
const baseUrl = args.url ?? "http://localhost:3000";

const VIEWPORTS = {
  desktop: { width: 1280, height: 800 },
  mobile: { width: 402, height: 860 },
};

/** Page section → DOM selector. Names match the reference file names. */
const SECTIONS = [
  ["header", "header"],
  ["hero", "section[aria-labelledby=hero-title]"],
  ["categories", "#courses"],
  ["featured", "#featured-course"],
  ["how-it-works", "#how-it-works"],
  ["testimonial", "section[aria-labelledby=testimonial-title]"],
  ["people", "#community"],
  ["contact", "#contact"],
  ["final-cta", "section[aria-labelledby=cta-title]"],
  ["footer", "footer"],
];

/** Freeze everything that would make captures non-deterministic. */
const STABILITY_CSS = `
  *, *::before, *::after { animation: none !important; transition: none !important; caret-color: transparent !important; }
  header { position: relative !important; }
  nextjs-portal { display: none !important; }
`;

async function decode(buffer) {
  return PNG.sync.read(await sharp(buffer).ensureAlpha().png().toBuffer());
}

/** Crops/pads two images to a shared size so pixelmatch can compare them. */
function toSharedArea(a, b) {
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  const crop = (img) => {
    const out = new PNG({ width, height });
    PNG.bitblt(img, out, 0, 0, width, height, 0, 0);
    return out;
  };
  return [crop(a), crop(b), width, height];
}

async function compareSection(page, viewportName, name, selector, outDir) {
  const referencePath = path.join(root, "design/reference", viewportName, `${name}.png`);
  const referenceBuffer = await readFile(referencePath).catch(() => null);
  if (!referenceBuffer) return { section: name, note: "no reference" };

  const element = page.locator(selector).first();
  const box = await element.boundingBox();
  const shot = await element.screenshot({ animations: "disabled" });

  // Frames without their own fill export with a transparent background (it comes
  // from a parent frame in Figma): flatten them onto the page's background colour.
  const { data: corner } = await sharp(shot).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const background = { r: corner[0], g: corner[1], b: corner[2] };
  const reference = await decode(await sharp(referenceBuffer).flatten({ background }).png().toBuffer());
  const scale = reference.width / Math.round(box.width);
  // Desktop references exported at 0.8x: scale the render to the reference width.
  const actualBuffer =
    scale === 1
      ? shot
      : await sharp(shot).resize({ width: reference.width, kernel: "lanczos3" }).png().toBuffer();
  const actual = await decode(actualBuffer);

  const [ref, act, width, height] = toSharedArea(reference, actual);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(ref.data, act.data, diff.data, width, height, {
    threshold: 0.15,
    includeAA: false,
    alpha: 0.25,
    diffColor: [255, 0, 0],
  });

  const overlay = await sharp(PNG.sync.write(ref))
    .composite([{ input: await sharp(PNG.sync.write(act)).ensureAlpha(0.5).png().toBuffer(), blend: "over" }])
    .png()
    .toBuffer();

  await writeFile(path.join(outDir, `${name}.actual.png`), PNG.sync.write(actual));
  await writeFile(path.join(outDir, `${name}.diff.png`), PNG.sync.write(diff));
  await writeFile(path.join(outDir, `${name}.overlay.png`), overlay);

  return {
    section: name,
    "figma (px)": `${Math.round(reference.width / scale)}×${Math.round(reference.height / scale)}`,
    "render (px)": `${Math.round(box.width)}×${Math.round(box.height)}`,
    "height Δ": Math.round(box.height - reference.height / scale),
    "mismatch %": Number(((mismatched / (width * height)) * 100).toFixed(2)),
  };
}

async function run() {
  const browser = await chromium.launch({ channel: args.channel ?? "chrome" });
  const results = {};

  for (const [viewportName, viewport] of Object.entries(VIEWPORTS)) {
    if (args.only && args.only !== viewportName) continue;
    const outDir = path.join(root, "design/diff", viewportName);
    await mkdir(outDir, { recursive: true });

    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: STABILITY_CSS });
    // Load every lazy image, then return to the top.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 40));
      }
      window.scrollTo(0, 0);
      await document.fonts.ready;
      await Promise.all(
        [...document.images].map((img) =>
          img.complete ? null : new Promise((resolve) => img.addEventListener("load", resolve, { once: true })),
        ),
      );
    });

    results[viewportName] = [];
    for (const [name, selector] of SECTIONS) {
      if (args.section && args.section !== name) continue;
      results[viewportName].push(await compareSection(page, viewportName, name, selector, outDir));
    }
    await context.close();

    console.log(`\n${viewportName} (${viewport.width}px)`);
    console.table(results[viewportName]);
  }

  await browser.close();
  await writeFile(path.join(root, "design/diff/report.json"), JSON.stringify(results, null, 2));
  console.log("\nDiff images written to design/diff/");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

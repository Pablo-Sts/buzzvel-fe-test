#!/usr/bin/env node
/**
 * Browser accessibility audit: axe-core (WCAG 2.2 A/AA + best practices) in
 * real Chrome, so colour contrast and computed styles are checked too.
 *
 *   pnpm build && pnpm start          # or `pnpm dev`
 *   pnpm test:a11y [--url=http://localhost:3000]
 *
 * Audited states:
 *   desktop · mobile · mobile menu open · contact form showing errors
 * plus keyboard checks: the skip link is the first tab stop, becomes visible
 * on focus and moves focus to <main>; focused controls show an outline.
 * Exits with code 1 if anything fails.
 */
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright-core";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, value = "true"] = arg.replace(/^--/, "").split("=");
    return [key, value];
  }),
);
const baseUrl = args.url ?? "http://localhost:3000";
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const failures = [];
const rows = [];

async function audit(page, label) {
  const { violations, passes } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
  rows.push({ state: label, "rules passed": passes.length, violations: violations.length });
  for (const v of violations) {
    failures.push(`[${label}] ${v.id} (${v.impact}): ${v.help}\n    ${v.nodes.map((n) => n.target.join(" ")).join("\n    ")}`);
  }
}

function check(label, ok, detail) {
  rows.push({ state: label, "rules passed": ok ? "ok" : "—", violations: ok ? 0 : 1 });
  if (!ok) failures.push(`[${label}] ${detail}`);
}

async function open(browser, viewport) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle" });
  return { context, page };
}

async function run() {
  const browser = await chromium.launch({ channel: args.channel ?? "chrome" });

  // Desktop
  {
    const { context, page } = await open(browser, { width: 1280, height: 800 });
    await audit(page, "desktop 1280");

    // Keyboard: skip link first, visible when focused, moves focus to main.
    await page.keyboard.press("Tab");
    const skip = await page.evaluate(() => {
      const el = document.activeElement;
      const rect = el.getBoundingClientRect();
      return { text: el.textContent?.trim(), visible: rect.width > 1 && rect.height > 1 };
    });
    check("skip link is first tab stop", skip.text === "Skip to content", `first focus was "${skip.text}"`);
    check("skip link visible on focus", skip.visible, "skip link not visible when focused");
    await page.keyboard.press("Enter");
    const hash = await page.evaluate(() => location.hash);
    check("skip link targets main", hash === "#main", `hash after skip link: ${hash}`);

    // Focus visibility on a sample of controls.
    const noOutline = await page.evaluate(async () => {
      const controls = [...document.querySelectorAll("a[href], button, input, textarea")].slice(0, 40);
      const missing = [];
      for (const el of controls) {
        el.focus({ focusVisible: true });
        const style = getComputedStyle(el);
        const visible = style.outlineStyle !== "none" && parseFloat(style.outlineWidth) > 0;
        const ring = style.boxShadow && style.boxShadow !== "none";
        if (!visible && !ring && el.matches(":focus-visible")) missing.push(el.outerHTML.slice(0, 80));
      }
      return missing;
    });
    check("focus indicator on controls", noOutline.length === 0, `no focus indicator: ${noOutline.join(" | ")}`);

    // Contact form in its error state.
    await page.locator("#contact form button[type=submit]").click();
    await page.waitForSelector("#contact-name-error");
    await audit(page, "contact form with errors");
    await context.close();
  }

  // Mobile
  {
    const { context, page } = await open(browser, { width: 402, height: 860 });
    await audit(page, "mobile 402");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.waitForTimeout(300); // panel transition
    await audit(page, "mobile menu open");
    await context.close();
  }

  await browser.close();
  console.table(rows);
  if (failures.length) {
    console.error(`\n${failures.length} accessibility issue(s):\n\n${failures.join("\n\n")}`);
    process.exit(1);
  }
  console.log("\nNo accessibility violations found.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

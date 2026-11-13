import axe, { type AxeResults, type RunOptions } from "axe-core";

/** WCAG 2.2 A/AA rules plus axe best practices. */
export const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const options: RunOptions = {
  runOnly: { type: "tag", values: AXE_TAGS },
  // jsdom has no layout or computed colours; contrast is covered by the browser audit (pnpm test:a11y).
  rules: { "color-contrast": { enabled: false } },
  resultTypes: ["violations"],
};

/** Runs axe on a rendered tree and returns readable violation summaries. */
export async function axeViolations(context: Element | Document = document): Promise<string[]> {
  const results: AxeResults = await axe.run(context, options);
  return results.violations.map(
    (violation) =>
      `${violation.id} (${violation.impact}): ${violation.help}\n  ` +
      violation.nodes.map((node) => node.target.join(" ")).join("\n  "),
  );
}

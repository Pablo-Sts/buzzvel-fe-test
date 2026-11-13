import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import HomePage from "./page";

/**
 * Structural accessibility of the whole page (jsdom + axe-core).
 * Colour contrast and real focus visibility are checked in a browser by `pnpm test:a11y`.
 */
describe("Home page accessibility", () => {
  it("has no axe violations (WCAG 2.2 A/AA + best practices)", async () => {
    const { container } = render(<HomePage />);
    expect(await axeViolations(container)).toEqual([]);
  });

  it("exposes the page landmarks", () => {
    render(<HomePage />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
  });

  it("starts with a skip link to the main content", () => {
    render(<HomePage />);
    const [firstLink] = screen.getAllByRole("link");
    expect(firstLink).toHaveTextContent("Skip to content");
    expect(firstLink).toHaveAttribute("href", "#main");
  });

  it("has a single h1 and labels every section with a heading", () => {
    const { container } = render(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    for (const section of container.querySelectorAll("section")) {
      const labelId = section.getAttribute("aria-labelledby");
      expect(labelId, "every <section> is labelled").toBeTruthy();
      expect(container.querySelector(`#${labelId}`), `#${labelId} exists`).not.toBeNull();
    }
  });

  it("gives every image an alt attribute (empty only for decorative ones)", () => {
    const { container } = render(<HomePage />);
    const images = [...container.querySelectorAll("img")];
    expect(images.length).toBeGreaterThan(0);
    for (const image of images) expect(image).toHaveAttribute("alt");

    const contentPhotos = images.filter((image) => image.getAttribute("alt"));
    expect(contentPhotos.length).toBeGreaterThanOrEqual(13); // hero, course, testimonial, 10 collage photos
  });

  it("names links by their purpose, including the category cards", () => {
    render(<HomePage />);
    const courses = screen.getByRole("region", { name: "Learn something worth knowing." });
    const cardLinks = within(courses).getAllByRole("link");
    expect(cardLinks.map((link) => link.textContent)).toEqual([
      expect.stringContaining("Product Design courses"),
      expect.stringContaining("Technology courses"),
      expect.stringContaining("Business courses"),
      expect.stringContaining("Creative courses"),
    ]);
  });

  it("presents the stats as a description list and the quote as a figure", () => {
    render(<HomePage />);
    expect(screen.getAllByRole("term")).toHaveLength(3);
    expect(screen.getAllByRole("definition")).toHaveLength(3);
    expect(screen.getByRole("figure")).toHaveTextContent("Alex Morgan");
  });
});

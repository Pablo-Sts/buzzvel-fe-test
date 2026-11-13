import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axeViolations } from "@/test/axe";
import { MobileMenu } from "./MobileMenu";

const links = [
  { label: "Courses", href: "#courses" },
  { label: "About", href: "#how-it-works" },
];

function setup() {
  const user = userEvent.setup();
  // Rendered inside <header>, as on the page (the panel's buttons belong to the banner landmark).
  render(
    <header>
      <MobileMenu links={links} login={{ label: "Log in", href: "#contact" }} cta={{ label: "Start learning", href: "#courses" }} />
    </header>,
  );
  return { user, toggle: screen.getByRole("button", { name: "Open menu" }) };
}

describe("MobileMenu keyboard and screen reader behaviour", () => {
  it("is operable with the keyboard and announces its state", async () => {
    const { user, toggle } = setup();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls", "mobile-menu");

    await user.tab();
    expect(toggle).toHaveFocus();
    await user.keyboard("{Enter}");

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");
    expect(screen.getByRole("navigation", { name: "Mobile" })).toBeInTheDocument();
  });

  it("closes on Escape and returns focus to the toggle", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    await user.tab(); // into the panel
    expect(screen.getByRole("link", { name: "Courses" })).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveFocus();
  });

  it("closes after choosing a link", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    await user.click(screen.getByRole("link", { name: "About" }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("has no axe violations when open", async () => {
    const { user, toggle } = setup();
    await user.click(toggle);
    expect(await axeViolations(document.body)).toEqual([]);
  });
});

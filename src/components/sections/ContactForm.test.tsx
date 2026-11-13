import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./ContactForm";

vi.mock("@/lib/contact-service", () => ({
  submitContact: vi.fn(async () => ({ ok: true })),
}));

function setup() {
  const user = userEvent.setup();
  render(
    <>
      <h3 id="form-title">Contact us</h3>
      <ContactForm labelledBy="form-title" />
    </>,
  );
  return { user };
}

describe("ContactForm", () => {
  it("shows accessible errors and focuses the first invalid field on an empty submit", async () => {
    const { user } = setup();

    await user.click(screen.getByRole("button", { name: "Send message" }));

    const name = screen.getByRole("textbox", { name: "Full name" });
    expect(name).toHaveFocus();
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Please enter your name.");
    expect(screen.getByRole("textbox", { name: "Email" })).toHaveAccessibleDescription(
      "Please enter your email address.",
    );
  });

  it("submits valid data, confirms it and resets the form", async () => {
    const { user } = setup();

    await user.type(screen.getByRole("textbox", { name: "Full name" }), "Ana Silva");
    await user.type(screen.getByRole("textbox", { name: "Email" }), "ana@example.com");
    await user.type(screen.getByRole("textbox", { name: "Your question" }), "Do you offer team plans?");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByRole("status")).toHaveTextContent(/your message was sent/i);
    expect(screen.getByRole("textbox", { name: "Full name" })).toHaveValue("");
  });

  it("does not flag an untouched field when the user just tabs past it", async () => {
    const { user } = setup();

    await user.tab();
    await user.tab();

    expect(screen.getByRole("textbox", { name: "Full name" })).not.toHaveAttribute("aria-invalid");
  });
});

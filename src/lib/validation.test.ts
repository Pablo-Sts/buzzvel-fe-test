import { describe, expect, it } from "vitest";
import { hasErrors, isValidEmail, validateContact } from "./validation";

const valid = { name: "Ana Silva", email: "ana@example.com", message: "Do you offer team plans?" };

describe("validateContact", () => {
  it("accepts a complete, well-formed submission", () => {
    expect(validateContact(valid)).toEqual({});
    expect(hasErrors(validateContact(valid))).toBe(false);
  });

  it("requires every field, ignoring surrounding whitespace", () => {
    const errors = validateContact({ name: "  ", email: "", message: "\n" });
    expect(errors).toEqual({
      name: "Please enter your name.",
      email: "Please enter your email address.",
      message: "Please tell us how we can help.",
    });
  });

  it("rejects malformed emails", () => {
    expect(validateContact({ ...valid, email: "ana@example" }).email).toMatch(/valid email/);
    expect(isValidEmail("ana@example.com")).toBe(true);
    expect(isValidEmail("ana example@x.com")).toBe(false);
  });

  it("asks for a minimum level of detail in the message", () => {
    expect(validateContact({ ...valid, message: "Hi" }).message).toMatch(/at least 10 characters/);
  });
});

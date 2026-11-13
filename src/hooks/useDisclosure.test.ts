import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("toggles and closes on Escape", () => {
    const { result } = renderHook(() => useDisclosure());

    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);

    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });
    expect(result.current.isOpen).toBe(false);
  });

  it("locks body scroll while open and restores it on close", () => {
    const { result } = renderHook(() => useDisclosure({ lockScroll: true }));

    act(() => result.current.open());
    expect(document.body.style.overflow).toBe("hidden");

    act(() => result.current.close());
    expect(document.body.style.overflow).toBe("");
  });
});

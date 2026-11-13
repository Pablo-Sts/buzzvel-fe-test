"use client";

import { useCallback, useEffect, useState } from "react";

interface UseDisclosureOptions {
  /** Close automatically once this media query matches (e.g. the desktop breakpoint). */
  closeWhenMatches?: string;
  /** Prevent the page behind from scrolling while open. */
  lockScroll?: boolean;
}

/**
 * Open/closed state for menus and dialogs: Escape closes it, the body scroll
 * can be locked while open and it resets when the layout no longer needs it.
 */
export function useDisclosure({ closeWhenMatches, lockScroll = false }: UseDisclosureOptions = {}) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !lockScroll) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen, lockScroll]);

  useEffect(() => {
    if (!isOpen || !closeWhenMatches) return;
    const query = window.matchMedia(closeWhenMatches);
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, [isOpen, closeWhenMatches]);

  return { isOpen, open, close, toggle };
}

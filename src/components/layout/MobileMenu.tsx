"use client";

import { useEffect, useRef } from "react";
import type { NavLink } from "@/types/content";
import { useDisclosure } from "@/hooks/useDisclosure";
import { cn } from "@/lib/cn";
import { Button, CloseIcon, MenuIcon } from "@/components/ui";

interface MobileMenuProps {
  links: NavLink[];
  login: NavLink;
  cta: NavLink;
}

const PANEL_ID = "mobile-menu";
const DESKTOP_QUERY = "(min-width: 64rem)";

/** Toggle + dropdown panel shown below the `lg` breakpoint. Presentation only. */
export function MobileMenu({ links, login, cta }: MobileMenuProps) {
  const { isOpen, toggle, close } = useDisclosure({ closeWhenMatches: DESKTOP_QUERY, lockScroll: true });
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Return focus to the toggle when the menu closes with focus inside it (e.g. Escape).
  useEffect(() => {
    if (!isOpen && panelRef.current?.contains(document.activeElement)) {
      toggleRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        className="-mr-1.5 flex size-9 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/5"
        aria-expanded={isOpen}
        aria-controls={PANEL_ID}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={toggle}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      <div
        ref={panelRef}
        id={PANEL_ID}
        className={cn(
          "absolute inset-x-0 top-full h-[calc(100dvh-69px)] border-t border-line bg-surface-warm px-5 pt-6 pb-10 md:px-10",
          "transition-[opacity,transform,visibility] duration-200 ease-out",
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0",
        )}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label} className="border-b border-line">
                <a href={link.href} onClick={close} className="block py-4 text-title text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 flex flex-col gap-3">
          <Button href={cta.href} fullWidth onClick={close}>
            {cta.label}
          </Button>
          <Button href={login.href} variant="secondary" fullWidth onClick={close}>
            {login.label}
          </Button>
        </div>
      </div>
    </div>
  );
}

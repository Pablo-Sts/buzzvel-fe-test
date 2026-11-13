import type { NavLink } from "@/types/content";
import { Button, Container, LogoIcon } from "@/components/ui";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  links: NavLink[];
  login: NavLink;
  cta: NavLink;
}

/** Site header. Server-rendered; only the mobile menu toggle ships JavaScript. */
export function Header({ links, login, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface-warm">
      <Container className="relative grid h-[68px] grid-cols-[1fr_auto] items-center lg:h-[69px] lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" className="w-fit rounded-sm text-ink" aria-label="Luma, back to top">
          <LogoIcon />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-body text-ink-secondary transition-colors hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center justify-end gap-2 lg:flex">
          <a
            href={login.href}
            className="rounded-lg px-4 py-2.5 text-body text-ink-secondary transition-colors hover:text-ink"
          >
            {login.label}
          </a>
          <Button href={cta.href} size="sm">
            {cta.label}
          </Button>
        </div>

        <MobileMenu links={links} login={login} cta={cta} />
      </Container>
    </header>
  );
}

import type { FooterColumn } from "@/types/content";
import { Container, LogoIcon } from "@/components/ui";

interface FooterProps {
  tagline: string;
  copyright: string;
  columns: FooterColumn[];
}

export function Footer({ tagline, copyright, columns }: FooterProps) {
  return (
    <footer className="bg-ink pt-[60px] pb-5 text-on-dark lg:pt-20 lg:pb-10">
      <Container>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-8">
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" className="block w-fit rounded-sm text-on-dark" aria-label="Luma, back to top">
              <LogoIcon className="block" />
            </a>
            <p className="mt-3 text-body text-on-dark-tertiary lg:max-w-[240px]">{tagline}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-labelledby={`footer-${column.title.toLowerCase()}`}>
              <h2 id={`footer-${column.title.toLowerCase()}`} className="text-overline text-on-dark-secondary">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-3 text-body">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-body text-on-dark-tertiary transition-colors hover:text-on-dark focus-visible:outline-on-dark"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-9 border-t border-ink-secondary pt-6 lg:mt-16">
          <p className="text-center text-[13px] leading-[19.5px] text-on-dark-secondary lg:text-left">{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}

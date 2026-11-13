import Image from "next/image";
import type { Stat, Testimonial as TestimonialContent } from "@/types/content";
import { Container, QuoteIcon, Section, VisuallyHidden } from "@/components/ui";

interface TestimonialProps {
  testimonial: TestimonialContent;
  stats: Stat[];
}

export function Testimonial({ testimonial, stats }: TestimonialProps) {
  return (
    <Section aria-labelledby="testimonial-title">
      <VisuallyHidden>
        <h2 id="testimonial-title">What learners say</h2>
      </VisuallyHidden>
      <Container className="flex flex-col gap-[60px] lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <figure className="max-w-[600px] lg:flex-1">
          <QuoteIcon className="text-brand" />
          <blockquote className="mt-4 text-quote text-ink">
            <p>{testimonial.quote}</p>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-4">
            <Image
              src={testimonial.avatar.src}
              alt={testimonial.avatar.alt}
              width={48}
              height={48}
              className="size-12 rounded-full bg-brand-soft object-cover"
            />
            <span className="flex flex-col">
              <span className="text-[16px] leading-7 font-bold text-ink">{testimonial.author}</span>
              <span className="text-body text-ink-secondary">{testimonial.role}</span>
            </span>
          </figcaption>
        </figure>

        <dl className="grid grid-cols-3 gap-5 lg:w-[401px] lg:shrink-0 lg:grid-cols-1 lg:border-l lg:border-line lg:pl-12">
          {stats.map((stat) => (
            // dt must precede dd in the markup; column-reverse shows the value first.
            <div key={stat.label} className="flex flex-col-reverse justify-end">
              <dt className="mt-1 text-body text-ink-tertiary">{stat.label}</dt>
              <dd className="text-display-1 whitespace-nowrap text-brand">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}

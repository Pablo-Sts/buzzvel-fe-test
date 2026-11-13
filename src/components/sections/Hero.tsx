import Image from "next/image";
import type { ImageAsset, NavLink } from "@/types/content";
import { AvatarStack, Button, Container, Heading, Overline, StarIcon, Text, VisuallyHidden } from "@/components/ui";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: NavLink;
  secondaryAction: NavLink;
  socialProof: { highlight: string; text: string; avatars: ImageAsset[] };
  image: ImageAsset;
  badges: {
    courses: { value: string; label: string };
    rating: { value: number; label: string };
  };
}

export function Hero({ eyebrow, title, description, primaryAction, secondaryAction, socialProof, image, badges }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip bg-surface-warm py-[60px] lg:py-[100px]">
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-[60px]">
        <div className="flex flex-col md:max-w-[600px] lg:max-w-none lg:flex-1">
          <Overline>{eyebrow}</Overline>
          <Heading as="h1" id="hero-title" size="display-1" className="mt-4">
            {title}
          </Heading>
          <Text size="lead" className="mt-6 max-w-[480px] text-ink-secondary">
            {description}
          </Text>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryAction.href} className="w-full sm:w-auto">
              {primaryAction.label}
            </Button>
            <Button href={secondaryAction.href} variant="secondary" className="w-full sm:w-auto">
              {secondaryAction.label}
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3 sm:justify-start">
            <AvatarStack avatars={socialProof.avatars} />
            <p className="text-body text-ink-secondary">
              <strong className="font-bold text-ink">{socialProof.highlight}</strong> {socialProof.text}
            </p>
          </div>
        </div>

        <HeroVisual image={image} badges={badges} />
      </Container>
    </section>
  );
}

function HeroVisual({ image, badges }: Pick<HeroProps, "image" | "badges">) {
  return (
    // Rendered first on mobile, as in the mobile frame.
    <div className="relative order-first mx-auto w-[calc(100%-16px)] max-w-[500px] self-start lg:order-none lg:mx-0 lg:w-[500px] lg:shrink-0">
      {/* Decorative shapes behind the photo */}
      <div aria-hidden="true" className="absolute top-[4.6%] left-[90%] h-[90%] w-[17.8%] rounded-2xl bg-accent-soft" />
      <div
        aria-hidden="true"
        className="absolute top-[77.5%] left-[-9%] aspect-square w-[21.2%] rounded-full bg-brand-soft"
      />

      <div className="relative aspect-[500/520] overflow-hidden rounded-3xl bg-brand-soft">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          preload
          sizes="(min-width: 1024px) 500px, (min-width: 540px) 500px, calc(100vw - 56px)"
          className="object-cover"
        />
      </div>

      <div className="absolute top-[1.5%] left-[-8px] flex items-center gap-3 rounded-xl bg-surface px-4 py-3 shadow-float motion-safe:animate-float lg:top-4 lg:left-[-22px]">
        <span className="flex h-8 items-center rounded-lg bg-brand-soft px-1 text-body font-bold text-brand">
          {badges.courses.value}
        </span>
        <span className="text-body text-ink">{badges.courses.label}</span>
      </div>

      <div className="absolute right-[-18px] bottom-[7%] flex items-center gap-2 rounded-xl bg-surface px-4 py-3 shadow-float motion-safe:animate-float motion-safe:[animation-delay:-3s]">
        <span className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }, (_, index) => (
            <StarIcon key={index} />
          ))}
        </span>
        <VisuallyHidden>Rated {badges.rating.value} out of 5:</VisuallyHidden>
        <span className="text-body text-ink">{badges.rating.label}</span>
      </div>
    </div>
  );
}

import type { ImageAsset, NavLink } from "@/types/content";
import {
  AvatarStack,
  Button,
  Container,
  DecoBookIcon,
  DecoBubbleIcon,
  DecoCubeIcon,
  DecoDropIcon,
  DecoLetterIcon,
  Heading,
  Section,
  Text,
} from "@/components/ui";

interface FinalCtaProps {
  title: string;
  description: string;
  avatars: ImageAsset[];
  primaryAction: NavLink;
  secondaryAction: NavLink;
}

export function FinalCta({ title, description, avatars, primaryAction, secondaryAction }: FinalCtaProps) {
  return (
    <Section tone="yellow" aria-labelledby="cta-title" className="overflow-hidden">
      <Decorations />
      <Container className="relative flex max-w-[720px] flex-col items-center text-center lg:px-8">
        <AvatarStack avatars={avatars} size={40} ringClassName="border-highlight" />
        <Heading id="cta-title" size="display-2" className="mt-8">
          {title}
        </Heading>
        <Text size="lead" className="mt-4 text-ink-secondary">
          {description}
        </Text>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button href={primaryAction.href} className="w-full sm:w-auto">
            {primaryAction.label}
          </Button>
          <Button href={secondaryAction.href} variant="secondary" className="w-full sm:w-auto">
            {secondaryAction.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Floating shapes and line icons from the desktop frame. Horizontal positions
 * are percentages of the 1280px frame so they spread with the viewport.
 * Hidden on smaller screens, as in the mobile design.
 */
function Decorations() {
  const orange = "border-accent-soft";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
      <span className={`absolute top-4 left-[1.7%] size-[108px] rounded-full border-2 ${orange}`} />
      <span className="absolute top-[373px] left-[4.4%] size-[120px] rounded-full bg-accent-soft" />
      <span className="absolute top-[468px] left-[83.1%] size-10 rounded-full bg-accent-soft" />
      <span className="absolute top-[-14px] left-[90.2%] size-[115px] rotate-12 rounded-lg bg-accent-soft" />
      <span className="absolute top-[235px] left-[-2.2%] size-14 rotate-12 rounded-lg bg-accent-soft" />
      <span className={`absolute top-[429px] left-[94.4%] size-8 rounded-full border-2 ${orange}`} />
      <span className={`absolute top-[43px] left-[68.5%] size-8 rounded-full border-2 ${orange}`} />
      <span className={`absolute top-[47px] left-[25.1%] size-14 rotate-12 rounded-lg border ${orange}`} />
      <DecoLetterIcon className="absolute top-[369px] left-[21.95%] rotate-15" />
      <DecoCubeIcon className="absolute top-[180px] left-[84.4%]" />
      <DecoBubbleIcon className="absolute top-[214px] left-[11%]" />
      <DecoDropIcon className="absolute top-[82px] left-[79.4%]" />
      <DecoBookIcon className="absolute top-[381px] left-[75.2%]" />
    </div>
  );
}

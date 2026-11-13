import type { CollageColumn, NavLink } from "@/types/content";
import { Button, Container, Heading, Overline, Section, Text } from "@/components/ui";
import { PhotoCollage } from "./PhotoCollage";

interface PeopleProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  action: NavLink;
  collage: CollageColumn[];
}

export function People({ id, eyebrow, title, description, action, collage }: PeopleProps) {
  return (
    <Section id={id} tone="warm" aria-labelledby="people-title" className="overflow-x-clip">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-[60px]">
        <div className="flex flex-col items-start lg:flex-1">
          <Overline>{eyebrow}</Overline>
          <Heading id="people-title" className="mt-2">
            {title}
          </Heading>
          {/* Mobile frame uses text-primary for this paragraph, desktop uses text-secondary. */}
          <Text size="lead" className="mt-6 text-ink lg:mt-8 lg:text-ink-secondary">
            {description}
          </Text>
          <Button href={action.href} variant="secondary" className="mt-6 lg:mt-8">
            {action.label}
          </Button>
        </div>
        <div className="flex lg:flex-1">
          <PhotoCollage columns={collage} />
        </div>
      </Container>
    </Section>
  );
}

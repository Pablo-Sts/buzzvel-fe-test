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
      <Container className="flex flex-col gap-[60px] lg:flex-row lg:items-center">
        <div className="flex flex-col items-start lg:flex-1">
          <Overline>{eyebrow}</Overline>
          <Heading id="people-title" className="mt-2">
            {title}
          </Heading>
          <Text size="lead" className="mt-8 text-ink-secondary">
            {description}
          </Text>
          <Button href={action.href} variant="secondary" className="mt-8">
            {action.label}
          </Button>
        </div>
        <div className="flex justify-center lg:flex-1">
          <PhotoCollage columns={collage} />
        </div>
      </Container>
    </Section>
  );
}

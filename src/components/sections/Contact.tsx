import type { ContactChannel } from "@/types/content";
import { Container, Heading, Section, SectionHeader, Text } from "@/components/ui";
import { ContactForm } from "./ContactForm";
import { ContactInfoCard } from "./ContactInfoCard";

interface ContactProps {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  formTitle: string;
  formDescription: string;
  channels: ContactChannel[];
}

export function Contact({ id, eyebrow, title, description, formTitle, formDescription, channels }: ContactProps) {
  return (
    <Section id={id} aria-labelledby="contact-title">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-8 lg:w-[480px] lg:gap-10">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            titleId="contact-title"
            description={description}
            // Mobile frame sets this paragraph in body 1 (14/24) instead of subtitle 1.
            descriptionClassName="max-lg:text-body"
          />
          <ul className="flex flex-col gap-4">
            {channels.map((channel) => (
              <li key={channel.label}>
                <ContactInfoCard channel={channel} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-surface px-5 py-6 shadow-card sm:p-10 lg:w-[540px] lg:shrink-0">
          <Heading as="h3" size="title" id="contact-form-title">
            {formTitle}
          </Heading>
          <Text className="mt-2 text-ink-secondary">{formDescription}</Text>
          <ContactForm labelledBy="contact-form-title" className="mt-6" />
        </div>
      </Container>
    </Section>
  );
}

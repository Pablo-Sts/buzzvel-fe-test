import type { Step } from "@/types/content";
import { Container, Section, SectionHeader } from "@/components/ui";
import { StepItem } from "./StepItem";

interface HowItWorksProps {
  id: string;
  eyebrow: string;
  title: string;
  steps: Step[];
}

export function HowItWorks({ id, eyebrow, title, steps }: HowItWorksProps) {
  return (
    <Section id={id} tone="warm" aria-labelledby="how-title">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={title} titleId="how-title" align="center" />
        {/* The ::before line connects the step icons on desktop. lg:mt-[77px]: Figma clips the heading box to 69px (3px under its line box), then 80px margin. */}
        <ol className="relative mt-10 grid gap-[74px] lg:mt-[77px] lg:grid-cols-3 lg:gap-20 lg:py-7 lg:before:absolute lg:before:top-[56px] lg:before:left-[4.6%] lg:before:h-px lg:before:w-[68%] lg:before:bg-line">
          {steps.map((step, index) => (
            <StepItem key={step.title} step={step} number={index + 1} isFirst={index === 0} />
          ))}
        </ol>
      </Container>
    </Section>
  );
}

import type { Step, StepIconVariant } from "@/types/content";
import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui";

interface StepItemProps {
  step: Step;
  number: number;
  isFirst: boolean;
}

export function StepItem({ step, number, isFirst }: StepItemProps) {
  return (
    <li
      className={cn(
        "relative flex flex-col",
        // Vertical connector between stacked steps (mobile/tablet only)
        !isFirst && "before:absolute before:-top-[48px] before:left-7 before:h-12 before:w-px before:bg-line lg:before:hidden",
      )}
    >
      <StepIcon variant={step.icon} />
      <p className="mt-6 text-overline text-ink-tertiary">Step {String(number).padStart(2, "0")}</p>
      <Heading as="h3" size="title" className="mt-2.5 lg:mt-2">
        {step.title}
      </Heading>
      <Text size="body-lg" className="mt-3.5 text-ink-secondary lg:mt-3">
        {step.description}
      </Text>
    </li>
  );
}

/** The three abstract step illustrations, built from the shapes in the design. */
function StepIcon({ variant }: { variant: StepIconVariant }) {
  return (
    <span aria-hidden="true" className="relative z-10 block size-14 shrink-0">
      {variant === "square" ? (
        <span className="absolute inset-0 rounded-full bg-brand-soft">
          <span className="absolute top-2 left-2 size-6 rounded-md bg-brand" />
        </span>
      ) : null}
      {variant === "tilted" ? (
        <>
          <span className="absolute inset-0 rotate-12 rounded-lg bg-accent-soft" />
          <span className="absolute top-6 left-6 size-7 rounded-full bg-accent" />
        </>
      ) : null}
      {variant === "dot" ? (
        <span className="absolute inset-0 rounded-xl bg-surface-yellow">
          <span className="absolute top-7 left-2 size-5 rounded-full bg-highlight-dot" />
        </span>
      ) : null}
    </span>
  );
}

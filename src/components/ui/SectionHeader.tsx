import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Heading, Overline, Text } from "./Typography";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  /** id used by the parent <section aria-labelledby>. */
  titleId: string;
  description?: ReactNode;
  align?: "start" | "center";
  /** Overrides the lead paragraph style where a frame uses a different text style. */
  descriptionClassName?: string;
  className?: string;
}

/** Eyebrow + heading + optional lead paragraph, the opening block of most sections. */
export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  align = "start",
  descriptionClassName,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      <Overline>{eyebrow}</Overline>
      <Heading id={titleId} className="mt-4">
        {title}
      </Heading>
      {description ? (
        <Text size="lead" className={cn("mt-4 text-ink-secondary", descriptionClassName)}>
          {description}
        </Text>
      ) : null}
    </div>
  );
}

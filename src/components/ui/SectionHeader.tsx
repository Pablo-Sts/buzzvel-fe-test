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
  className?: string;
}

/** Eyebrow + heading + optional lead paragraph, the opening block of most sections. */
export function SectionHeader({ eyebrow, title, titleId, description, align = "start", className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", align === "center" && "items-center text-center", className)}>
      <Overline>{eyebrow}</Overline>
      <Heading id={titleId} className="mt-4">
        {title}
      </Heading>
      {description ? (
        <Text size="lead" className="mt-4 text-ink-secondary">
          {description}
        </Text>
      ) : null}
    </div>
  );
}

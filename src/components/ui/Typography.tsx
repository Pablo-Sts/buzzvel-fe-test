import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = "h1" | "h2" | "h3";
export type HeadingSize = "display-1" | "display-2" | "display-3" | "title";

const headingSizes: Record<HeadingSize, string> = {
  "display-1": "text-display-1",
  "display-2": "text-display-2",
  "display-3": "text-display-3",
  title: "text-title",
};

interface HeadingProps extends ComponentPropsWithoutRef<"h2"> {
  /** Semantic level; kept independent from the visual size. */
  as?: HeadingLevel;
  size?: HeadingSize;
}

export function Heading({ as: Tag = "h2", size = "display-3", className, ...props }: HeadingProps) {
  return <Tag className={cn(headingSizes[size], className)} {...props} />;
}

interface OverlineProps extends ComponentPropsWithoutRef<"p"> {
  tone?: "brand" | "muted" | "inverse";
}

const overlineTones = {
  brand: "text-brand",
  muted: "text-ink-tertiary",
  inverse: "text-on-dark",
} as const;

/** Small uppercase label shown above section headings ("eyebrow"). */
export function Overline({ tone = "brand", className, ...props }: OverlineProps) {
  return <p className={cn("text-overline", overlineTones[tone], className)} {...props} />;
}

export type TextSize = "lead" | "body-lg" | "body";

const textSizes: Record<TextSize, string> = {
  lead: "text-lead",
  "body-lg": "text-body-lg",
  body: "text-body",
};

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: ElementType;
  size?: TextSize;
}

export function Text({ as: Tag = "p", size = "body", className, ...props }: TextProps) {
  return <Tag className={cn(textSizes[size], className)} {...props} />;
}

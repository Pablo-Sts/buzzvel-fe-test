import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type SectionTone = "white" | "warm" | "brand" | "yellow" | "dark";

const tones: Record<SectionTone, string> = {
  white: "bg-surface text-ink",
  warm: "bg-surface-warm text-ink",
  brand: "bg-brand text-on-dark",
  yellow: "bg-surface-yellow text-ink",
  dark: "bg-ink text-on-dark",
};

interface SectionProps extends ComponentPropsWithoutRef<"section"> {
  tone?: SectionTone;
}

/** Page band with the vertical rhythm of the design: 60px on mobile, 100px on desktop. */
export function Section({ tone = "white", className, ...props }: SectionProps) {
  return <section className={cn("relative py-[60px] lg:py-[100px]", tones[tone], className)} {...props} />;
}

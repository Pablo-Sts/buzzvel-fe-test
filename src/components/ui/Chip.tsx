import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Outlined metadata pill (e.g. "8 lessons"). */
export function Chip({ className, ...props }: ComponentPropsWithoutRef<"li">) {
  return <li className={cn("rounded-lg border border-line px-3.5 py-1.5 text-body", className)} {...props} />;
}

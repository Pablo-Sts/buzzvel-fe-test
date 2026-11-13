import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

/** Horizontal page gutter + max content width (1120px, as in the 1280px Figma frame). */
export function Container({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20", className)} {...props} />;
}

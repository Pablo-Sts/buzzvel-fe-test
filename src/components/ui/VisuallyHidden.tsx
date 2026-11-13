import type { ComponentPropsWithoutRef } from "react";

/** Content available to assistive technology but not rendered visually. */
export function VisuallyHidden(props: ComponentPropsWithoutRef<"span">) {
  return <span className="sr-only" {...props} />;
}

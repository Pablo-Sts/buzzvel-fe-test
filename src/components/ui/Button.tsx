import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "highlight" | "ghost-light";
export type ButtonSize = "sm" | "md";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretches the button to the container width (used on mobile layouts). */
  fullWidth?: boolean;
  icon?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-body font-bold text-center whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "motion-safe:active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-brand text-on-dark hover:bg-brand-strong",
  secondary: "border border-line bg-surface text-ink hover:border-ink/40 hover:bg-surface-warm",
  highlight: "bg-highlight text-ink hover:bg-[#ffe54d]",
  // Figma uses #e7e7ec here (4.46:1 on blue); white keeps the look and passes WCAG AA.
  "ghost-light": "text-on-dark hover:underline underline-offset-4 focus-visible:outline-on-dark",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
};

export function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ButtonStyleProps & { className?: string }) {
  return cn(base, variants[variant], sizes[size], fullWidth && "w-full", className);
}

type ButtonAsLink = ButtonStyleProps & ComponentPropsWithoutRef<"a"> & { href: string };
type ButtonAsButton = ButtonStyleProps & ComponentPropsWithoutRef<"button"> & { href?: undefined };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Call-to-action primitive. Renders an anchor when `href` is given (in-page
 * navigation) and a native button otherwise, keeping all native attributes.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, fullWidth, icon, className, children, ...anchorProps } = props;
    return (
      <a className={buttonClassName({ variant, size, fullWidth, className })} {...anchorProps}>
        {children}
        {icon}
      </a>
    );
  }

  const { variant, size, fullWidth, icon, className, children, type = "button", ...buttonProps } = props;
  return (
    <button type={type} className={buttonClassName({ variant, size, fullWidth, className })} {...buttonProps}>
      {children}
      {icon}
    </button>
  );
}

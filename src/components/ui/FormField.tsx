import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const controlBase =
  "w-full rounded-lg border bg-surface-warm px-4 text-body text-ink placeholder:text-ink-tertiary " +
  "transition-[border-color,box-shadow] duration-200 hover:border-ink/30 " +
  "focus:outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25";

const controlState = (invalid: boolean) =>
  invalid ? "border-accent focus-visible:border-accent focus-visible:ring-accent/25" : "border-line";

interface FieldShellProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Label + control + error message, with the ids the control needs for aria wiring. */
function FieldShell({ id, label, error, children }: FieldShellProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-body font-bold text-ink">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-body text-[#c2410c]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const a11yProps = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<"input">, "id"> {
  id: string;
  label: string;
  error?: string;
}

export function TextField({ id, label, error, className, ...inputProps }: TextFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <input
        className={cn(controlBase, controlState(Boolean(error)), "h-12", className)}
        {...a11yProps(id, error)}
        {...inputProps}
      />
    </FieldShell>
  );
}

interface TextAreaFieldProps extends Omit<ComponentPropsWithoutRef<"textarea">, "id"> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({ id, label, error, className, ...textareaProps }: TextAreaFieldProps) {
  return (
    <FieldShell id={id} label={label} error={error}>
      <textarea
        className={cn(controlBase, controlState(Boolean(error)), "min-h-[120px] resize-y py-3.5", className)}
        {...a11yProps(id, error)}
        {...textareaProps}
      />
    </FieldShell>
  );
}

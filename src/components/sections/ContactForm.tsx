"use client";

import { useRef } from "react";
import { useContactForm } from "@/hooks/useContactForm";
import { cn } from "@/lib/cn";
import { Button, TextAreaField, TextField } from "@/components/ui";

interface ContactFormProps {
  labelledBy: string;
  className?: string;
}

const FIELD_IDS = { name: "contact-name", email: "contact-email", message: "contact-message" } as const;

/** Contact form UI. State, validation and submission live in `useContactForm`. */
export function ContactForm({ labelledBy, className }: ContactFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { values, errors, status, isSubmitting, handleChange, handleBlur, handleSubmit } = useContactForm({
    onInvalid: (field) => formRef.current?.querySelector<HTMLElement>(`#${FIELD_IDS[field]}`)?.focus(),
  });

  return (
    <form
      ref={formRef}
      aria-labelledby={labelledBy}
      noValidate
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
    >
      <div className="flex flex-col gap-5">
        <TextField
          id={FIELD_IDS.name}
          name="name"
          label="Full name"
          placeholder="Your name"
          autoComplete="name"
          required
          value={values.name}
          error={errors.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id={FIELD_IDS.email}
          name="email"
          type="email"
          label="Email"
          placeholder="youremail@example.com"
          autoComplete="email"
          inputMode="email"
          required
          value={values.email}
          error={errors.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextAreaField
          id={FIELD_IDS.message}
          name="message"
          label="Your question"
          placeholder="Tell us how we can help..."
          required
          value={values.message}
          error={errors.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      {/* aria-disabled (not disabled) keeps keyboard focus on the button while sending. */}
      <Button type="submit" fullWidth aria-disabled={isSubmitting} className="aria-disabled:cursor-wait aria-disabled:opacity-70">
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>

      <p role="status" aria-live="polite" className={cn("text-body empty:hidden", status === "error" ? "text-[#c2410c]" : "text-[#15803d]")}>
        {status === "success" ? "Thanks! Your message was sent — we’ll reply within 24 hours on business days." : null}
        {status === "error" ? "Something went wrong. Please try again in a moment." : null}
      </p>
    </form>
  );
}

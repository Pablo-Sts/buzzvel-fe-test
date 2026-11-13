"use client";

import { useCallback, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import { submitContact as defaultSubmit, type SubmitContact } from "@/lib/contact-service";
import {
  hasErrors,
  validateContact,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/validation";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

type FieldName = keyof ContactFormValues;
type FieldElement = HTMLInputElement | HTMLTextAreaElement;

const INITIAL_VALUES: ContactFormValues = { name: "", email: "", message: "" };
const FIELD_ORDER: FieldName[] = ["name", "email", "message"];

interface UseContactFormOptions {
  /** Injected transport; defaults to the mock service. */
  submit?: SubmitContact;
  /** Called with the first invalid field after a failed submit (e.g. to move focus). */
  onInvalid?: (field: FieldName) => void;
}

/**
 * State and rules for the contact form. Errors show once a field was touched
 * (blur) or after a submit attempt, and update live while the user fixes them.
 */
export function useContactForm({ submit = defaultSubmit, onInvalid }: UseContactFormOptions = {}) {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<ContactFormStatus>("idle");

  const allErrors = validateContact(values);
  const errors: ContactFormErrors = Object.fromEntries(
    FIELD_ORDER.filter((field) => touched[field]).map((field) => [field, allErrors[field]]),
  );

  const handleChange = useCallback((event: ChangeEvent<FieldElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setStatus((current) => (current === "success" || current === "error" ? "idle" : current));
  }, []);

  const handleBlur = useCallback((event: FocusEvent<FieldElement>) => {
    const { name, value } = event.target;
    // Leaving an untouched empty field should not shout at the user.
    if (!value && !touched[name as FieldName]) return;
    setTouched((current) => ({ ...current, [name]: true }));
  }, [touched]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "submitting") return;

      setTouched({ name: true, email: true, message: true });
      const currentErrors = validateContact(values);
      if (hasErrors(currentErrors)) {
        const firstInvalid = FIELD_ORDER.find((field) => currentErrors[field]);
        if (firstInvalid) onInvalid?.(firstInvalid);
        return;
      }

      setStatus("submitting");
      try {
        const result = await submit(values);
        if (!result.ok) throw new Error("Submission failed");
        setStatus("success");
        setValues(INITIAL_VALUES);
        setTouched({});
      } catch {
        setStatus("error");
      }
    },
    [onInvalid, status, submit, values],
  );

  return {
    values,
    errors,
    status,
    isSubmitting: status === "submitting",
    handleChange,
    handleBlur,
    handleSubmit,
  };
}

import type { ContactFormValues } from "./validation";

export interface ContactSubmissionResult {
  ok: boolean;
}

export type SubmitContact = (values: ContactFormValues) => Promise<ContactSubmissionResult>;

/**
 * Mock transport for the contact form (the challenge needs no backend).
 * Replace with a fetch to a real endpoint or a Server Action; the hook and
 * the UI only depend on the `SubmitContact` signature.
 */
export const submitContact: SubmitContact = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { ok: true };
};

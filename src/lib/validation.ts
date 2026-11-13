export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const CONTACT_LIMITS = {
  nameMin: 2,
  messageMin: 10,
  messageMax: 1000,
} as const;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

/** Validates the contact form. Pure function: same input, same errors. */
export function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < CONTACT_LIMITS.nameMin) errors.name = "Your name looks too short.";

  if (!email) errors.email = "Please enter your email address.";
  else if (!isValidEmail(email)) errors.email = "Please enter a valid email, like name@example.com.";

  if (!message) errors.message = "Please tell us how we can help.";
  else if (message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Please add a little more detail (at least ${CONTACT_LIMITS.messageMin} characters).`;
  else if (message.length > CONTACT_LIMITS.messageMax)
    errors.message = `Please keep it under ${CONTACT_LIMITS.messageMax} characters.`;

  return errors;
}

export function hasErrors(errors: ContactFormErrors): boolean {
  return Object.values(errors).some(Boolean);
}

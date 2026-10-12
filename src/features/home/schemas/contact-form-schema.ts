import { z } from 'zod';

export type ContactFormMessages = {
  nameRequired: string;
  emailInvalid: string;
  messageTooShort: string;
};

/** Built per language so the validation messages follow the page. */
export function createContactFormSchema(messages: ContactFormMessages) {
  return z.object({
    name: z.string().trim().min(1, messages.nameRequired),
    email: z.string().trim().pipe(z.email(messages.emailInvalid)),
    message: z.string().trim().min(20, messages.messageTooShort),
  });
}

type ContactFormSchema = ReturnType<typeof createContactFormSchema>;

export type ContactFormInput = z.input<ContactFormSchema>;
export type ContactRequest = z.output<ContactFormSchema>;

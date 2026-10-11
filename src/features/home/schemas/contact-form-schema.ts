import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Tell me your name.'),
  email: z.string().trim().pipe(z.email('Enter a valid email address.')),
  message: z
    .string()
    .trim()
    .min(20, 'Add a few more details (at least 20 characters).'),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactRequest = z.output<typeof contactFormSchema>;

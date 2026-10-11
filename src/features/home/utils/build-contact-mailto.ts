import type { ContactRequest } from '@/features/home/schemas/contact-form-schema';

/** Pre-filled mailto link carrying every answer of the contact form. */
export function buildContactMailto(request: ContactRequest, to: string) {
  const subject = encodeURIComponent(`Hello from ${request.name}`);
  const body = encodeURIComponent(
    `${request.message}\n\n${request.name}\n${request.email}`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

import type { ContactRequest } from '@/features/home/schemas/contact-form-schema';
import type { Locale } from '@/lib/i18n/locale';

const subjects: Record<Locale, (name: string) => string> = {
  en: (name) => `Hello from ${name}`,
  es: (name) => `Hola de parte de ${name}`,
};

/**
 * Pre-filled mailto link carrying every answer of the contact form, with the
 * subject in the visitor's language.
 */
export function buildContactMailto(
  request: ContactRequest,
  to: string,
  locale: Locale,
) {
  const subject = encodeURIComponent(subjects[locale](request.name));
  const body = encodeURIComponent(
    `${request.message}\n\n${request.name}\n${request.email}`,
  );
  return `mailto:${to}?subject=${subject}&body=${body}`;
}

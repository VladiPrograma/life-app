import { profile } from '@/features/home/home-content';
import type { ContactRequest } from '@/features/home/schemas/contact-form-schema';
import { buildContactMailto } from '@/features/home/utils/build-contact-mailto';

/**
 * Temporary delivery until the backend endpoint exists: hands the request to
 * the visitor's email app. Async so the form already handles a real request.
 */
export function sendContactRequest(request: ContactRequest): Promise<void> {
  window.location.assign(buildContactMailto(request, profile.email));
  return Promise.resolve();
}

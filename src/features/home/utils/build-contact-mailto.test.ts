import { expect, test } from 'vitest';
import { buildContactMailto } from '@/features/home/utils/build-contact-mailto';

test('addresses the message and signs it with the sender details', () => {
  const href = buildContactMailto(
    {
      name: 'Ada & Co',
      email: 'ada@example.com',
      message: 'We need to split a monolith into services.',
    },
    'me@example.com',
  );
  const url = new URL(href);

  expect(href.startsWith('mailto:me@example.com?')).toBe(true);
  expect(url.searchParams.get('subject')).toBe('Hello from Ada & Co');
  expect(url.searchParams.get('body')).toBe(
    'We need to split a monolith into services.\n\nAda & Co\nada@example.com',
  );
});

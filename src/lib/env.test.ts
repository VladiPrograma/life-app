import { expect, test } from 'vitest';
import { environmentSchema } from '@/lib/env';

test('accepts valid public configuration', () => {
  expect(environmentSchema.parse({ BASE_URL: '/', MODE: 'test' })).toEqual({
    BASE_URL: '/',
    MODE: 'test',
  });
});

test('rejects missing or empty configuration', () => {
  expect(environmentSchema.safeParse({ MODE: 'test' }).success).toBe(false);
  expect(environmentSchema.safeParse({ BASE_URL: '/', MODE: '' }).success).toBe(
    false,
  );
});

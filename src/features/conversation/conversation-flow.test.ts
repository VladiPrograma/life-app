import { expect, test } from 'vitest';
import { resolveText } from '@/features/conversation/conversation-flow';

test('replaces placeholders with stored answers', () => {
  expect(
    resolveText('Nice to meet you, {name}. You want {goal}.', {
      name: 'Ada',
      goal: 'calm',
    }),
  ).toBe('Nice to meet you, Ada. You want calm.');
});

test('keeps unknown placeholders visible', () => {
  expect(resolveText('Hello, {name}.', {})).toBe('Hello, {name}.');
});

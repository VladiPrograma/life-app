import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { App } from '@/app/app';

test('renders the conversation scene inside an accessible main landmark', () => {
  render(<App />);

  expect(screen.getByRole('main')).toContainElement(
    screen.getByRole('heading', { level: 1, name: 'Conversation' }),
  );
  expect(screen.getByRole('img', { name: 'Guide' })).toBeInTheDocument();
});

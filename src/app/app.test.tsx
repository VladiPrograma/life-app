import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { App } from '@/app/app';

test('renders the application inside an accessible main landmark', () => {
  render(<App />);

  expect(screen.getByRole('main')).toContainElement(
    screen.getByRole('heading', { level: 1, name: 'Application ready' }),
  );
});

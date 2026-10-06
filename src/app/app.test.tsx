import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { expect, test } from 'vitest';
import { App } from '@/app/app';

test('renders the chat route inside an accessible main landmark', () => {
  render(
    <MemoryRouter initialEntries={['/chat']}>
      <App />
    </MemoryRouter>,
  );

  expect(screen.getByRole('main')).toContainElement(
    screen.getByRole('heading', { level: 1, name: 'Conversation' }),
  );
  expect(screen.getByRole('img', { name: 'Guide' })).toBeInTheDocument();
});

test('does not render the conversation at an unknown route', () => {
  render(
    <MemoryRouter initialEntries={['/unknown']}>
      <App />
    </MemoryRouter>,
  );

  expect(
    screen.getByRole('heading', { level: 1, name: 'Page not found' }),
  ).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: 'Guide' })).not.toBeInTheDocument();
});

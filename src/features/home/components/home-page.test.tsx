import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { HomePage } from '@/features/home/components/home-page';

test('renders every section with in-page navigation targets', () => {
  render(<HomePage />);

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: 'Senior Software Engineer',
    }),
  ).toBeInTheDocument();

  const navigation = screen.getByRole('navigation', { name: 'Main' });
  for (const link of within(navigation).getAllByRole('link')) {
    const targetId = link.getAttribute('href')?.slice(1) ?? '';
    expect(document.getElementById(targetId)).toBeInTheDocument();
  }
});

test('offers email as the contact channel', () => {
  render(<HomePage />);

  const contact = screen.getByRole('region', {
    name: 'Let’s build something cool.',
  });
  expect(
    within(contact).getByRole('link', { name: 'Email Me' }),
  ).toHaveAttribute('href', 'mailto:mdumitruvlad@gmail.com');
});

test('keeps header and footer landmarks outside main', () => {
  render(<HomePage />);

  const main = screen.getByRole('main');
  expect(main).not.toContainElement(screen.getByRole('banner'));
  expect(main).not.toContainElement(screen.getByRole('contentinfo'));
});

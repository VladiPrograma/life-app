import { render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { SiteFooter } from '@/features/home/components/site-footer';

test('keeps the thank-you band and site map without extra calls to action', () => {
  render(<SiteFooter />);

  expect(
    screen.getByRole('heading', { name: 'Thank you for your curiosity.' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('navigation', { name: 'My projects' }),
  ).toBeInTheDocument();
  expect(screen.queryByRole('link', { name: /CV/ })).toBeNull();
});

test('lists only contact links that have a destination', () => {
  render(<SiteFooter />);

  const contact = screen.getByRole('navigation', { name: 'Contact' });
  for (const link of within(contact).getAllByRole('link')) {
    expect(link.getAttribute('href')).not.toBe('');
  }
  expect(within(contact).getByRole('link', { name: 'Email' })).toHaveAttribute(
    'href',
    'mailto:mdumitruvlad@gmail.com',
  );
});

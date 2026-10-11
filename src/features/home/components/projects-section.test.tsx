import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { ProjectsSection } from '@/features/home/components/projects-section';

function getPreview() {
  return screen.getByRole('figure');
}

test('previews the first project by default', () => {
  render(<ProjectsSection />);

  expect(
    within(getPreview()).getByText('Verisure Platform'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'Verisure Platform' }),
  ).toHaveAttribute('aria-pressed', 'true');
});

test('switches the preview when another project is selected', () => {
  render(<ProjectsSection />);

  const project = screen.getByRole('button', { name: 'MotoGP App' });
  fireEvent.click(project);

  expect(project).toHaveAttribute('aria-pressed', 'true');
  expect(
    screen.getByRole('button', { name: 'Verisure Platform' }),
  ).toHaveAttribute('aria-pressed', 'false');
  expect(within(getPreview()).getByText('MotoGP App')).toBeInTheDocument();
});

test('follows keyboard focus through the project list', () => {
  render(<ProjectsSection />);

  fireEvent.focus(screen.getByRole('button', { name: 'Cierzo Sports' }));

  expect(within(getPreview()).getByText('Cierzo Sports')).toBeInTheDocument();
});

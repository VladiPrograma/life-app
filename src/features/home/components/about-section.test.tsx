import { fireEvent, render, screen, within } from '@testing-library/react';
import { expect, test } from 'vitest';
import { AboutSection } from '@/features/home/components/about-section';

test('opens on tech and switches panels from a tab click', () => {
  render(<AboutSection />);

  expect(screen.getByRole('tab', { name: 'Tech' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  expect(
    within(screen.getByRole('tabpanel', { name: 'Tech' })).getByText('Java'),
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Personal' }));

  expect(screen.getByRole('tabpanel', { name: 'Personal' })).toHaveTextContent(
    'classic literature and essays',
  );
  expect(screen.queryByRole('tabpanel', { name: 'Tech' })).toBeNull();
});

test('moves between tabs with the arrow, Home and End keys', () => {
  render(<AboutSection />);
  const techTab = screen.getByRole('tab', { name: 'Tech' });

  fireEvent.keyDown(techTab, { key: 'ArrowRight' });
  expect(screen.getByRole('tab', { name: 'Personal' })).toHaveFocus();

  fireEvent.keyDown(document.activeElement ?? techTab, { key: 'End' });
  const adventuresTab = screen.getByRole('tab', { name: 'Adventures' });
  expect(adventuresTab).toHaveFocus();
  expect(adventuresTab).toHaveAttribute('aria-selected', 'true');

  fireEvent.keyDown(adventuresTab, { key: 'ArrowRight' });
  expect(screen.getByRole('tab', { name: 'Bio' })).toHaveFocus();
});

test('swaps the artwork and equipment along with the selected tab', () => {
  render(<AboutSection />);

  expect(
    screen.getByRole('img', { name: /coding at his desk/ }),
  ).toBeInTheDocument();
  expect(screen.getByText('Chair')).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: 'Bio' }));

  expect(
    screen.getByRole('img', { name: /riding his Kawasaki Ninja 500/ }),
  ).toBeInTheDocument();
  expect(screen.queryByRole('img', { name: /coding/ })).toBeNull();
  expect(screen.getByText('Motorbike')).toBeInTheDocument();
  expect(screen.queryByText('Chair')).toBeNull();
});

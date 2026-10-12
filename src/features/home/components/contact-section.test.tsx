import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vi } from 'vitest';
import { sendContactRequest } from '@/features/home/api/send-contact-request';
import { ContactSection } from '@/features/home/components/contact-section';

import { launchConfetti } from '@/features/home/utils/launch-confetti';

vi.mock('@/features/home/api/send-contact-request', () => ({
  sendContactRequest: vi.fn(() => Promise.resolve()),
}));

vi.mock('@/features/home/utils/launch-confetti', () => ({
  launchConfetti: vi.fn(),
}));

afterEach(() => {
  vi.mocked(sendContactRequest).mockClear();
  vi.mocked(launchConfetti).mockClear();
});

function fill(label: string, value: string) {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function submit() {
  fireEvent.click(screen.getByRole('button', { name: 'Get in touch' }));
}

test('explains what is missing instead of sending', async () => {
  render(<ContactSection />);

  fill('Your email', 'not-an-email');
  submit();

  expect(await screen.findByText('Tell me your name.')).toBeInTheDocument();
  expect(screen.getByLabelText('Your email')).toHaveAccessibleDescription(
    'Enter a valid email address.',
  );
  expect(sendContactRequest).not.toHaveBeenCalled();
});

test('sends a valid request and confirms it', async () => {
  render(<ContactSection />);

  fill('Your name', '  Ada ');
  fill('Your email', 'ada@example.com');
  fill('Your message', 'We need to split a monolith into services.');
  submit();

  await waitFor(() => {
    expect(sendContactRequest).toHaveBeenCalledWith(
      {
        name: 'Ada',
        email: 'ada@example.com',
        message: 'We need to split a monolith into services.',
      },
      'en',
    );
  });
  expect(await screen.findByRole('status')).toHaveTextContent(
    'Your email app should open',
  );
  expect(screen.getByLabelText('Your name')).toHaveValue('');
  expect(launchConfetti).toHaveBeenCalledOnce();
});

test('offers the email address when sending fails', async () => {
  vi.mocked(sendContactRequest).mockRejectedValueOnce(new Error('offline'));
  vi.spyOn(console, 'error').mockImplementation(() => undefined);
  render(<ContactSection />);

  fill('Your name', 'Ada');
  fill('Your email', 'ada@example.com');
  fill('Your message', 'We need to split a monolith into services.');
  submit();

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Please email me directly',
  );
  expect(launchConfetti).not.toHaveBeenCalled();
});

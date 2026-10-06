import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { ConversationScene } from '@/features/conversation/components/conversation-scene';
import { demoConversation } from '@/features/conversation/demo-conversation';

function typeAnswer(label: string, value: string) {
  const input = screen.getByRole('textbox', { name: label });
  fireEvent.change(input, { target: { value } });
  fireEvent.submit(input);
}

test('walks through the flow one exchange at a time', async () => {
  const onComplete = vi.fn();
  render(
    <ConversationScene steps={demoConversation} onComplete={onComplete} />,
  );

  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

  const nameInput = await screen.findByRole('textbox', {
    name: 'What is your name?',
  });
  expect(nameInput).toHaveFocus();

  typeAnswer('What is your name?', '  Ada  ');

  const goalLabel = 'Nice to meet you, Ada. What are you looking for?';
  expect(
    await screen.findByRole('textbox', { name: goalLabel }),
  ).toBeInTheDocument();
  // Only the current exchange stays on screen.
  expect(screen.queryByText('What is your name?')).not.toBeInTheDocument();

  typeAnswer(goalLabel, 'Quiet');

  expect(
    (await screen.findAllByText('Thank you, Ada. I will remember that.'))
      .length,
  ).toBeGreaterThan(0);
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  expect(
    screen.queryByRole('button', { name: 'Continue' }),
  ).not.toBeInTheDocument();

  expect(onComplete).toHaveBeenCalledTimes(1);
  expect(onComplete).toHaveBeenCalledWith(
    expect.objectContaining({
      answers: { name: 'Ada', goal: 'Quiet' },
      responses: [
        expect.objectContaining({
          stepId: 'name',
          question: 'What is your name?',
          answer: 'Ada',
        }),
        expect.objectContaining({
          stepId: 'goal',
          question: goalLabel,
          answer: 'Quiet',
        }),
      ],
    }),
  );
});

test('asks for an answer instead of submitting an empty one', async () => {
  render(
    <ConversationScene
      steps={[
        {
          kind: 'question',
          id: 'name',
          text: 'What is your name?',
          answerKey: 'name',
        },
        { kind: 'line', id: 'next', text: 'Hello, {name}.' },
      ]}
    />,
  );

  typeAnswer('What is your name?', '   ');

  const input = screen.getByRole('textbox', { name: 'What is your name?' });
  expect(input).toHaveAttribute('aria-invalid', 'true');
  expect(input).toHaveAccessibleDescription(
    'Type an answer first, then press Enter.',
  );

  typeAnswer('What is your name?', 'Ada');
  expect((await screen.findAllByText('Hello, Ada.')).length).toBeGreaterThan(0);
});

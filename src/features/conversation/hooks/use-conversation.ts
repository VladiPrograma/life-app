import { useEffect, useRef, useState } from 'react';
import {
  resolveText,
  type Answers,
  type ConversationFlow,
  type ConversationResponse,
  type ConversationResult,
} from '@/features/conversation/conversation-flow';

// Keep in sync with the `leave` animation duration in dialogue-bubble.module.css.
const leaveTransitionMs = 360;

export function useConversation(
  steps: ConversationFlow,
  prefersReducedMotion: boolean,
  onComplete?: (result: ConversationResult) => void,
) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [responses, setResponses] = useState<ConversationResponse[]>([]);
  const [isLeaving, setIsLeaving] = useState(false);
  const [startedAt] = useState(() => new Date().toISOString());
  const hasCompletedRef = useRef(false);

  const step = steps[stepIndex] ?? steps[0];
  const hasNextStep = stepIndex < steps.length - 1;
  const text = resolveText(step.text, answers);
  // The conversation ends on the last step, once it no longer waits for an answer.
  const isFinished =
    !hasNextStep &&
    (step.kind === 'line' || answers[step.answerKey] !== undefined);

  useEffect(() => {
    if (!isLeaving) return;

    const timeout = window.setTimeout(
      () => {
        setStepIndex((index) => index + 1);
        setIsLeaving(false);
      },
      prefersReducedMotion ? 0 : leaveTransitionMs,
    );

    return () => window.clearTimeout(timeout);
  }, [isLeaving, prefersReducedMotion]);

  useEffect(() => {
    if (!isFinished || hasCompletedRef.current) return;

    hasCompletedRef.current = true;
    onComplete?.({
      answers,
      responses,
      startedAt,
      completedAt: new Date().toISOString(),
    });
  }, [answers, isFinished, onComplete, responses, startedAt]);

  function advance() {
    if (hasNextStep && !isLeaving) setIsLeaving(true);
  }

  function submitAnswer(answer: string) {
    if (step.kind !== 'question' || isLeaving) return;

    setAnswers((previous) => ({ ...previous, [step.answerKey]: answer }));
    setResponses((previous) => [
      ...previous,
      {
        stepId: step.id,
        answerKey: step.answerKey,
        question: text,
        answer,
        answeredAt: new Date().toISOString(),
      },
    ]);
    advance();
  }

  return {
    step,
    text,
    answers,
    isLeaving,
    hasNextStep,
    advance,
    submitAnswer,
  };
}

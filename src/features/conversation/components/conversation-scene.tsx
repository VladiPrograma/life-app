import { useEffect } from 'react';
import { AnswerInput } from '@/features/conversation/components/answer-input';
import { Character } from '@/features/conversation/components/character';
import { DialogueBubble } from '@/features/conversation/components/dialogue-bubble';
import type {
  ConversationFlow,
  ConversationResult,
} from '@/features/conversation/conversation-flow';
import { useConversation } from '@/features/conversation/hooks/use-conversation';
import { usePrefersReducedMotion } from '@/features/conversation/hooks/use-prefers-reduced-motion';
import { useTypewriter } from '@/features/conversation/hooks/use-typewriter';
import styles from '@/features/conversation/components/conversation-scene.module.css';

type ConversationSceneProps = {
  steps: ConversationFlow;
  /** Final guide artwork; a placeholder is drawn until it is provided. */
  guideImageSrc?: string | undefined;
  /** Called once with everything collected when the final step is reached. */
  onComplete?: ((result: ConversationResult) => void) | undefined;
};

export function ConversationScene({
  steps,
  guideImageSrc,
  onComplete,
}: ConversationSceneProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { step, text, answers, isLeaving, hasNextStep, advance, submitAnswer } =
    useConversation(steps, prefersReducedMotion, onComplete);
  const { visibleText, isComplete, complete } = useTypewriter(
    text,
    step.id,
    !prefersReducedMotion,
  );

  const submittedAnswer =
    step.kind === 'question' ? answers[step.answerKey] : undefined;
  const canContinue =
    step.kind === 'line' && isComplete && hasNextStep && !isLeaving;

  // Like skipping text in a game: Enter or Space reveals the rest of the line.
  useEffect(() => {
    if (isComplete) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        complete();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [complete, isComplete]);

  return (
    <section className={styles.scene} aria-labelledby="conversation-title">
      <h1 id="conversation-title" className={styles.visuallyHidden}>
        Conversation
      </h1>

      {/* Screen readers get each full line once; the typed text is decorative. */}
      <p className={styles.visuallyHidden} aria-live="polite">
        {text}
      </p>

      <div className={styles.stage}>
        <div className={styles.guide}>
          <Character kind="guide" label="Guide" imageSrc={guideImageSrc} />
        </div>

        <div className={styles.line}>
          <DialogueBubble
            key={step.id}
            speaker="guide"
            isLeaving={isLeaving}
            onClick={isComplete ? undefined : complete}
          >
            <p className={styles.lineText} aria-hidden="true">
              {/* The invisible full line reserves the final bubble size while typing. */}
              <span className={styles.lineGhost}>{text}</span>
              <span>{visibleText}</span>
            </p>
            {step.kind === 'line' && hasNextStep && (
              <div className={styles.continueRow}>
                {canContinue && (
                  <button
                    className={styles.continueButton}
                    type="button"
                    onClick={advance}
                    autoFocus
                  >
                    <span className={styles.visuallyHidden}>Continue</span>
                    <span className={styles.continueArrow} aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
          </DialogueBubble>
        </div>

        <div className={styles.answer}>
          {step.kind === 'question' && isComplete && (
            <DialogueBubble
              key={step.id}
              speaker="player"
              isLeaving={isLeaving}
            >
              {submittedAnswer === undefined ? (
                <AnswerInput
                  label={text}
                  placeholder={step.placeholder}
                  onSubmit={submitAnswer}
                />
              ) : (
                <p className={styles.answerText}>{submittedAnswer}</p>
              )}
            </DialogueBubble>
          )}
        </div>

        <div className={styles.player}>
          <Character kind="player" label="You, not yet known" />
        </div>
      </div>
    </section>
  );
}

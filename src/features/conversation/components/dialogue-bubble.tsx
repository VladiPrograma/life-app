import type { ReactNode } from 'react';
import styles from '@/features/conversation/components/dialogue-bubble.module.css';

type DialogueBubbleProps = {
  /** Decides which side the tail points to. */
  speaker: 'guide' | 'player';
  isLeaving: boolean;
  children: ReactNode;
  onClick?: (() => void) | undefined;
};

export function DialogueBubble({
  speaker,
  isLeaving,
  children,
  onClick,
}: DialogueBubbleProps) {
  return (
    <div
      className={[
        styles.bubble,
        speaker === 'guide' ? styles.guide : styles.player,
        isLeaving && styles.leaving,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

import { useCallback, useEffect, useState } from 'react';

const characterDelayMs = 30;
const punctuationDelayMs = 220;

/**
 * Reveals `text` one character at a time, pausing briefly after punctuation.
 * Progress restarts whenever `lineKey` changes.
 */
export function useTypewriter(text: string, lineKey: string, animate: boolean) {
  const [progress, setProgress] = useState({ lineKey, count: 0 });

  const count = !animate
    ? text.length
    : progress.lineKey === lineKey
      ? progress.count
      : 0;
  const isComplete = count >= text.length;

  useEffect(() => {
    if (isComplete) return;

    const previousCharacter = text[count - 1];
    const delay =
      previousCharacter && /[.,!?]/.test(previousCharacter)
        ? punctuationDelayMs
        : characterDelayMs;
    const timeout = window.setTimeout(
      () => setProgress({ lineKey, count: count + 1 }),
      delay,
    );

    return () => window.clearTimeout(timeout);
  }, [count, isComplete, lineKey, text]);

  const complete = useCallback(
    () => setProgress({ lineKey, count: text.length }),
    [lineKey, text.length],
  );

  return { visibleText: text.slice(0, count), isComplete, complete };
}

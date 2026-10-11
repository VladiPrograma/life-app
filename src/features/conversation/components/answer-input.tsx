import { useId, useState, type FormEvent } from 'react';
import styles from '@/features/conversation/components/answer-input.module.css';

type AnswerInputProps = {
  /** Accessible label; usually the question currently asked. */
  label: string;
  placeholder?: string | undefined;
  onSubmit: (answer: string) => void;
};

const maxAnswerLength = 80;

export function AnswerInput({
  label,
  placeholder,
  onSubmit,
}: AnswerInputProps) {
  const inputId = useId();
  const hintId = useId();
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const answer = value.trim();

    if (!answer) {
      setShowHint(true);
      return;
    }

    onSubmit(answer);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label className={styles.visuallyHidden} htmlFor={inputId}>
        {label}
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          className={styles.input}
          type="text"
          value={value}
          placeholder={placeholder}
          maxLength={maxAnswerLength}
          autoComplete="off"
          enterKeyHint="send"
          autoFocus
          aria-invalid={showHint}
          aria-describedby={hintId}
          onChange={(event) => {
            setValue(event.target.value);
            if (showHint) setShowHint(false);
          }}
        />
        <button className={styles.submit} type="submit">
          <span className={styles.visuallyHidden}>Answer</span>
          <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
            <path
              d="M13 3v5.5H4M7 5.5 4 8.5l3 3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <p id={hintId} className={styles.hint} aria-live="polite">
        {showHint ? 'Type an answer first, then press Enter.' : ''}
      </p>
    </form>
  );
}

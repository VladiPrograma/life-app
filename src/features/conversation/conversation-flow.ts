export type Answers = Readonly<Record<string, string>>;

/** The guide says something and waits for the player to continue. */
export type LineStep = {
  kind: 'line';
  id: string;
  text: string;
};

/** The guide asks something and stores the typed answer under `answerKey`. */
export type QuestionStep = {
  kind: 'question';
  id: string;
  text: string;
  answerKey: string;
  placeholder?: string;
};

export type ConversationStep = LineStep | QuestionStep;

export type ConversationFlow = readonly [
  ConversationStep,
  ...ConversationStep[],
];

/** One answered question, with the text exactly as the visitor saw it. */
export type ConversationResponse = {
  stepId: string;
  answerKey: string;
  question: string;
  answer: string;
  answeredAt: string;
};

/** Everything collected once the visitor reaches the final step. */
export type ConversationResult = {
  answers: Answers;
  responses: readonly ConversationResponse[];
  startedAt: string;
  completedAt: string;
};

/**
 * Replaces `{answerKey}` placeholders with stored answers. Unknown keys are
 * left untouched so authoring mistakes stay visible during development.
 */
export function resolveText(template: string, answers: Answers): string {
  return template.replace(
    /\{(\w+)\}/g,
    (placeholder, key: string) => answers[key] ?? placeholder,
  );
}

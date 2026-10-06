import type { ConversationFlow } from '@/features/conversation/conversation-flow';

// Add, remove, or reorder steps here; the scene renders whatever the flow describes.
export const demoConversation: ConversationFlow = [
  {
    kind: 'line',
    id: 'intro',
    text: 'Before we begin, I need to know something about you.',
  },
  {
    kind: 'question',
    id: 'name',
    text: 'What is your name?',
    answerKey: 'name',
    placeholder: 'Your name',
  },
  {
    kind: 'question',
    id: 'goal',
    text: 'Nice to meet you, {name}. What are you looking for?',
    answerKey: 'goal',
    placeholder: 'Anything at all',
  },
  // Assumption: the brief ends after the second question, so the demo closes with a quiet line.
  {
    kind: 'line',
    id: 'closing',
    text: 'Thank you, {name}. I will remember that.',
  },
];

import { ConversationScene } from '@/features/conversation/components/conversation-scene';
import type { ConversationResult } from '@/features/conversation/conversation-flow';
import { demoConversation } from '@/features/conversation/demo-conversation';

// Temporary: inspect the collected data until the backend API is integrated.
function logConversationResult(result: ConversationResult) {
  console.log('[conversation] completed', result);
}

export function App() {
  return (
    <main className="font-body text-copy">
      <ConversationScene
        steps={demoConversation}
        onComplete={logConversationResult}
      />
    </main>
  );
}

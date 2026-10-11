import { Route, Routes } from 'react-router';
import { ChatPage } from '@/features/conversation/components/chat-page';
import { HomePage } from '@/features/home/components/home-page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route
        path="*"
        element={
          <main>
            <h1>Page not found</h1>
          </main>
        }
      />
    </Routes>
  );
}

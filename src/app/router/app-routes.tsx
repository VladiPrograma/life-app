import { Navigate, Route, Routes } from 'react-router';
import { ChatPage } from '@/features/conversation/components/chat-page';

export function AppRoutes() {
  return (
    <Routes>
      {/* Temporary entry point until the home page is defined. */}
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>Page not found</h1>} />
    </Routes>
  );
}

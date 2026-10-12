import { Route, Routes } from 'react-router';
import { LocaleProvider } from '@/app/providers/locale-provider';
import { ChatPage } from '@/features/conversation/components/chat-page';
import { HomePage } from '@/features/home/components/home-page';
import { localePaths } from '@/lib/i18n/locale';

// Both home routes render the same tree, so switching language keeps the page
// mounted: scroll position, open tabs and form input survive. The chat demo
// is English only.
export function AppRoutes() {
  return (
    <Routes>
      <Route
        path={localePaths.en}
        element={
          <LocaleProvider locale="en">
            <HomePage />
          </LocaleProvider>
        }
      />
      <Route
        path={localePaths.es}
        element={
          <LocaleProvider locale="es">
            <HomePage />
          </LocaleProvider>
        }
      />
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

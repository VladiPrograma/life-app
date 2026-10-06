import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from '@/app/app';
import { env } from '@/lib/env';
import '@/app/styles/app.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Application startup failed: #root element is missing.');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter basename={env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

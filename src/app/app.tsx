import { AppRoutes } from '@/app/router/app-routes';

// Pages own their landmarks so the home page can place its header and
// footer outside <main>.
export function App() {
  return (
    <div className="font-body text-copy">
      <AppRoutes />
    </div>
  );
}

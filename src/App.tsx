import { RouterProvider } from '@tanstack/react-router';
import { router } from './core/router';
import { queryClient } from './core/query-client';
import { useAuthListener } from './hooks/useAuthListener';
import { useAuthStore } from './stores/Auth.store';

import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';

export const App: React.FC = () => {
  useAuthListener();
  const auth = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
};

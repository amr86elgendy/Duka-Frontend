import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import { AuthProvider } from './context/auth.tsx';
import ApiClientMiddleware from './middlewares/apiClient.tsx';
import PersistMiddleware from './middlewares/persist.tsx';
import './index.css';
import './i18n.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      onError: (error: any) => {},
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ApiClientMiddleware>
          <PersistMiddleware>
            <App />
          </PersistMiddleware>
        </ApiClientMiddleware>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

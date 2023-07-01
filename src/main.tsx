import React from 'react';
import ReactDOM from 'react-dom/client';
import { createPortal } from 'react-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App.tsx';
import { AuthProvider } from './context/auth.tsx';
import { FilterProvider } from './context/filter.tsx';
import { QuickViewProvider } from './context/quickView.tsx';
import QuickViewModal from './components/services/QuickViewModal.tsx';
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
        <FilterProvider>
          <QuickViewProvider>
            <App />
            {createPortal(<QuickViewModal />, document.body)}
          </QuickViewProvider>
        </FilterProvider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

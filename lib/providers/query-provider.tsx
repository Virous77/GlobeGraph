'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const DAY = 1000 * 60 * 60 * 24;

const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Yearly data: going back to a metric or country costs no request
            staleTime: DAY,
            gcTime: DAY,
            retry: 2,
            retryDelay: (attempt) => 1000 * 2 ** attempt,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default QueryProvider;

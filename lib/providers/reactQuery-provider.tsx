'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: process.env.NODE_ENV === 'production',
        retry: 1,
        staleTime: Infinity,
      },
    },
  });
  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, loggerLink } from '@trpc/client';
import React, { useState } from 'react';
import { api } from '~/utils/api';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds
        retry: (failureCount, error: any) => {
          // Don't retry on 4xx errors (client errors)
          if (error?.data?.httpStatus >= 400 && error?.data?.httpStatus < 500) {
            return false;
          }
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
      },
      mutations: {
        retry: false, // Don't retry mutations by default
      },
    },
  });

export function TRPCProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => createQueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: '/api/trpc',
          headers() {
            return {
              'Content-Type': 'application/json',
            };
          },
        }),
      ],
    }),
  );

  return (
    <api.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </api.Provider>
  );
}

import React from 'react';
import './globals.css';
import { TRPCProvider } from '~/components/providers/trpc-provider';
import { ErrorBoundary } from '~/components/ui';

export const metadata = {
  title: 'Restaurant App',
  description: 'A restaurant app built with Next.js, TypeScript, Tailwind CSS, Prisma, and tRPC',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <TRPCProvider>
            {children}
          </TRPCProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;

import { createTRPCRouter } from './trpc';
import { restaurantRouter } from './routers/restaurant';

/**
 * Main tRPC router that combines all sub-routers
 * Add new routers here as the application grows
 */
export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
});

/**
 * Export the router type for use in the client
 * This enables end-to-end type safety between client and server
 */
export type AppRouter = typeof appRouter;

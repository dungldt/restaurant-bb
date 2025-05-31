import { createTRPCRouter } from './trpc';
import { restaurantRouter } from './routers/restaurant';

export const appRouter = createTRPCRouter({
  restaurant: restaurantRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

import { initTRPC } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from '../db';

/**
 * Creates the context for tRPC procedures
 * This context is available in all tRPC procedures and contains the database instance
 */
export const createTRPCContext = (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;
  return {
    req,
    db,
  };
};

/**
 * Initialize tRPC with context type and configuration
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: undefined,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * Create a tRPC router
 */
export const createTRPCRouter = t.router;

/**
 * Public procedure that doesn't require authentication
 * In a real app, you might have protectedProcedure for authenticated routes
 */
export const publicProcedure = t.procedure;

import { initTRPC } from '@trpc/server';
import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from '../db';

export const createTRPCContext = (opts: FetchCreateContextFnOptions) => {
  const { req } = opts;
  return {
    req,
    db,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: undefined,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

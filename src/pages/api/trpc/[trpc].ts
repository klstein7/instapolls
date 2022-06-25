import * as trpcNext from '@trpc/server/adapters/next';

import { createContext, createRouter } from '../../../server/context';
import authRouter from '../../../server/routers/authRouter';
import pollsRouter from '../../../server/routers/pollsRouter';
import votesRouter from '../../../server/routers/votesRouter';

export const appRouter = createRouter().merge(pollsRouter).merge(votesRouter).merge(authRouter);

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});

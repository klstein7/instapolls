import { router } from '@trpc/server';
import db from '../../../prisma/db';
import { createPollSchema } from '../../utils/schema';
import { createRouter } from '../context';

const pollsRouter = createRouter().mutation('createPoll', {
  input: createPollSchema,
  resolve: async ({ input, ctx }) =>
    db.poll.create({
      data: {
        ...input,
        userId: ctx.user?.id,
        options: {
          createMany: {
            data: input.options,
          },
        },
      },
    }),
});

export default pollsRouter;

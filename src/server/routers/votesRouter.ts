/* eslint-disable no-await-in-loop */

import { z } from 'zod';
import db from '../../../prisma/db';
import { createVoteSchema } from '../../utils/schema';
import { createRouter } from '../context';

const votesRouter = createRouter()
  .mutation('createVote', {
    input: createVoteSchema,
    resolve: async ({ input, ctx }) => {
      const vote = await db.optionVote.findFirst({
        where: {
          userId: ctx.user.id,
          option: {
            pollId: input.pollId,
          },
        },
      });
      if (!vote) {
        return db.optionVote.create({
          data: {
            optionId: input.optionId,
            userId: ctx.user.id,
          },
        });
      }
      return db.optionVote.update({
        where: {
          id: vote.id,
        },
        data: {
          optionId: input.optionId,
        },
      });
    },
  })
  .query('votesForPost', {
    input: z.object({
      pollId: z.string(),
    }),
    resolve: async ({ input }) => {
      const options = await db.pollOption.findMany({
        where: {
          pollId: input.pollId,
        },
      });

      if (!options) {
        return [];
      }

      return Promise.all(
        options.map(async (option) => {
          const count = await db.optionVote.count({
            where: {
              optionId: option.id,
            },
          });
          return {
            optionName: option.label,
            count,
          };
        })
      );
    },
  });

export default votesRouter;

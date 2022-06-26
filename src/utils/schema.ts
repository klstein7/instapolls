import { z } from 'zod';

export const createPollOptionSchema = z.object({
  label: z.string().min(1),
});

export const createPollSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  options: z.array(createPollOptionSchema).min(1),
});

export const createVoteSchema = z.object({
  optionId: z.string().min(1, { message: 'You must select an option to vote.' }),
  pollId: z.string().min(1),
});

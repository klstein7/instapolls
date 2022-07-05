import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMantineTheme,
  Group,
  RadioGroup,
  Radio,
  Button,
  Text,
  Anchor,
  Divider,
} from '@mantine/core';
import { Poll, PollOption } from '@prisma/client';
import { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import useVotesForPoll from '../../hooks/useVotesForPoll';
import useShowResults from '../../store/useShowResults';
import { createVoteSchema } from '../../utils/schema';
import { useMutation, useQuery } from '../../utils/trpc';

type CreateVoteFormProps = {
  poll: Poll & {
    options: PollOption[];
  };
};

const CreateVoteForm = ({ poll }: CreateVoteFormProps) => {
  const theme = useMantineTheme();
  const { setShowResults, showResults } = useShowResults();
  const { reset, formState, handleSubmit, control } = useForm<z.infer<typeof createVoteSchema>>({
    defaultValues: {
      optionId: localStorage.getItem(poll.id) || '',
      pollId: poll.id,
    },
    resolver: zodResolver(createVoteSchema),
  });
  const createVoteMutation = useMutation('createVote');
  const { refetch: refetchVotesForPoll, data: votesForPoll } = useVotesForPoll(poll.id);

  const voteCount = useMemo(() => {
    let count = 0;
    votesForPoll?.forEach((voteCountForOption) => {
      count += voteCountForOption.count;
    });
    return count;
  }, [votesForPoll]);

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const response = await createVoteMutation.mutateAsync(values);
        localStorage.setItem(poll.id, response.optionId);
        reset({
          optionId: response.optionId,
          pollId: poll.id,
        });
        refetchVotesForPoll();
        setShowResults(true);
      })}
    >
      <Group
        direction="column"
        p="lg"
        grow
        sx={{
          backgroundColor: theme.colors.dark[8],
          borderRadius: theme.radius.sm,
        }}
      >
        <Group direction="column" grow spacing={0}>
          <Text className="body-font-style" sx={{ fontSize: 24, color: theme.colors.green[0] }}>
            {poll.title}
          </Text>
          {poll.description && (
            <Text className="body-font-style" color="dimmed">
              {poll.description}
            </Text>
          )}
        </Group>
        <Controller
          control={control}
          name="optionId"
          render={({ field }) => (
            <Group direction="column" grow spacing={5}>
              {formState.errors.optionId?.message && (
                <Text size="sm" color="red">
                  {formState.errors.optionId.message}
                </Text>
              )}
              <RadioGroup
                pb="md"
                orientation="vertical"
                spacing="md"
                size="md"
                color="green"
                {...field}
              >
                {poll.options.map((option) => (
                  <Radio key={option.id} label={option.label} value={option.id} />
                ))}
              </RadioGroup>
            </Group>
          )}
        />
        <Button color="green" type="submit" loading={formState.isSubmitting}>
          Vote
        </Button>
        <Divider variant="dashed" />
        <Group direction="row" position="apart">
          <Text color="gray" size="sm" sx={{ fontStyle: 'italic' }}>
            {voteCount} votes
          </Text>
          {!showResults && (
            <Anchor color="gray" size="sm" onClick={() => setShowResults(true)}>
              Show results
            </Anchor>
          )}
        </Group>
      </Group>
    </form>
  );
};

export default CreateVoteForm;

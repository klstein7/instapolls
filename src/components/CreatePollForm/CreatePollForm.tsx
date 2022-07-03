import { zodResolver } from '@hookform/resolvers/zod';
import {
  useMantineTheme,
  TextInput,
  Group,
  Text,
  ActionIcon,
  Button,
  Textarea,
  Box,
} from '@mantine/core';
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon, TrashIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { createPollSchema } from '../../utils/schema';
import { useMutation } from '../../utils/trpc';

const CreatePollForm = () => {
  const createPollMutation = useMutation('createPoll');
  const theme = useMantineTheme();
  const { register, control, handleSubmit, formState, reset } = useForm<
    z.infer<typeof createPollSchema>
  >({
    defaultValues: {
      title: '',
      description: '',
      options: [],
    },
    resolver: zodResolver(createPollSchema),
  });
  const { fields, append, swap, remove } = useFieldArray({
    control,
    name: 'options',
  });
  const [optionLabel, setOptionLabel] = useState('');
  const { push } = useRouter();

  return (
    <form
      onSubmit={handleSubmit(async (values) => {
        const poll = await createPollMutation.mutateAsync(values);
        push(`/polls/${poll.id}`);
      })}
    >
      <Group direction="column" grow>
        <Box>
          <Text
            className="body-font-style"
            sx={{ fontSize: 20, fontWeight: 600, color: theme.colors.green[0] }}
          >
            Create poll
          </Text>
          <Text className="body-font-style" size="sm" color="dimmed">
            Complete the forms below to create a new poll!
          </Text>
        </Box>
        <Textarea
          variant="default"
          description="What is your question for this poll?"
          placeholder="Enter poll question..."
          error={formState.errors.title?.message}
          {...register('title')}
        />
        {fields.length > 0 && (
          <Group direction="column" grow spacing="xs">
            {fields.map((field, index) => (
              <Group key={field.id} direction="row" spacing="xs">
                <TextInput
                  size="xs"
                  variant="default"
                  icon={<Text size="sm">{index + 1}</Text>}
                  sx={{ flex: 1 }}
                  {...register(`options.${index}.label`)}
                />
                <Group direction="row" spacing="xs">
                  <ActionIcon
                    size="xs"
                    onClick={() => {
                      if (index - 1 >= 0) {
                        swap(index, index - 1);
                      }
                    }}
                  >
                    <ChevronUpIcon />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    onClick={() => {
                      if (index + 1 < fields.length) {
                        swap(index, index + 1);
                      }
                    }}
                  >
                    <ChevronDownIcon />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    <TrashIcon />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Group>
        )}
        <TextInput
          value={optionLabel}
          variant="default"
          placeholder="Enter an option and press enter..."
          description="Add an option to this poll"
          rightSection={<ChevronRightIcon />}
          error={(formState.errors.options as any)?.message}
          onChange={(e) => setOptionLabel(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              append({ label: optionLabel }, { shouldFocus: false });
              setOptionLabel('');
              e.preventDefault();
            }
          }}
        />
        <Button color="green" type="submit" fullWidth loading={formState.isSubmitting}>
          Create
        </Button>
      </Group>
    </form>
  );
};

export default CreatePollForm;

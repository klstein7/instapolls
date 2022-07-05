import { Poll, PollOption } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Button, Group, LoadingOverlay } from '@mantine/core';

import { useEffect } from 'react';
import { CopyIcon } from '@modulz/radix-icons';
import { useClipboard } from '@mantine/hooks';
import { useNotifications } from '@mantine/notifications';
import { FaShareAlt } from 'react-icons/fa';
import db from '../../../prisma/db';
import BaseLayout from '../../layouts/BaseLayout';

import CreateVoteForm from '../../components/CreateVoteForm/CreateVoteForm';
import Results from '../../components/Results/Results';
import { useQuery } from '../../utils/trpc';
import useShowResults from '../../store/useShowResults';
import useVotesForPoll from '../../hooks/useVotesForPoll';

type PageProps = {
  poll: Poll & {
    options: PollOption[];
  };
};

const PollPage = ({ poll }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: voteCounts } = useVotesForPoll(poll.id);
  const { showResults, setShowResults } = useShowResults();
  const clipboard = useClipboard();
  const notifications = useNotifications();

  useEffect(() => {
    if (localStorage.getItem(poll.id)) {
      setShowResults(true);
    }
  }, []);

  if (!voteCounts) {
    return <LoadingOverlay visible />;
  }

  return (
    <BaseLayout>
      <Group direction="column" grow spacing="xs">
        <Group direction="row" position="right">
          <Button
            size="xs"
            variant="subtle"
            color="gray"
            leftIcon={<FaShareAlt />}
            onClick={() => {
              clipboard.copy(window.location.href);
              notifications.showNotification({
                title: 'Copied to clipboard',
                message: 'Send the link to your friends to share it!',
                color: 'green',
                icon: <CopyIcon />,
              });
            }}
          >
            Share
          </Button>
        </Group>
        <CreateVoteForm poll={poll} />
        {showResults && <Results />}
      </Group>
    </BaseLayout>
  );
};

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const id = params?.id as string;

  const poll = await db.poll.findUnique({
    where: {
      id,
    },
    include: {
      options: true,
    },
  });

  if (!poll) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      poll,
    },
  };
};

export default PollPage;

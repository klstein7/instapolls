import { Poll, PollOption } from '@prisma/client';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Box, Group, LoadingOverlay, useMantineTheme } from '@mantine/core';

import { useEffect } from 'react';
import db from '../../../prisma/db';
import BaseLayout from '../../layouts/BaseLayout';

import CreateVoteForm from '../../components/CreateVoteForm/CreateVoteForm';
import Results from '../../components/Results/Results';
import { useQuery } from '../../utils/trpc';
import useShowResults from '../../store/useShowResults';

type PageProps = {
  poll: Poll & {
    options: PollOption[];
  };
};

const PollPage = ({ poll }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: voteCounts } = useQuery(['votesForPost', { pollId: poll.id }], {
    refetchInterval: 5000,
  });
  const { showResults, setShowResults } = useShowResults();

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
      <Group direction="column" grow>
        <CreateVoteForm poll={poll} />
        {showResults && <Results voteCounts={voteCounts} />}
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

import { useQuery } from '../utils/trpc';

const useVotesForPoll = (pollId: string) =>
  useQuery(['votesForPoll', { pollId }], { enabled: !!pollId, refetchInterval: 5000 });

export default useVotesForPoll;

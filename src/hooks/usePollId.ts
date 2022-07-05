import { useMemo } from 'react';
import { useRouter } from 'next/router';

const usePollId = () => {
  const { query } = useRouter();
  const pollId = useMemo(() => query.id as string, [query.id]);
  return pollId;
};

export default usePollId;

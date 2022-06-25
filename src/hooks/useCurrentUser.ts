import { useMutation, useQuery } from '../utils/trpc';

const useCurrentUser = () => {
  const { data: user, isLoading: isLoadingUser, refetch: refetchUser } = useQuery(['currentUser']);
  const signInMutation = useMutation('signIn');
  const signOutMutation = useMutation('signOut');

  const signIn = async (didToken: string) => {
    await signInMutation.mutateAsync({ didToken });
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  return { user, isLoadingUser, refetchUser, signIn, signOut };
};

export default useCurrentUser;

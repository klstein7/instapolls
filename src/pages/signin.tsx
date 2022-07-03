import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Center, Group, Space, Text, TextInput, useMantineTheme } from '@mantine/core';
import { EnvelopeClosedIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import useCurrentUser from '../hooks/useCurrentUser';
import createMagicClient from '../utils/magic';
import { signInSchema } from '../utils/schema';

const SignInPage = () => {
  const theme = useMantineTheme();
  const { user, refetchUser, signIn } = useCurrentUser();
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      push('/');
    }
  }, [user]);

  const { register, formState, handleSubmit } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });
  return (
    <form
      onSubmit={handleSubmit(async ({ email }) => {
        const didToken = await createMagicClient().auth.loginWithMagicLink({
          email,
        });
        if (didToken) {
          await signIn(didToken);
          await refetchUser();
        }
      })}
    >
      <Center sx={{ width: '100%', height: '100vh' }}>
        <Group
          direction="column"
          grow
          p="lg"
          sx={{ maxWidth: theme.breakpoints.xs, width: '100%' }}
          spacing="xs"
        >
          <Text
            className="brand-font-style"
            color={theme.colors.green[4]}
            align="center"
            sx={{ fontSize: 32 }}
          >
            INSTAPOLLS
          </Text>
          <TextInput
            icon={<EnvelopeClosedIcon />}
            placeholder="Sign in with email"
            {...register('email')}
          />
          <Button variant="outline" color="green" type="submit" loading={formState.isSubmitting}>
            Sign in
          </Button>
        </Group>
      </Center>
    </form>
  );
};

export default SignInPage;

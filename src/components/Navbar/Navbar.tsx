import { ActionIcon, Button, Group, LoadingOverlay, Text, useMantineTheme } from '@mantine/core';
import { FaBolt, FaHome, FaUser } from 'react-icons/fa';
import { removeCookies, setCookies } from 'cookies-next';
import { ExitIcon, HomeIcon, PersonIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import createMagicClient from '../../utils/magic';
import useCurrentUser from '../../hooks/useCurrentUser';

const Navbar = () => {
  const theme = useMantineTheme();
  const { user, isLoadingUser, refetchUser, signIn, signOut } = useCurrentUser();
  const { push } = useRouter();

  if (isLoadingUser) {
    return <LoadingOverlay visible />;
  }

  return (
    <Group direction="row" px="md" py="xs" align="center" position="apart">
      <Group direction="row" spacing={5} align="center">
        <Text className="brand-font-style" color={theme.colors.green[4]} sx={{ fontSize: 32 }}>
          INSTAPOLLS
        </Text>
      </Group>
      <Group direction="row" align="center">
        <ActionIcon size="md" color="gray" onClick={() => push('/')}>
          <FaHome />
        </ActionIcon>
        {user ? (
          <Button
            variant="subtle"
            color="gray"
            leftIcon={<ExitIcon />}
            radius="xl"
            onClick={async () => {
              await signOut();
              await refetchUser();
            }}
          >
            Sign out
          </Button>
        ) : (
          <Button
            variant="subtle"
            color="gray"
            leftIcon={<FaUser />}
            radius="xl"
            onClick={async () => {
              const didToken = await createMagicClient().auth.loginWithMagicLink({
                email: 'klstein7@gmail.com',
              });
              if (didToken) {
                await signIn(didToken);
                await refetchUser();
              }
            }}
          >
            Sign in
          </Button>
        )}
      </Group>
    </Group>
  );
};

export default Navbar;

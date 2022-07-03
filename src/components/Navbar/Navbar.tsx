import {
  ActionIcon,
  Burger,
  Button,
  Group,
  LoadingOverlay,
  MediaQuery,
  Menu,
  MenuItem,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { FaHome, FaUser } from 'react-icons/fa';
import { ExitIcon, HomeIcon } from '@modulz/radix-icons';
import { useRouter } from 'next/router';
import { useState } from 'react';
import createMagicClient from '../../utils/magic';
import useCurrentUser from '../../hooks/useCurrentUser';

const Navbar = () => {
  const theme = useMantineTheme();
  const { user, isLoadingUser, refetchUser, signIn, signOut } = useCurrentUser();
  const { push } = useRouter();
  const [opened, setOpened] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    await refetchUser();
  };

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
      <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
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
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="subtle"
              color="gray"
              leftIcon={<FaUser />}
              radius="xl"
              onClick={() => push('/signin')}
            >
              Sign in
            </Button>
          )}
        </Group>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
        <Menu
          opened={opened}
          onClose={() => setOpened(false)}
          control={
            <Burger size="sm" opened={opened} onClick={() => setOpened(!opened)}>
              Test
            </Burger>
          }
        >
          <Menu.Item icon={<HomeIcon />} onClick={() => push('/')}>
            Home
          </Menu.Item>
          {!user ? (
            <Menu.Item icon={<FaUser />} onClick={() => push('/signin')}>
              Sign in
            </Menu.Item>
          ) : (
            <MenuItem icon={<ExitIcon />} onClick={handleSignOut}>
              Sign out
            </MenuItem>
          )}
        </Menu>
      </MediaQuery>
    </Group>
  );
};

export default Navbar;

import { Button, Group, Text, useMantineTheme } from '@mantine/core';
import { FaBolt, FaUser } from 'react-icons/fa';
import { PersonIcon } from '@modulz/radix-icons';

const Navbar = () => {
  const theme = useMantineTheme();
  return (
    <Group direction="row" p="sm" align="center" position="apart">
      <Group direction="row" spacing="xs" align="center">
        <FaBolt color={theme.colors.blue[3]} size={24} />
        <Text
          className="brand-font-style"
          color={theme.colors.blue[3]}
          sx={{ fontWeight: 800, fontSize: 24 }}
        >
          INSTAPOLLS
        </Text>
      </Group>
      <Group direction="row" align="center">
        <Button variant="subtle" color="gray" leftIcon={<FaUser />}>
          Sign in
        </Button>
      </Group>
    </Group>
  );
};

export default Navbar;

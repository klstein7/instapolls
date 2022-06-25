import { Box, Divider, Group, Radio, RadioGroup, Text, useMantineTheme } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import BaseLayout from '../layouts/BaseLayout';
import CreatePollForm from '../components/CreatePollForm/CreatePollForm';

export default function HomePage() {
  const theme = useMantineTheme();
  return (
    <BaseLayout>
      <Group
        direction="column"
        p="md"
        grow
        sx={{
          backgroundColor: theme.colors.dark[8],
          borderRadius: theme.radius.md,
          border: `2px solid ${theme.colors.green[3]}`,
        }}
      >
        <CreatePollForm />
      </Group>
    </BaseLayout>
  );
}

import { Box, Divider, Group, Radio, RadioGroup, Text, useMantineTheme } from '@mantine/core';
import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import BaseLayout from '../layouts/BaseLayout';

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
          border: `2px solid ${theme.colors.blue[3]}`,
        }}
      >
        <Box>
          <Text className="body-font-style" sx={{ fontSize: 28, color: theme.colors.blue[0] }}>
            Who is the best person in the world?
          </Text>
          <Divider variant="dashed" />
          <RadioGroup p="sm">
            <Radio
              value="Kyle"
              label="Kyle testing blah"
              classNames={{ label: 'body-font-style' }}
            />
          </RadioGroup>
        </Box>
      </Group>
    </BaseLayout>
  );
}

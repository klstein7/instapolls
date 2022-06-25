import React from 'react';
import { Box, Center, Group, useMantineTheme } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const theme = useMantineTheme();
  return (
    <Group direction="column" grow sx={{ minHeight: '100vh' }}>
      <Navbar />
      <Center sx={{ flex: 1 }}>
        <Box sx={{ minWidth: theme.breakpoints.xs, maxWidth: theme.breakpoints.xl }}>
          {children}
        </Box>
      </Center>
    </Group>
  );
};

export default BaseLayout;

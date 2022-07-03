import React from 'react';
import { Box, Center, Container, Grid, Group, Space, useMantineTheme } from '@mantine/core';
import Navbar from '../components/Navbar/Navbar';

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => (
  <Group direction="column" grow position="center" sx={{ minHeight: '100vh' }}>
    <Navbar />
    <Space />

    <Center sx={{ width: '100%' }}>
      <Box
        p="xs"
        sx={{
          minWidth: '100%',
          '@media (min-width: 768px)': {
            minWidth: '768px',
          },
        }}
      >
        {children}
      </Box>
    </Center>

    <Space />
  </Group>
);

export default BaseLayout;

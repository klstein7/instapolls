import { Box, CloseButton, Group, SegmentedControl, useMantineTheme } from '@mantine/core';
import { useState } from 'react';

import useShowResults from '../../store/useShowResults';
import BarChart from '../BarChart/BarChart';
import PieChart from '../PieChart/PieChart';

const Results = () => {
  const theme = useMantineTheme();
  const { setShowResults } = useShowResults();
  const [chartType, setChartType] = useState('bar');

  return (
    <Group
      direction="column"
      p="md"
      grow
      spacing="xs"
      sx={{ borderRadius: theme.radius.md, border: `1px solid ${theme.colors.dark[6]}` }}
    >
      <Group direction="row" position="right">
        <SegmentedControl
          value={chartType}
          size="xs"
          color="green"
          data={[
            { label: 'Bar Chart', value: 'bar' },
            {
              label: 'Pie Chart',
              value: 'pie',
            },
          ]}
          onChange={(value) => setChartType(value)}
        />
        <CloseButton onClick={() => setShowResults(false)} />
      </Group>
      {chartType === 'bar' && <BarChart />}
      {chartType === 'pie' && <PieChart />}
    </Group>
  );
};

export default Results;

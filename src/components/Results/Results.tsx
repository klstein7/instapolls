import { Box, CloseButton, Group, useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';

import { useMemo } from 'react';
import useShowResults from '../../store/useShowResults';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

type ResultsProps = {
  voteCounts: {
    optionName: string;
    count: number;
  }[];
};

const Results = ({ voteCounts }: ResultsProps) => {
  const theme = useMantineTheme();
  const { setShowResults } = useShowResults();

  const options: ApexCharts.ApexOptions = useMemo(
    () => ({
      chart: {
        id: 'basic-bar',
        foreColor: theme.colors.gray[3],
        fontFamily: theme.fontFamily,
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: voteCounts.map((voteCount) => voteCount.optionName),
        labels: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          color: theme.colors.dark[6],
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
          },
        },
      },
      fill: {
        colors: [theme.colors.green[5]],
      },
      grid: {
        borderColor: theme.colors.dark[6],
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: 'dark',
      },
    }),
    [voteCounts]
  );

  const series: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: 'Results',
        data: voteCounts.map((voteCount) => voteCount.count),
      },
    ],
    [voteCounts]
  );

  return (
    <Group
      direction="column"
      p="md"
      grow
      spacing="xs"
      sx={{ borderRadius: theme.radius.md, border: `1px solid ${theme.colors.dark[6]}` }}
    >
      <Group direction="row" position="right">
        <CloseButton onClick={() => setShowResults(false)} />
      </Group>
      <Chart options={options} series={series} type="bar" />
    </Group>
  );
};

export default Results;

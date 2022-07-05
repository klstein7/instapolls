import { useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import usePollId from '../../hooks/usePollId';
import useVotesForPoll from '../../hooks/useVotesForPoll';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart = () => {
  const theme = useMantineTheme();
  const pollId = usePollId();

  const { data: voteCounts } = useVotesForPoll(pollId);

  const series: ApexAxisChartSeries = useMemo(
    () => [
      {
        name: 'Results',
        data: voteCounts?.map((voteCount) => voteCount.count) || [],
      },
    ],
    [voteCounts]
  );
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
        categories: voteCounts?.map((voteCount) => voteCount.optionName) || [],
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
  return <Chart type="bar" series={series} options={options} />;
};

export default BarChart;

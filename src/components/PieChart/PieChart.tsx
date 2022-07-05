import { useMantineTheme } from '@mantine/core';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import usePollId from '../../hooks/usePollId';
import useVotesForPoll from '../../hooks/useVotesForPoll';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const pickRandomColor = (colors: string[]) => colors[Math.floor(Math.random() * colors.length)];

const PieChart = () => {
  const pollId = usePollId();
  const { data: voteCounts } = useVotesForPoll(pollId);

  const { colors } = useMantineTheme();

  const series: number[] = useMemo(
    () => voteCounts?.map((voteCount) => voteCount.count) || [],
    [voteCounts]
  );

  const options: ApexCharts.ApexOptions = useMemo(
    () => ({
      labels: voteCounts?.map((voteCount) => voteCount.optionName) || [],
      colors:
        voteCounts?.map(() => {
          const colorKeys = Object.keys(colors);
          const randomColor = pickRandomColor(colorKeys);
          return colors[randomColor][Math.floor(Math.random() * 3) + 4];
        }) || [],
    }),
    [voteCounts]
  );

  return <Chart type="pie" series={series} options={options} />;
};

export default PieChart;

import React from 'react';
import MainSelect from '../custom-ui/main-select';
import { TChart } from '.';
import { useTranslations } from 'next-intl';

const ChartType = ({
  chartType,
  setChartType,
}: {
  chartType: TChart;
  setChartType: (value: TChart) => void;
}) => {
  const t = useTranslations('ChartName');
  const CHART = [
    {
      name: t('bar'),
      value: 'bar',
    },
    {
      name: t('area'),
      value: 'area',
    },
    {
      name: t('line'),
      value: 'line',
    },
    {
      name: t('radar'),
      value: 'radar',
    },
  ];

  return (
    <MainSelect
      id="from"
      value={chartType}
      data={CHART}
      placeholder="Select Chart Type"
      classNames={{
        trigger: ' bg-transparent  rounded-[1rem] w-full md:w-full',
        content: 'hidden md:block',
      }}
      onChange={(value) => setChartType(value as TChart)}
    />
  );
};

export default ChartType;

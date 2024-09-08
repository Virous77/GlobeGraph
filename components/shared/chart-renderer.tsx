import React from 'react';
import BarChartComp from './bar-chart';
import RadarChartComp from './radar-chart';
import AreaChartComp from './area-chart';
import LineChartComp from './line-chart';
import { ChartConfig } from '../ui/chart';
import { TCountries } from '@/hooks/use-data';

type TChartRenderer = {
  chartType: string;
  chartData: any[];
  icon: string | undefined;
  chartConfig: ChartConfig;
  countries: TCountries[];
  isCurrencySymbol: boolean;
};

const ChartRenderer: React.FC<TChartRenderer> = ({
  chartType,
  chartData,
  icon,
  chartConfig,
  countries,
  isCurrencySymbol,
}) => {
  const renderChart = (chart: string) => {
    switch (chart) {
      case 'bar':
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
            icon={icon}
          />
        );
      case 'radar':
        return (
          <RadarChartComp
            chartConfig={chartConfig}
            chartData={chartData}
            isCurrencySymbol={isCurrencySymbol}
          />
        );
      case 'area':
        return (
          <AreaChartComp
            chartConfig={chartConfig}
            chartData={chartData}
            isCurrencySymbol={isCurrencySymbol}
            icon={icon}
          />
        );
      case 'line':
        return (
          <LineChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
            icon={icon}
          />
        );
      default:
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
            icon={icon}
          />
        );
    }
  };

  return <React.Fragment>{renderChart(chartType)}</React.Fragment>;
};

export default ChartRenderer;

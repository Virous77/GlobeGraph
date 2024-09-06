import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { createChartConfig } from './config';
import { cn } from '@/lib/utils';
import { captureScreenshot, color } from '@/utils';
import { Loader } from '../ui/loader';
import TimeRange from './time-range';
import { TCountries, TTimeRange } from '@/store/use-gdp';
import ChartType from './chart-type';
import { ToolTipComp } from '../ui/tooltip';
import { BadgeInfo, CameraIcon } from 'lucide-react';
import BarChartComp from './bar-chart';
import MultiSelect from './multi-select';
import RadarChartComp from './radar-chart';
import AreaChartComp from './area-chart';
import LineChartComp from './line-chart';
import { useTheme } from 'next-themes';

export type TChart = 'area' | 'bar' | 'line' | 'radar';

type TMainChart = {
  countries: TCountries[];
  timeRange: TTimeRange;
  isLoading: boolean;
  chartData: any[];
  fetchSingleCountryGDPData: (name: string) => void;
  fetchGDPData: ({ from, to }: { from: number; to: number }) => void;
  setTimeRange: (timeRange: TTimeRange) => void;
  title: string;
  toolTipMessage: string;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  isCurrencySymbol: boolean;
};

const MainChartComp: React.FC<TMainChart> = ({
  countries,
  timeRange,
  isLoading,
  chartData,
  fetchSingleCountryGDPData,
  fetchGDPData,
  setTimeRange,
  title,
  toolTipMessage,
  setCountries,
  removeCountry,
  removeLastCountry,
  isCurrencySymbol,
}) => {
  const { theme } = useTheme();
  const [chartType, setChartType] = React.useState<TChart>('bar');

  const modifyConfig = countries.map((country) => {
    return {
      name: country.value,
      label: `${country.label}`,
    };
  });

  const chartConfig = createChartConfig(modifyConfig);

  const renderChart = (chart: string) => {
    switch (chart) {
      case 'bar':
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
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
          />
        );
      case 'line':
        return (
          <LineChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
          />
        );
      default:
        return (
          <BarChartComp
            chartData={chartData}
            chartConfig={chartConfig}
            countries={countries}
            isCurrencySymbol={isCurrencySymbol}
          />
        );
    }
  };

  return (
    <Card
      className="m-0 mt-5 p-0"
      style={{
        borderRadius: '1rem',
      }}
      id="capture-chart"
    >
      <div className="flex w-full items-start justify-between">
        <CardHeader className="p-5">
          <div className="-mb-1 flex items-start gap-4">
            <ToolTipComp name={toolTipMessage}>
              <CardTitle className="flex items-center gap-1 whitespace-nowrap text-xl md:text-2xl">
                {title}
                <BadgeInfo
                  className="custom-hide mt-[3px] hidden lg:block"
                  size={15}
                  color="hsl(var(--muted-foreground))"
                  cursor="pointer"
                />
              </CardTitle>
            </ToolTipComp>

            <CameraIcon
              onClick={() =>
                captureScreenshot({
                  elementId: 'capture-chart',
                  theme: theme || 'light',
                })
              }
              className="custom-hide mt-[2px] md:mt-1"
              cursor="pointer"
            />
          </div>

          <CardDescription
            style={{
              marginTop: '10px',
            }}
          >
            {chartData[0]?.year} - {chartData[chartData.length - 1]?.year}
          </CardDescription>
          {countries.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-5 pl-0 pt-2">
              {countries.map((country, idx) => (
                <span
                  className="mr-2 flex items-center whitespace-nowrap text-sm"
                  key={country.value}
                >
                  {country.label}
                  <span
                    style={{
                      backgroundColor: color[idx],
                    }}
                    className={cn('ml-2 inline-block h-3 w-3 rounded')}
                  />
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <div className="custom-hide mobile992:flex mr-4 mt-4 hidden w-[300px] flex-col">
          <MultiSelect
            countries={countries}
            fetchNewCountryData={fetchSingleCountryGDPData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
          />
          <TimeRange
            fetchGDPData={fetchGDPData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />

          <div className="mt-2 w-full">
            <ChartType chartType={chartType} setChartType={setChartType} />
          </div>
        </div>
      </div>

      <div className="custom-hide mobile992:hidden block w-full">
        <div className="-mt-4 flex items-center gap-1 px-4">
          <ChartType chartType={chartType} setChartType={setChartType} />
          <TimeRange
            fetchGDPData={fetchGDPData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
        <div className="mr-4 mt-4 w-full px-3">
          <MultiSelect
            countries={countries}
            fetchNewCountryData={fetchSingleCountryGDPData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
          />
        </div>
      </div>

      <CardContent className="h-[500px] w-[97vw] rounded-xl px-0 py-4 md:p-4">
        {renderChart(chartType)}
      </CardContent>
      {isLoading && <Loader type="full" />}
    </Card>
  );
};

export default MainChartComp;

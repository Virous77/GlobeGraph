import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { createChartConfig } from './config';
import { cn } from '@/lib/utils';
import { captureScreenshot, color, TTimeRange } from '@/utils';
import { Loader } from '../ui/loader';
import TimeRange from './time-range';
import ChartType from './chart-type';
import { ToolTipComp } from '../ui/tooltip';
import { BadgeInfo, CameraIcon } from 'lucide-react';
import MultiSelect from './multi-select';
import { useTheme } from 'next-themes';
import PreviewScreenshot from './preview-screenshot';
import { useLocale } from 'next-intl';
import { TCountries } from '@/hooks/use-data';
import { useHotkeys } from 'react-hotkeys-hook';
import ChartRenderer from './chart-renderer';
import Share from './share';

export type TChart = 'area' | 'bar' | 'line' | 'radar';

type TMainChart = {
  countries: TCountries[];
  timeRange: TTimeRange;
  isLoading: boolean;
  chartData: any[];
  fetchSingleCountryData: (name: string) => void;
  fetchCountryData: ({ from, to }: { from: number; to: number }) => void;
  setTimeRange: (timeRange: TTimeRange) => void;
  title: string;
  toolTipMessage: string;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  isCurrencySymbol: boolean;
  icon?: string;
  indicator: string;
  type: string;
};

const MainChartComp: React.FC<TMainChart> = ({
  countries,
  timeRange,
  isLoading,
  chartData,
  fetchSingleCountryData,
  fetchCountryData,
  setTimeRange,
  title,
  toolTipMessage,
  setCountries,
  removeCountry,
  removeLastCountry,
  isCurrencySymbol,
  icon,
  indicator,
  type,
}) => {
  const { theme } = useTheme();
  const [chartType, setChartType] = React.useState<TChart>('bar');
  const [open, setOpen] = React.useState<string>('');
  const locale = useLocale();

  useHotkeys('ctrl+s', () => {
    captureScreenshot({
      elementId: 'capture-chart',
      theme: theme || 'light',
      callback: setOpen,
    });
  });

  const modifyConfig = useMemo(
    () =>
      countries.map((country) => {
        return {
          name: country.value,
          label: `${country.label}`,
        };
      }),
    [countries]
  );

  const chartConfig = createChartConfig(modifyConfig);
  const countriesValue = useMemo(
    () => countries.map((country) => country.value),
    [countries]
  );

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
              <CardTitle className="flex items-center gap-1 text-xl md:text-2xl">
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
                  callback: setOpen,
                })
              }
              className="custom-hide mt-[2px] md:mt-1"
              cursor="pointer"
            />
            <Share
              icon={icon}
              chartType={chartType}
              countries={countriesValue}
              to={timeRange.to}
              from={timeRange.from}
              indicator={indicator}
              isCurrencySymbol={isCurrencySymbol}
              language={locale}
              type={type}
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
                    className={cn('spp ml-2 inline-block h-3 w-3 rounded')}
                  />
                </span>
              ))}
            </div>
          )}
        </CardHeader>

        <div className="custom-hide mr-4 mt-4 hidden w-[300px] flex-col mobile992:flex">
          <MultiSelect
            countries={countries}
            fetchNewCountryData={fetchSingleCountryData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
            lang={locale}
          />
          <TimeRange
            fetchCountryData={fetchCountryData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />

          <div className="mt-2 w-full">
            <ChartType chartType={chartType} setChartType={setChartType} />
          </div>
        </div>
      </div>

      <div className="custom-hide block w-full mobile992:hidden">
        <div className="-mt-4 flex items-center gap-1 px-4">
          <ChartType chartType={chartType} setChartType={setChartType} />
          <TimeRange
            fetchCountryData={fetchCountryData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        </div>
        <div className="mr-4 mt-4 w-full px-3">
          <MultiSelect
            lang={locale}
            countries={countries}
            fetchNewCountryData={fetchSingleCountryData}
            setCountries={setCountries}
            removeCountry={removeCountry}
            removeLastCountry={removeLastCountry}
          />
        </div>
      </div>

      <CardContent className="h-[500px] w-[97vw] rounded-xl px-0 py-4 md:p-4">
        <ChartRenderer
          chartType={chartType}
          chartData={chartData}
          icon={icon}
          chartConfig={chartConfig}
          countries={countries}
          isCurrencySymbol={isCurrencySymbol}
        />
      </CardContent>
      {isLoading && <Loader type="full" />}
      <PreviewScreenshot open={open} setOpen={setOpen} />
    </Card>
  );
};

export default MainChartComp;

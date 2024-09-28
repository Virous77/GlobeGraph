'use client';

import React, { useMemo, useState } from 'react';
import { useShare } from '@/hooks/use-share';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ToolTipComp } from '../ui/tooltip';
import { BadgeInfo, CameraIcon } from 'lucide-react';
import { captureScreenshot, color } from '@/utils';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import ChartRenderer from '../shared/chart-renderer';
import { createChartConfig } from '../shared/config';
import { Loader } from '../ui/loader';
import PreviewScreenshot from '../shared/preview-screenshot';
import en from '@/messages/en.json';
import es from '@/messages/es.json';
import fr from '@/messages/fr.json';
import hi from '@/messages/hi.json';

type TLanguage = {
  [key: string]: any;
};

const LANGUAGES: TLanguage = {
  en,
  es,
  fr,
  hi,
};

const ShareComp = () => {
  const [open, setOpen] = useState('');
  const { theme } = useTheme();
  const { chartData, countries, sharedData, isLoading } = useShare();

  const modifyConfig = useMemo(
    () =>
      countries?.map((country) => {
        return {
          name: country.value,
          label: `${country.label}`,
        };
      }),
    [countries]
  );

  const chartConfig = createChartConfig(modifyConfig);
  const currentLangData = LANGUAGES[sharedData.language as string];

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
            <ToolTipComp name={currentLangData.Chart[`${sharedData.type}Desc`]}>
              <CardTitle className="flex items-center gap-1 whitespace-nowrap text-xl md:text-2xl">
                {currentLangData.Chart[sharedData.type!]}
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
                  callback: (e) => setOpen(e),
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
                    className={cn('spp ml-2 inline-block h-3 w-3 rounded')}
                  />
                </span>
              ))}
            </div>
          )}
        </CardHeader>
      </div>

      <CardContent className="h-[500px] w-[97vw] rounded-xl px-0 py-4 md:p-4">
        <ChartRenderer
          chartType={sharedData.chartType as 'bar' | 'radar' | 'area' | 'line'}
          chartData={chartData}
          icon={sharedData.icon as string}
          chartConfig={chartConfig}
          countries={countries}
          isCurrencySymbol={sharedData.isCurrencySymbol as boolean}
        />
      </CardContent>
      {isLoading && <Loader type="full" />}
      <PreviewScreenshot open={open} setOpen={setOpen} />
    </Card>
  );
};

export default ShareComp;

'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { transformOBJtoARR } from '@/utils';

const opacity = [0.5, 0.65, 0.75, 0.85, 1];

const RadarChartComp = ({
  chartData,
  chartConfig,
  isCurrencySymbol = true,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  isCurrencySymbol?: boolean;
}) => {
  const sortedCountry = transformOBJtoARR(chartData[0]).reverse();

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[500px]"
    >
      <RadarChart
        data={chartData}
        margin={{
          top: 10,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              isCurrencySymbol={isCurrencySymbol}
            />
          }
        />
        <PolarAngleAxis
          dataKey="year"
          tick={({ x, y, textAnchor, value, index, ...props }) => {
            const data = chartData[index];
            return (
              <text
                x={x}
                y={
                  chartData.length > 5
                    ? y - 12
                    : chartData.length - 5
                      ? y - 6
                      : y
                }
                textAnchor={textAnchor}
                fontSize={13}
                fontWeight={700}
                {...props}
              >
                <tspan
                  x={x}
                  dy={'1rem'}
                  fontSize={12}
                  className="fill-muted-foreground"
                >
                  {data.year}
                </tspan>
              </text>
            );
          }}
        />

        <PolarGrid />
        {sortedCountry.map((country, idx) => (
          <Radar
            dataKey={country.country}
            fill={`var(--color-${country.country})`}
            key={idx}
            fillOpacity={opacity[idx]}
          />
        ))}
      </RadarChart>
    </ChartContainer>
  );
};

export default RadarChartComp;

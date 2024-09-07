'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency, transformOBJtoARR } from '@/utils';

const AreaChartComp = ({
  chartData,
  chartConfig,
  isCurrencySymbol = true,
  icon,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  isCurrencySymbol?: boolean;
  icon?: string;
}) => {
  const sortedCountry = transformOBJtoARR(chartData[0]);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const formattedValue = formatCurrency(
              value,
              isCurrencySymbol,
              icon
            ).split('.');
            return formattedValue[0] + formattedValue[1].slice(2);
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              isCurrencySymbol={isCurrencySymbol}
              icon={icon}
            />
          }
        />

        {sortedCountry.map((country) => (
          <Area
            dataKey={country.country}
            fill={`var(--color-${country.country})`}
            key={country.country}
            stroke={`var(--color-${country.country})`}
            type="monotone"
            stackId={1}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
};

export default AreaChartComp;

"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency, transformOBJtoARR } from "@/utils";

const AreaChartComp = ({
  chartData,
  chartConfig,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
}) => {
  const sortedCountry = transformOBJtoARR(chartData[0]);

  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
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
            const formattedValue = formatCurrency(value).split(".");
            return formattedValue[0] + formattedValue[1].slice(2);
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
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

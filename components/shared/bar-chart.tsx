import React from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { TCountries } from "@/store/use-gdp";
import { formatCurrency, TTimeRange } from "@/utils";

const BarChartComp = ({
  chartData,
  chartConfig,
  countries,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  countries: TCountries[];
}) => {
  return (
    <ChartContainer config={chartConfig} className="w-full h-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
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
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {countries.map((country, idx) => (
          <Bar
            dataKey={country.value}
            fill={`var(--color-${country.value})`}
            radius={5}
            key={idx}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

export default BarChartComp;

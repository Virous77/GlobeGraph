"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGDPStore } from "@/store/use-gdp";
import { extractValueFromObject, formatCurrency } from "@/utils";

const GDPLineChart = ({
  chartData,
  chartConfig,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
}) => {
  const { countries, timeRange } = useGDPStore();

  const YAxisData = chartData[0];

  console.log(extractValueFromObject(YAxisData));

  return (
    <ChartContainer
      style={{ width: "100%", height: "100%" }}
      config={chartConfig}
      id={`${timeRange.from}-${timeRange.to}`}
    >
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            return formatCurrency(value);
          }}
          domain={["dataMin", "dataMax"]}
        />

        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {countries.map((country, idx) => (
          <Line
            dataKey={country.value}
            stroke={`var(--color-${country.value})`}
            key={idx}
            type="monotone"
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
};

export default GDPLineChart;

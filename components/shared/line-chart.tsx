import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { formatCurrency } from '@/utils';
import { TCountries } from '@/hooks/use-data';

const LineChartComp = ({
  chartData,
  chartConfig,
  countries,
  isCurrencySymbol = true,
  icon,
}: {
  chartData: any[];
  chartConfig: ChartConfig;
  countries: TCountries[];
  isCurrencySymbol?: boolean;
  icon?: string;
}) => {
  return (
    <ChartContainer
      style={{ width: '100%', height: '100%' }}
      config={chartConfig}
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
            return formatCurrency(value, isCurrencySymbol, icon);
          }}
          domain={['dataMin', 'dataMax']}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dashed"
              isCurrencySymbol={isCurrencySymbol}
              icon={icon}
            />
          }
        />
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

export default LineChartComp;

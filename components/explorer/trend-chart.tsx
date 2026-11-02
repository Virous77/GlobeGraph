'use client';

import { useLocale } from 'next-intl';
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TMetric, TMetricFormat } from '@/data-layer/metrics';
import { formatValue } from '@/lib/format';
import { TRow } from '@/lib/series';

const AXIS = { fill: 'var(--axis)', fontSize: 12 };

type TTooltip = {
  active?: boolean;
  label?: number | string;
  payload?: readonly {
    dataKey?: unknown;
    value?: unknown;
    color?: string;
  }[];
  labels: Record<string, string>;
  format: TMetricFormat;
  locale: string;
};

const ChartTooltip = ({
  active,
  label,
  payload,
  labels,
  format,
  locale,
}: TTooltip) => {
  if (!active || !payload?.length) return null;

  const rows = payload
    .filter((item) => typeof item.value === 'number')
    .sort((a, b) => (b.value as number) - (a.value as number));

  return (
    <div className="bg-surface min-w-40 rounded-lg border p-2 text-sm shadow-lg">
      <p className="text-ink-2 mb-1 text-xs">{label}</p>
      {rows.map((item) => (
        <p key={String(item.dataKey)} className="flex items-center gap-2">
          <span
            className="h-0.5 w-3 shrink-0 rounded"
            style={{ background: item.color }}
          />
          <span className="font-medium tabular-nums">
            {formatValue(item.value as number, format, locale)}
          </span>
          <span className="text-ink-2 truncate">
            {labels[String(item.dataKey)]}
          </span>
        </p>
      ))}
    </div>
  );
};

const TrendChart = ({
  rows,
  countries,
  labels,
  slots,
  metric,
}: {
  rows: TRow[];
  countries: string[];
  labels: Record<string, string>;
  slots: Record<string, number>;
  metric: TMetric;
}) => {
  const locale = useLocale();
  const isSingle = countries.length === 1;
  // Straight joins: a curve between surveys would invent data that isn't there
  const dot = metric.sparse
    ? { r: 4, strokeWidth: 2, stroke: 'var(--surface)', fillOpacity: 1 }
    : false;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={rows}
        margin={{ top: 8, right: 12, bottom: 0, left: 0 }}
      >
        <CartesianGrid vertical={false} stroke="var(--grid)" />
        <XAxis
          dataKey="year"
          tickLine={false}
          axisLine={{ stroke: 'var(--grid)' }}
          tick={AXIS}
          tickMargin={8}
          minTickGap={32}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={AXIS}
          width={68}
          domain={metric.zeroBased ? [0, 'auto'] : ['auto', 'auto']}
          tickFormatter={(value: number) =>
            formatValue(value, metric.format, locale)
          }
        />
        <Tooltip
          cursor={{ stroke: 'var(--axis)', strokeWidth: 1 }}
          isAnimationActive={false}
          content={(props) => (
            <ChartTooltip
              active={props.active}
              label={props.label as number}
              payload={props.payload}
              labels={labels}
              format={metric.format}
              locale={locale}
            />
          )}
        />
        {countries.map((code) => {
          const color = `var(--series-${slots[code] + 1})`;
          return isSingle ? (
            <Area
              key={code}
              dataKey={code}
              type="linear"
              stroke={color}
              strokeWidth={2}
              fill={color}
              fillOpacity={0.1}
              dot={dot && { ...dot, fill: color }}
              activeDot={{ r: 4 }}
              connectNulls
              isAnimationActive={false}
            />
          ) : (
            <Line
              key={code}
              dataKey={code}
              type="linear"
              stroke={color}
              strokeWidth={2}
              dot={dot && { ...dot, fill: color }}
              activeDot={{ r: 4 }}
              connectNulls
              isAnimationActive={false}
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default TrendChart;

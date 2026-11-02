import { TMetricFormat } from '@/data-layer/metrics';
import { TPoint, TSeriesMap } from '@/data-layer/types';

export type TRow = { year: number } & Record<string, number | null>;

const inRange = (points: TPoint[], from: number, to: number) =>
  points.filter(([year]) => year >= from && year <= to);

// Oldest first, with null where a country has no data: a gap, never a zero
export const toRows = (
  series: TSeriesMap,
  countries: string[],
  from: number,
  to: number
) => {
  const rows: TRow[] = [];
  for (let year = from; year <= to; year++) {
    const row = { year } as TRow;
    let hasValue = false;
    countries.forEach((code) => {
      const point = series[code]?.find(([y]) => y === year);
      row[code] = point ? point[1] : null;
      if (point) hasValue = true;
    });
    if (hasValue) rows.push(row);
  }
  return rows;
};

export type TSummary = {
  code: string;
  year: number;
  value: number;
  firstYear: number;
  // Percent change for amounts, point change for rates
  change: number | null;
};

const POINT_CHANGE: TMetricFormat[] = ['percent', 'index', 'years'];

export const summarize = (
  points: TPoint[] | undefined,
  code: string,
  from: number,
  to: number,
  format: TMetricFormat
): TSummary | null => {
  const range = inRange(points ?? [], from, to);
  const last = range.at(-1);
  if (!last) return null;

  const [firstYear, first] = range[0];
  const [year, value] = last;
  let change: number | null = null;
  if (range.length > 1) {
    if (POINT_CHANGE.includes(format)) change = value - first;
    else if (first > 0) change = ((value - first) / first) * 100;
  }

  return { code, year, value, firstYear, change };
};

export const isPointChange = (format: TMetricFormat) =>
  POINT_CHANGE.includes(format);

import 'server-only';
import { FIRST_YEAR } from './metrics';
import { TPoint, TSeriesMap } from './types';

// The World Bank publishes no rate limit, but it marks responses cacheable for
// a day and the data changes a few times a year. Every series is fetched at
// most once a day for all visitors, and the browser only ever calls our API.
export const CACHE_SECONDS = 60 * 60 * 24;

// Short, so a dead source falls through to the next one inside a page render
const TIMEOUT_MS = 4000;

const fetchJson = async (url: string): Promise<unknown> => {
  const res = await fetch(url, {
    next: { revalidate: CACHE_SECONDS },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`${url} responded ${res.status}`);
  return res.json();
};

const toPoints = (rows: { year: unknown; value: unknown }[]) =>
  rows
    .filter(({ value }) => value !== null && value !== '')
    .map(({ year, value }): TPoint => [Number(year), Number(value)])
    .filter(([year, value]) => year >= FIRST_YEAR && Number.isFinite(value))
    .sort((a, b) => a[0] - b[0]);

type TData360Row = { TIME_PERIOD: string; OBS_VALUE: string | null };

const fromData360 = async (indicator: string, country: string) => {
  const code = `WB_WDI_${indicator.replace(/\./g, '_')}`;
  const body = (await fetchJson(
    `https://data360api.worldbank.org/data360/data?DATABASE_ID=WB_WDI&INDICATOR=${code}&REF_AREA=${country}&top=1000&skip=0`
  )) as { value?: TData360Row[] };
  if (!Array.isArray(body.value)) throw new Error('Data360 returned no rows');

  return toPoints(
    body.value.map((row) => ({ year: row.TIME_PERIOD, value: row.OBS_VALUE }))
  );
};

type TIndicatorRow = { date: string; value: number | null };

const fromIndicatorsApi = async (indicator: string, country: string) => {
  const to = new Date().getFullYear();
  // Default paging is 50 rows, which would cut off the oldest years
  const body = await fetchJson(
    `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?date=${FIRST_YEAR}:${to}&format=json&per_page=100`
  );
  // Errors arrive as a 200 holding [{ message }], with no rows beside it
  const rows = Array.isArray(body) ? (body[1] as TIndicatorRow[]) : null;
  if (!Array.isArray(rows)) throw new Error('Indicators API returned no rows');

  return toPoints(rows.map(({ date, value }) => ({ year: date, value })));
};

// Two separate World Bank services hold the same data. The Indicators API had a
// long outage where it answered 502 for everything outside its edge cache, so
// one going down mustn't take the charts with it. Data360 is missing a few
// series, like government debt, which is why an empty answer also falls through.
export const getSeries = async (indicator: string, country: string) => {
  let lastError: unknown;

  for (const source of [fromData360, fromIndicatorsApi]) {
    try {
      const points = await source(indicator, country);
      if (points.length) return points;
    } catch (error) {
      lastError = error;
    }
  }

  // Empty from every source is a real gap. An error might only be an outage.
  if (lastError) throw lastError;
  return [];
};

// For the first render. A failure here isn't fatal: the browser retries it.
export const getSeriesMap = async (indicator: string, countries: string[]) => {
  const results = await Promise.allSettled(
    countries.map((country) => getSeries(indicator, country))
  );

  return results.reduce<TSeriesMap>((series, result, idx) => {
    if (result.status === 'fulfilled') series[countries[idx]] = result.value;
    return series;
  }, {});
};

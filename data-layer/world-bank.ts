import 'server-only';
import { FIRST_YEAR } from './metrics';
import { TPoint, TSeriesMap } from './types';

// The World Bank publishes no rate limit, but it marks responses cacheable for
// a day and the data changes a few times a year. Every series is fetched at
// most once a day for all visitors, and the browser only ever calls our API.
export const CACHE_SECONDS = 60 * 60 * 24;

const MAX_WAIT_MS = 3000;

type TRow = { date: string; value: number | null };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const parseRows = (body: unknown): TPoint[] => {
  // Errors arrive as a 200 holding [{ message }], with no rows beside it
  const rows = Array.isArray(body) ? (body[1] as TRow[] | undefined) : null;
  if (!Array.isArray(rows)) throw new Error('World Bank returned no rows');

  return rows
    .filter((row) => row.value !== null)
    .map((row): TPoint => [Number(row.date), row.value as number])
    .sort((a, b) => a[0] - b[0]);
};

export const getSeries = async (indicator: string, country: string) => {
  const to = new Date().getFullYear();
  // Default paging is 50 rows, which would cut off the oldest years
  const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?date=${FIRST_YEAR}:${to}&format=json&per_page=100`;

  const fetchPage = () =>
    fetch(url, {
      next: { revalidate: CACHE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });

  let res = await fetchPage();
  if (res.status === 429 || res.status >= 500) {
    const retryAfter = Number(res.headers.get('retry-after')) * 1000;
    await sleep(Math.min(retryAfter || 1000, MAX_WAIT_MS));
    res = await fetchPage();
  }
  if (!res.ok) throw new Error(`World Bank responded ${res.status}`);

  return parseRows(await res.json());
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

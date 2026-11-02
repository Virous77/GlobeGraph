import { TPoint } from '@/data-layer/types';

const fetchSeries = async (slug: string, code: string) => {
  const res = await fetch(`/api/indicator/${slug}/${code}`);
  if (!res.ok) throw new Error('Failed to load data');
  return (await res.json()) as TPoint[];
};

export const seriesQuery = (slug: string, code: string) => ({
  queryKey: ['series', slug, code],
  queryFn: () => fetchSeries(slug, code),
});

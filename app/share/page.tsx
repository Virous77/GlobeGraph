import { permanentRedirect } from 'next/navigation';
import { DEFAULT_METRIC, getMetricByIndicator } from '@/data-layer/metrics';

type TProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Old share links. The explorer's own URL is the share link now.
const SharePage = async ({ searchParams }: TProps) => {
  const { countries, from, to, indicator, chartType } = await searchParams;
  const metric =
    (typeof indicator === 'string' && getMetricByIndicator(indicator)) ||
    DEFAULT_METRIC;

  const query = new URLSearchParams();
  if (typeof countries === 'string') query.set('c', countries);
  if (typeof from === 'string') query.set('from', from);
  if (typeof to === 'string') query.set('to', to);
  if (chartType === 'bar') query.set('view', 'ranking');

  permanentRedirect(`/country/${metric.slug}?${query}`);
};

export default SharePage;

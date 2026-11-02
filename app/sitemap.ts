import { MetadataRoute } from 'next';
import { METRICS } from '@/data-layer/metrics';
import { getMetricUrl, SITE_URL } from '@/lib/seo';

const sitemap = (): MetadataRoute.Sitemap => [
  { url: `${SITE_URL}/`, priority: 1, changeFrequency: 'monthly' },
  ...METRICS.map(({ slug }) => ({
    url: getMetricUrl(slug),
    priority: 0.9,
    changeFrequency: 'monthly' as const,
  })),
];

export default sitemap;

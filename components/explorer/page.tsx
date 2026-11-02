import { getLocale, getTranslations } from 'next-intl/server';
import { SearchParams } from 'nuqs/server';
import { METRIC_GROUPS, METRICS, TMetric } from '@/data-layer/metrics';
import { getSeriesMap } from '@/data-layer/world-bank';
import { getCountryOptions } from '@/lib/countries';
import { loadSelection, normalizeSelection } from '@/lib/selection';
import { getMetricUrl, SITE_NAME } from '@/lib/seo';
import Explorer from './explorer';
import MetricNav from './metric-nav';

// "<" can't be left in JSON placed inside a <script> tag
const toJsonLd = (data: object) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const ExplorerPage = async ({
  metric,
  searchParams,
}: {
  metric: TMetric;
  searchParams: Promise<SearchParams>;
}) => {
  const [t, locale, raw] = await Promise.all([
    getTranslations(),
    getLocale(),
    loadSelection(searchParams),
  ]);

  const selection = normalizeSelection(raw);
  const series = await getSeriesMap(metric.indicator, selection.countries);
  const name = t(`Metric.${metric.key}.name`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: t('Seo.title', { metric: name }),
    description: t(`Metric.${metric.key}.about`),
    url: getMetricUrl(metric.slug),
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
    isBasedOn: `https://data.worldbank.org/indicator/${metric.indicator}`,
    creator: {
      '@type': 'Organization',
      name: 'World Bank',
      url: 'https://www.worldbank.org/',
    },
    includedInDataCatalog: { '@type': 'DataCatalog', name: SITE_NAME },
    variableMeasured: name,
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] flex-1 lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8 lg:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: toJsonLd(jsonLd) }}
      />
      <MetricNav
        label={t('Nav.label')}
        groups={METRIC_GROUPS.map((group) => ({
          group,
          title: t(`Nav.${group}`),
          metrics: METRICS.filter((m) => m.group === group).map((m) => ({
            slug: m.slug,
            name: t(`Metric.${m.key}.name`),
          })),
        }))}
      />
      <main className="min-w-0 px-4 py-5 lg:px-0 lg:py-6">
        <Explorer
          initialSlug={metric.slug}
          options={getCountryOptions(locale)}
          initialSeries={series}
        />
      </main>
    </div>
  );
};

export default ExplorerPage;

import { ExternalLink } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { SearchParams } from 'nuqs/server';
import { METRIC_GROUPS, METRICS, TMetric } from '@/data-layer/metrics';
import { getSeriesMap } from '@/data-layer/world-bank';
import { getCountryOptions } from '@/lib/countries';
import { getDefaultTitle } from '@/lib/metadata';
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
  isHome = false,
}: {
  metric: TMetric;
  isHome?: boolean;
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
  const about = t(`Metric.${metric.key}.about`);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: t('Seo.title', { metric: name }),
    description: about,
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
        active={metric.slug}
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
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {name}
        </h1>
        <p className="text-ink-2 mt-1 max-w-3xl">{about}</p>

        <Explorer
          key={metric.slug}
          metric={metric}
          metricName={name}
          pageTitle={await getDefaultTitle(metric, isHome)}
          options={getCountryOptions(locale)}
          initialSeries={series}
        />

        <a
          href={`https://data.worldbank.org/indicator/${metric.indicator}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink-2 mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-2"
        >
          {t('Explorer.sourceLink')}
          <ExternalLink className="size-3.5" />
        </a>
      </main>
    </div>
  );
};

export default ExplorerPage;

import { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { SearchParams } from 'nuqs/server';
import { TMetric } from '@/data-layer/metrics';
import { getCountryOptions } from '@/lib/countries';
import {
  isDefaultSelection,
  loadSelection,
  normalizeSelection,
} from '@/lib/selection';
import {
  buildChartTitle,
  getMetricUrl,
  SITE_NAME,
  SITE_URL,
  withSiteName,
} from '@/lib/seo';

const getDefaultTitle = async (metric: TMetric, isHome: boolean) => {
  const t = await getTranslations();
  return withSiteName(
    isHome
      ? t('Seo.homeTitle')
      : t('Seo.title', { metric: t(`Metric.${metric.key}.name`) })
  );
};

export const buildMetadata = async ({
  metric,
  searchParams,
  isHome = false,
}: {
  metric: TMetric;
  searchParams: Promise<SearchParams>;
  isHome?: boolean;
}): Promise<Metadata> => {
  const [t, locale, raw] = await Promise.all([
    getTranslations(),
    getLocale(),
    loadSelection(searchParams),
  ]);

  const selection = normalizeSelection(raw);
  const name = t(`Metric.${metric.key}.name`);
  const description = t(`Metric.${metric.key}.about`);
  const url = isHome ? `${SITE_URL}/` : getMetricUrl(metric.slug);

  let pageTitle = await getDefaultTitle(metric, isHome);
  if (!isDefaultSelection(raw)) {
    const options = getCountryOptions(locale);
    pageTitle = withSiteName(
      buildChartTitle({
        metric: name,
        from: selection.from,
        to: selection.to,
        labels: selection.countries.map(
          (code) => options.find((o) => o.code === code)?.label ?? code
        ),
      })
    );
  }

  const pageDescription = isHome ? t('Seo.homeDescription') : description;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [name, t('Seo.keyword', { metric: name }), 'World Bank data'],
    // Every chart variation is the same page to a search engine
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      url,
      title: pageTitle,
      description: pageDescription,
    },
  };
};

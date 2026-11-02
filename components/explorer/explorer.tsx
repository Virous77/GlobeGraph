'use client';

import { useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { ExternalLink } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { TCountryOption, TSeriesMap } from '@/data-layer/types';
import { formatValue } from '@/lib/format';
import { isDefaultSelection } from '@/lib/selection';
import { buildChartTitle, withSiteName } from '@/lib/seo';
import { summarize, toRows } from '@/lib/series';
import CountryPicker from './country-picker';
import DataTable from './data-table';
import ExportActions from './export-actions';
import RangeControl from './range-control';
import Ranking from './ranking';
import StatCards from './stat-cards';
import { useExplorer } from './use-explorer';
import { useMetric } from './use-metric';
import ViewTabs from './view-tabs';

// Recharts is the heaviest dependency and needs the browser to measure itself
const TrendChart = dynamic(() => import('./trend-chart'), {
  ssr: false,
  loading: () => <div className="h-full" />,
});

const Explorer = ({
  initialSlug,
  options,
  initialSeries,
}: {
  initialSlug: string;
  options: TCountryOption[];
  initialSeries: TSeriesMap;
}) => {
  const t = useTranslations('Explorer');
  const tRoot = useTranslations();
  const { metric, isHome } = useMetric();
  const metricName = tRoot(`Metric.${metric.key}.name`);
  const locale = useLocale();
  const chartRef = useRef<HTMLDivElement>(null);
  const { raw, selection, series, slots, isLoading, failed, retry, setRaw } =
    useExplorer(metric.slug, initialSlug, initialSeries);
  const { countries, from, to, view } = selection;

  const labels = useMemo(
    () => Object.fromEntries(options.map(({ code, label }) => [code, label])),
    [options]
  );
  const names = countries.map((code) => labels[code] ?? code);
  const rows = toRows(series, countries, from, to);
  const summaries = countries.flatMap((code) => {
    const summary = summarize(series[code], code, from, to, metric.format);
    return summary ? [summary] : [];
  });
  const leader = [...summaries].sort((a, b) => b.value - a.value)[0];

  const chartTitle = buildChartTitle({
    metric: metricName,
    labels: names,
    from,
    to,
  });

  // Matches the server's title, then follows the chart as it changes
  const defaultTitle = isHome
    ? tRoot('Seo.homeTitle')
    : tRoot('Seo.title', { metric: metricName });
  const documentTitle = withSiteName(
    isDefaultSelection(raw) ? defaultTitle : chartTitle
  );
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const format = (value: number) => formatValue(value, metric.format, locale);

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
        {metricName}
      </h1>
      <p className="text-ink-2 mt-1 min-h-12 max-w-3xl">
        {tRoot(`Metric.${metric.key}.about`)}
      </p>

      <div className="mt-5 space-y-4">
        <section className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <CountryPicker
            options={options}
            selected={countries}
            onAdd={(code) => setRaw({ c: [...countries, code] })}
          />
          <RangeControl
            from={from}
            to={to}
            onChange={(range) => setRaw(range)}
          />
        </section>

        <StatCards
          countries={countries}
          summaries={summaries}
          labels={labels}
          slots={slots}
          format={metric.format}
          isLoading={isLoading}
          failed={failed}
          onRemove={(code) =>
            setRaw({ c: countries.filter((item) => item !== code) })
          }
        />

        <section className="bg-surface rounded-xl border">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b p-3">
            <ViewTabs view={view} onChange={(next) => setRaw({ view: next })} />
            <ExportActions
              chartRef={chartRef}
              canSaveImage={view === 'trend' && rows.length > 0}
              title={chartTitle}
              legend={countries.map((code) => ({
                label: labels[code] ?? code,
                slot: slots[code],
              }))}
            />
          </div>

          <div className="p-3 md:p-4">
            {leader && (
              <p className="text-ink-2 mb-3 text-sm">
                {countries.length > 1
                  ? t('insightLeader', {
                      country: labels[leader.code] ?? leader.code,
                      value: format(leader.value),
                      year: leader.year,
                    })
                  : t('insightSingle', {
                      country: labels[leader.code] ?? leader.code,
                      value: format(leader.value),
                      year: leader.year,
                    })}
              </p>
            )}

            {failed.length > 0 && (
              <p role="alert" className="mb-3 text-sm">
                {t('loadError')}{' '}
                <button
                  type="button"
                  onClick={retry}
                  className="text-accent font-medium underline underline-offset-2"
                >
                  {t('retry')}
                </button>
              </p>
            )}

            {!countries.length ? (
              <div className="flex h-72 flex-col items-center justify-center text-center">
                <p className="font-medium">{t('emptyTitle')}</p>
                <p className="text-ink-2 text-sm">{t('emptyHint')}</p>
              </div>
            ) : !rows.length && isLoading ? (
              <div
                aria-hidden
                className="bg-sunken h-[320px] animate-pulse rounded-lg md:h-[440px]"
              />
            ) : !rows.length ? (
              <div className="flex h-72 items-center justify-center text-center">
                <p className="text-ink-2 text-sm">{t('noDataRange')}</p>
              </div>
            ) : view === 'ranking' ? (
              <Ranking
                summaries={summaries}
                labels={labels}
                slots={slots}
                format={metric.format}
              />
            ) : (
              <div
                key={metric.slug}
                ref={chartRef}
                role="img"
                aria-label={chartTitle}
                className="fade-in h-[320px] md:h-[440px]"
              >
                <TrendChart
                  rows={rows}
                  countries={countries}
                  labels={labels}
                  slots={slots}
                  metric={metric}
                />
              </div>
            )}

            {metric.sparse && (
              <p className="text-ink-2 mt-3 text-sm">{t('sparseNote')}</p>
            )}
          </div>
        </section>

        <DataTable
          rows={rows}
          countries={countries}
          labels={labels}
          format={metric.format}
        />
      </div>

      <a
        href={`https://data.worldbank.org/indicator/${metric.indicator}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-ink-2 mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-2"
      >
        {t('sourceLink')}
        <ExternalLink className="size-3.5" />
      </a>
    </>
  );
};

export default Explorer;

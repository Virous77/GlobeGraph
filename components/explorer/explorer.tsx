'use client';

import { useEffect, useMemo, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import { TMetric } from '@/data-layer/metrics';
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
import ViewTabs from './view-tabs';

// Recharts is the heaviest dependency and needs the browser to measure itself
const TrendChart = dynamic(() => import('./trend-chart'), {
  ssr: false,
  loading: () => <div className="h-full" />,
});

const Explorer = ({
  metric,
  metricName,
  pageTitle,
  options,
  initialSeries,
}: {
  metric: TMetric;
  metricName: string;
  pageTitle: string;
  options: TCountryOption[];
  initialSeries: TSeriesMap;
}) => {
  const t = useTranslations('Explorer');
  const locale = useLocale();
  const chartRef = useRef<HTMLDivElement>(null);
  const { raw, selection, series, slots, isLoading, failed, retry, setRaw } =
    useExplorer(metric.slug, initialSeries);
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
  const documentTitle = isDefaultSelection(raw)
    ? pageTitle
    : withSiteName(chartTitle);
  useEffect(() => {
    document.title = documentTitle;
  }, [documentTitle]);

  const format = (value: number) => formatValue(value, metric.format, locale);

  return (
    <div className="mt-5 space-y-4">
      <section className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <CountryPicker
          options={options}
          selected={countries}
          onAdd={(code) => setRaw({ c: [...countries, code] })}
        />
        <RangeControl from={from} to={to} onChange={(range) => setRaw(range)} />
      </section>

      <StatCards
        countries={countries}
        summaries={summaries}
        labels={labels}
        slots={slots}
        format={metric.format}
        isLoading={isLoading}
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

          {failed && (
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
          ) : !rows.length && !isLoading ? (
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
              ref={chartRef}
              role="img"
              aria-label={chartTitle}
              className="h-[320px] md:h-[440px]"
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
  );
};

export default Explorer;

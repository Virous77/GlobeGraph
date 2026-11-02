'use client';

import { ArrowDown, ArrowUp, X } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { TMetricFormat } from '@/data-layer/metrics';
import { formatValue } from '@/lib/format';
import { isPointChange, TSummary } from '@/lib/series';

const formatChange = (
  { change }: TSummary,
  format: TMetricFormat,
  locale: string,
  points: (value: string) => string
) => {
  const size = Math.abs(change ?? 0);
  const number = new Intl.NumberFormat(locale, {
    maximumFractionDigits: size >= 100 ? 0 : 1,
  }).format(size);
  return isPointChange(format) ? points(number) : `${number}%`;
};

// Doubles as the chart legend, so a color is never the only label
const StatCards = ({
  countries,
  summaries,
  labels,
  slots,
  format,
  isLoading,
  onRemove,
}: {
  countries: string[];
  summaries: TSummary[];
  labels: Record<string, string>;
  slots: Record<string, number>;
  format: TMetricFormat;
  isLoading: boolean;
  onRemove: (code: string) => void;
}) => {
  const t = useTranslations('Explorer');
  const locale = useLocale();

  if (!countries.length) return null;

  return (
    <ul className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-3 md:px-0 xl:grid-cols-5">
      {countries.map((code) => {
        const summary = summaries.find((item) => item.code === code);
        const label = labels[code] ?? code;
        return (
          <li
            key={code}
            className="bg-surface w-44 shrink-0 rounded-xl border p-3 md:w-auto md:min-w-0"
          >
            <div className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: `var(--series-${slots[code] + 1})` }}
              />
              <span className="text-ink-2 truncate text-sm">{label}</span>
              <button
                type="button"
                aria-label={t('removeCountry', { country: label })}
                onClick={() => onRemove(code)}
                className="text-ink-2 hover:bg-sunken -m-1 ml-auto shrink-0 rounded p-1"
              >
                <X className="size-3.5" />
              </button>
            </div>
            {summary ? (
              <>
                <p className="mt-1 text-xl font-semibold">
                  {formatValue(summary.value, format, locale)}
                </p>
                <p className="text-ink-2 flex flex-wrap items-center gap-x-1 text-xs">
                  <span>{summary.year}</span>
                  {summary.change !== null && (
                    <span className="inline-flex items-center">
                      ·
                      {summary.change >= 0 ? (
                        <ArrowUp className="ml-1 size-3" />
                      ) : (
                        <ArrowDown className="ml-1 size-3" />
                      )}
                      {t('changeSince', {
                        change: formatChange(summary, format, locale, (value) =>
                          t('points', { value })
                        ),
                        year: summary.firstYear,
                      })}
                    </span>
                  )}
                </p>
              </>
            ) : isLoading ? (
              <div className="mt-2 space-y-2" aria-hidden>
                <div className="bg-sunken h-6 w-24 animate-pulse rounded" />
                <div className="bg-sunken h-3 w-16 animate-pulse rounded" />
              </div>
            ) : (
              <p className="text-ink-2 mt-2 text-sm">{t('noData')}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default StatCards;

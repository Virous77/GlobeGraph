'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TMetricFormat } from '@/data-layer/metrics';
import { formatValue } from '@/lib/format';
import { TSummary } from '@/lib/series';

// Plain HTML, so the comparison is in the page for crawlers and screen readers
const Ranking = ({
  summaries,
  labels,
  slots,
  format,
}: {
  summaries: TSummary[];
  labels: Record<string, string>;
  slots: Record<string, number>;
  format: TMetricFormat;
}) => {
  const t = useTranslations('Explorer');
  const locale = useLocale();
  const ranked = [...summaries].sort((a, b) => b.value - a.value);
  const values = ranked.map(({ value }) => value);
  const min = Math.min(0, ...values);
  const span = Math.max(0, ...values) - min || 1;
  const toPercent = (value: number) => ((value - min) / span) * 100;
  const zero = toPercent(0);

  return (
    <>
      <ol className="space-y-3">
        {ranked.map(({ code, value, year }) => (
          <li
            key={code}
            className="grid grid-cols-[minmax(0,7rem)_1fr] items-center gap-3 md:grid-cols-[minmax(0,10rem)_1fr]"
          >
            <span className="truncate text-sm">{labels[code] ?? code}</span>
            <div className="flex items-center gap-2">
              <div className="relative h-6 min-w-0 flex-1">
                <div
                  className="absolute inset-y-0"
                  style={{
                    left: `${Math.min(zero, toPercent(value))}%`,
                    width: `${Math.max(Math.abs(toPercent(value) - zero), 0.5)}%`,
                    background: `var(--series-${slots[code] + 1})`,
                    borderRadius: value < 0 ? '4px 0 0 4px' : '0 4px 4px 0',
                  }}
                />
              </div>
              <span className="w-24 shrink-0 text-right text-sm tabular-nums md:w-32">
                <span className="font-medium">
                  {formatValue(value, format, locale)}
                </span>{' '}
                <span className="text-ink-2 text-xs">{year}</span>
              </span>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-ink-2 mt-4 text-sm">{t('rankingNote')}</p>
    </>
  );
};

export default Ranking;

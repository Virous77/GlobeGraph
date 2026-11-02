'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TMetricFormat } from '@/data-layer/metrics';
import { formatValue } from '@/lib/format';
import { TRow } from '@/lib/series';

const DataTable = ({
  rows,
  countries,
  labels,
  format,
}: {
  rows: TRow[];
  countries: string[];
  labels: Record<string, string>;
  format: TMetricFormat;
}) => {
  const t = useTranslations('Explorer');
  const locale = useLocale();

  if (!rows.length) return null;

  return (
    <details className="bg-surface group rounded-xl border">
      <summary className="cursor-pointer p-3 text-sm font-medium">
        {t('tableTitle')}
      </summary>
      <div className="max-h-96 overflow-auto border-t">
        <table className="w-full text-sm tabular-nums">
          <thead className="bg-surface text-ink-2 sticky top-0">
            <tr>
              <th scope="col" className="p-2 pl-3 text-left font-medium">
                {t('year')}
              </th>
              {countries.map((code) => (
                <th
                  key={code}
                  scope="col"
                  className="p-2 text-right font-medium whitespace-nowrap"
                >
                  {labels[code] ?? code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...rows].reverse().map((row) => (
              <tr key={row.year} className="border-t">
                <th scope="row" className="p-2 pl-3 text-left font-normal">
                  {row.year}
                </th>
                {countries.map((code) => (
                  <td key={code} className="p-2 text-right">
                    {row[code] === null
                      ? '–'
                      : formatValue(row[code], format, locale)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </details>
  );
};

export default DataTable;

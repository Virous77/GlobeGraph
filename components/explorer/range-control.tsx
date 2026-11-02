'use client';

import { useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FIRST_YEAR } from '@/data-layer/metrics';
import { getMaxYear } from '@/lib/selection';
import { cn } from '@/lib/utils';

const PRESETS = [10, 20, 30];

type TRange = { from: number; to: number };

const YearSelect = ({
  label,
  value,
  years,
  onChange,
}: {
  label: string;
  value: number;
  years: number[];
  onChange: (year: number) => void;
}) => (
  <Select
    value={String(value)}
    onValueChange={(year) => onChange(Number(year))}
  >
    <SelectTrigger aria-label={label} className="tabular-nums">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {years.map((year) => (
        <SelectItem key={year} value={String(year)} className="tabular-nums">
          {year}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

const RangeControl = ({
  from,
  to,
  onChange,
}: TRange & { onChange: (range: TRange) => void }) => {
  const t = useTranslations('Explorer');
  const maxYear = getMaxYear();
  const years = Array.from(
    { length: maxYear - FIRST_YEAR + 1 },
    (_, i) => maxYear - i
  );

  const presets = [
    ...PRESETS.map((span) => ({
      label: t('lastYears', { count: span }),
      from: maxYear - span,
    })),
    { label: t('allYears'), from: FIRST_YEAR },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div
        role="group"
        aria-label={t('rangeLabel')}
        className="bg-sunken flex rounded-lg p-0.5"
      >
        {presets.map((preset) => {
          const isActive = from === preset.from && to === maxYear;
          return (
            <button
              key={preset.label}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange({ from: preset.from, to: maxYear })}
              className={cn(
                'rounded-md px-2.5 py-1.5 text-sm',
                isActive ? 'bg-surface font-medium shadow-sm' : 'text-ink-2'
              )}
            >
              {preset.label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-1.5">
        <YearSelect
          label={t('from')}
          value={from}
          years={years.filter((year) => year < to)}
          onChange={(year) => onChange({ from: year, to })}
        />
        <span className="text-ink-2">–</span>
        <YearSelect
          label={t('to')}
          value={to}
          years={years.filter((year) => year > from)}
          onChange={(year) => onChange({ from, to: year })}
        />
      </div>
    </div>
  );
};

export default RangeControl;

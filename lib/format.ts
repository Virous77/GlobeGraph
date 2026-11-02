import { TMetricFormat } from '@/data-layer/metrics';

// Full words on tiles and tables, a shorter form on axis ticks
export const formatValue = (
  value: number,
  format: TMetricFormat,
  locale: string
) => {
  const compact = new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 2,
  });

  switch (format) {
    case 'usd':
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 2,
      }).format(value);
    case 'percent':
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        maximumFractionDigits: 1,
      }).format(value / 100);
    case 'years':
    case 'index':
      return new Intl.NumberFormat(locale, {
        maximumFractionDigits: 1,
      }).format(value);
    case 'count':
      return compact.format(value);
  }
};

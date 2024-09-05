import { ChartConfig } from '../ui/chart';
import alpha3 from 'iso-3166-1';

type TChartConfig = {
  data: {
    name: string;
    label: string;
  }[];
};

export const createChartConfig = (data: TChartConfig['data']): ChartConfig => {
  return data.reduce((acc, curr, idx) => {
    acc[curr.name] = {
      label: curr.label,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);
};

export const COUNTRIES = alpha3.all().map((country) => ({
  label: country.country,
  value: country.alpha3,
}));

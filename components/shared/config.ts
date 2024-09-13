import { ChartConfig } from '../ui/chart';
import countries from 'i18n-iso-countries';

const locales = ['en', 'fr', 'es', 'hi'];

locales.forEach((locale) => {
  countries.registerLocale(require(`i18n-iso-countries/langs/${locale}.json`));
});

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

const twoLetterToThreeLetter = (twoLetterCode: string) => {
  if (twoLetterCode.toLowerCase() === 'xk') return `XKX`;
  return countries.alpha2ToAlpha3(twoLetterCode);
};

export const getAllCountries = (locale: string) => {
  return Object.entries(countries.getNames(locale)).map(([alpha2, label]) => ({
    label,
    value: twoLetterToThreeLetter(alpha2)!,
  }));
};

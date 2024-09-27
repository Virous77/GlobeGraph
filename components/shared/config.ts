import { ChartConfig } from '../ui/chart';
import countries from 'i18n-iso-countries';

export const locales = ['en', 'fr', 'es', 'hi', 'de'];

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

export const getCountriesLabelWithValues = (
  pCountries: string[],
  locale: string
) => {
  return pCountries.map((country) => {
    const alpha2 = countries.alpha3ToAlpha2(
      country === 'XKX' ? 'XKK' : country
    )!;
    return {
      label: countries.getName(alpha2, locale)!,
      value: country,
    };
  });
};

export const INDICATORS = [
  'GC.DOD.TOTL.GD.ZS',
  'BX.KLT.DINV.CD.WD',
  'BX.KLT.DINV.WD.GD.ZS',
  'FI.RES.TOTL.CD',
  'NY.GDP.MKTP.CD',
  'FP.CPI.TOTL.ZG',
  'SP.DYN.LE00.IN',
  'NY.GDP.PCAP.CD',
  'SP.POP.TOTL',
  'SI.POV.DDAY',
  'SL.UEM.TOTL.ZS',
  'SI.POV.GINI',
  'IT.NET.USER.ZS',
];

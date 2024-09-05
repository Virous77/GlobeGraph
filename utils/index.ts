import { COUNTRIES } from '@/components/shared/config';
import currency from 'currency.js';
import { z } from 'zod';

type TColor = string[];

export const color: TColor = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

const schema = z.array(
  z.object({
    value: z.string(),
    label: z.string(),
  })
);

export const getLocalCountries = (key: string) => {
  if (typeof window === 'undefined') return [COUNTRIES[0]];
  const countries = getLocalStorage(key) as any;
  if (!countries || countries.length === 0) return [COUNTRIES[0]];
  try {
    const parsed = schema.parse(countries);
    return parsed;
  } catch (error) {
    return [COUNTRIES[0]];
  }
};

export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const schemaTimeRange = z.object({
  from: z.number(),
  to: z.number(),
});

export type TTimeRange = z.infer<typeof schemaTimeRange>;

export const getLocalTimeRange = (key: string) => {
  if (typeof window === 'undefined') return { from: 2010, to: 2024 };

  const timeRange = getLocalStorage(key);
  if (!timeRange) return { from: 2010, to: 2024 };

  try {
    const parsed = schemaTimeRange.parse(timeRange);
    return parsed;
  } catch (error) {
    return { from: 2010, to: 2024 };
  }
};

export const formatCurrency = (value: number, isSymbol: boolean) => {
  const absValue = Math.abs(value);

  const formatOptions = { precision: 2, symbol: isSymbol ? '$' : '' };

  if (absValue >= 1e12) {
    return currency(value).divide(1e12).format(formatOptions) + 'T';
  } else if (absValue >= 1e9) {
    return currency(value).divide(1e9).format(formatOptions) + 'B';
  } else if (absValue >= 1e6) {
    return currency(value).divide(1e6).format(formatOptions) + 'M';
  } else {
    return currency(value).format(formatOptions);
  }
};

export const transformOBJtoARR = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== 'year')
    .map(([country, value]) => ({ country, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .reverse();
};

export const extractValueFromObject = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== 'year')
    .map(([_, value]) => value)
    .sort((a: any, b: any) => b - a);
};

const convertInrLakhToUsdBillion = (inrLakh: number, exchangeRate: number) => {
  const inr = inrLakh * 100000;
  const usd = inr / exchangeRate;
  const usdBillion = usd / 1000000000;
  return Math.round(usdBillion * 100) / 100;
};

export const commonMetaData = ({
  name,
  desc,
  image,
  url,
  keywords,
}: {
  name: string;
  desc: string;
  image: string;
  url: string;
  keywords: string[];
}) => {
  return {
    metadataBase: new URL('https://globe-graph.vercel.app'),
    title: name ? `${name} | Globe Graph` : 'Globe Graph',
    description: desc,
    authors: [
      {
        name: 'Reetesh Kumar',
        url: 'https://reetesh.in/',
      },
    ],
    twitter: {
      card: 'summary_large_image',
      creator: '@imbitcoinb',
      images: image,
      title: name,
      description: desc,
    },
    robots: 'index, follow',
    alternates: {
      canonical: `https://reetesh.inhttps://globe-graph.vercel.app${url}`,
      languages: {
        'en-US': '/',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://globe-graph.vercel.app${url}`,
      title: name,
      description: desc,
      siteName: 'Globe Graph',
      images: [
        {
          url: image,
        },
      ],
    },
    assets: image,
    keywords: [
      'reetesh kumar',
      'country graph',
      'gdp graph',
      'usa gdp',
      'india gdp',
      'china gdp',
      'country gdp',
      'globe graph',
      ...keywords,
    ],
  };
};

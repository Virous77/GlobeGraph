import { TGDPData } from './types';

const generateUrl = (
  countryCode: string,
  indicator: string,
  from: number,
  to: number
) => {
  return `https://api.worldbank.org/v2/country/${countryCode}/indicator/${indicator}?date=${from}:${to}&format=json`;
};

export const getData = async ({
  countryCode = 'USA',
  from = 2010,
  to = 2020,
  indicator = 'NY.GDP.MKTP.CD',
}: {
  countryCode: string;
  from?: number;
  to?: number;
  indicator?: string;
}) => {
  const url = generateUrl(countryCode, indicator, from, to);

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch GDP data.');
    }

    const response = await res.json();
    if (response[1].length === 0) return [];
    return response[1] as TGDPData[];
  } catch (error) {
    return [];
  }
};

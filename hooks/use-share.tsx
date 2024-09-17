'use client';

import { useState, useEffect, useMemo } from 'react';
import { TCountryData } from '@/data-layer/types';
import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from 'nuqs';
import { getData } from '@/data-layer';
import { getCountriesLabelWithValues } from '@/components/shared/config';
import z from 'zod';

export type TCountries = Record<'value' | 'label', string>;

const schema = z.object({
  countries: z.array(z.string()).min(1),
  chartType: z.string().min(1),
  from: z.number().min(1),
  to: z.number().min(1),
  indicator: z.string().min(1),
  icon: z.string().optional(),
  isCurrencySymbol: z.boolean().optional(),
  language: z.string().min(2),
  type: z.string().min(1),
});

export const useShare = () => {
  const [sharedData, setSharedData] = useQueryStates({
    countries: parseAsArrayOf(parseAsString, '-'),
    chartType: parseAsString,
    from: parseAsInteger,
    to: parseAsInteger,
    indicator: parseAsString,
    icon: parseAsString,
    isCurrencySymbol: parseAsBoolean,
    language: parseAsString,
    type: parseAsString,
  });
  const [isValidated, setIsValidated] = useState(false);

  const validateSharedData = () => {
    const result = schema.safeParse(sharedData);
    if (!result.success) {
      alert('Invalid url');
      return false;
    }
    setIsValidated(true);
  };

  const [data, setData] = useState<TCountryData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { countries, to, from, indicator } = sharedData;

  const fetchCountryData = async ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => {
    if (!countries || countries?.length === 0) return;
    if (!indicator) return;

    const pCountries = getCountriesLabelWithValues(
      countries,
      sharedData.language || 'en'
    );

    setIsLoading(true);
    const data = await Promise.all(
      pCountries.map(async (country) => {
        return await getData({
          countryCode: country.value,
          from: from,
          to: to,
          indicator: indicator,
        });
      })
    );

    setIsLoading(false);
    setData(
      data.map((d, idx) => {
        // @ts-ignore
        return { country: countries[idx].value, data: d };
      })
    );
  };

  const modifyData = useMemo(() => {
    return data.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [data]);

  const chartData = useMemo(() => {
    const data = [] as any[];
    modifyData.forEach((group) => {
      group.forEach((item) => {
        const existingItem = data.find((res) => res.year === item.year);
        if (existingItem) {
          Object.assign(existingItem, item);
        } else {
          data.push({ ...item });
        }
      });
    });
    return data;
  }, [modifyData]);

  const pCountries = useMemo(() => {
    return getCountriesLabelWithValues(
      sharedData.countries!,
      sharedData.language || 'en'
    );
  }, [sharedData.countries, sharedData.language]);

  useEffect(() => {
    if (isValidated) {
      if (!from || !to) return;
      fetchCountryData({ from, to });
    }
  }, [isValidated]);

  useEffect(() => {
    validateSharedData();
  }, [indicator]);

  return {
    data,
    countries: pCountries,
    isLoading,
    chartData,
    setSharedData,
    sharedData,
  };
};

'use client';

import { useMemo } from 'react';
import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
  parseAsBoolean,
} from 'nuqs';
import { getData } from '@/data-layer';
import {
  getAllCountries,
  getCountriesLabelWithValues,
  INDICATORS,
  locales,
} from '@/components/shared/config';
import z from 'zod';
import { useRouter } from 'next/navigation';
import en from '@/messages/en.json';
import { handleGlobalError } from '@/utils';
import { useQuery } from '@tanstack/react-query';

export type TCountries = Record<'value' | 'label', string>;

const schema = z.object({
  language: z
    .string()
    .min(2)
    .refine(
      (val) => locales.find((loc) => loc.toLowerCase() === val.toLowerCase()),
      {
        message: 'Invalid language',
      }
    ),
  countries: z.array(z.string()).refine(
    (val) => {
      const countries = getAllCountries('en');
      return val.every((v) =>
        countries.find((c) => c.value.toLowerCase() === v.toLowerCase())
      );
    },
    { message: 'Invalid country' }
  ),
  chartType: z
    .string()
    .min(1)
    .refine(
      (val) =>
        ['bar', 'line', 'area', 'radar'].find(
          (type) => type === val.toLowerCase()
        ),
      { message: 'Invalid chart type' }
    ),
  from: z
    .number()
    .min(1)
    .refine((val) => val > 1974, { message: 'Invalid year' }),
  to: z
    .number()
    .min(1)
    .refine((val) => val < new Date().getFullYear(), {
      message: 'Invalid year',
    }),
  indicator: z
    .string()
    .refine(
      (val) =>
        INDICATORS.find((ind) => ind.toLowerCase() === val.toLowerCase()),
      {
        message: 'Invalid indicator key',
      }
    ),
  icon: z.string().optional(),
  isCurrencySymbol: z.boolean().optional(),

  type: z
    .string()
    .min(1)
    // @ts-ignore
    .refine((val) => en.Chart[val], { message: 'Invalid chart name' }),
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
  const router = useRouter();

  const validateSharedData = () => {
    const result = schema.safeParse(sharedData);
    if (!result.success) {
      router.push(`/not-found?error=${result.error.errors[0].message}`);
      return;
    }
    return true;
  };

  const { countries, to, from, indicator } = sharedData;

  const fetchCountryData = async ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => {
    try {
      if (!countries || countries?.length === 0) return;
      if (!indicator) return;

      const pCountries = getCountriesLabelWithValues(
        countries,
        sharedData.language || 'en'
      );

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

      return data.map((d, idx) => {
        // @ts-ignore
        return { country: countries[idx].value, data: d };
      });
    } catch (error) {
      handleGlobalError(error);
    }
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['share', sharedData.indicator, sharedData.from, sharedData.to],
    queryFn: () => {
      if (!from || !to) return;
      return fetchCountryData({ from, to });
    },
    enabled: validateSharedData(),
  });

  const modifyData = useMemo(() => {
    return data?.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [data]);

  const chartData = useMemo(() => {
    const data = [] as any[];
    modifyData?.forEach((group) => {
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

  return {
    data: data!,
    countries: pCountries,
    isLoading: isLoading || isFetching,
    chartData,
    setSharedData,
    sharedData,
  };
};

import { getData } from '@/data-layer';
import { useMemo } from 'react';
import { useData } from './use-data';
import { handleGlobalError } from '@/utils';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type TCountryData = {
  indicator: string;
  countryKey: string;
  timeRangeKey: string;
};

export const useCountryData = ({
  indicator,
  countryKey,
  timeRangeKey,
}: TCountryData) => {
  const {
    countries,
    timeRange,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
  } = useData({
    countryKey,
    timeRangeKey,
  });
  const queryClient = useQueryClient();

  const fetchCountryData = async ({
    from,
    to,
  }: {
    from: number;
    to: number;
  }) => {
    try {
      if (!countries.length) return;
      const data = await Promise.all(
        countries.map(async (country) => {
          return await getData({
            countryCode: country.value,
            from: from,
            to: to,
            indicator: indicator,
          });
        })
      );

      return data.map((d, idx) => {
        return { country: countries[idx].value, data: d };
      });
    } catch (error) {
      handleGlobalError(error);
    }
  };

  const {
    data: countryData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['countryData', timeRange, indicator],
    queryFn: () => fetchCountryData(timeRange),
  });

  const fetchSingleCountryData = async (name: string) => {
    try {
      if (!countryData?.length) return;
      if (countryData.find((d) => d.country === name)) return;
      const data = await getData({
        countryCode: name,
        from: timeRange.from,
        to: timeRange.to,
        indicator: indicator,
      });

      queryClient.setQueryData(
        ['countryData', timeRange, indicator],
        [...countryData, { country: name, data }]
      );
    } catch (error) {
      handleGlobalError(error);
    }
  };

  const modifyData = useMemo(() => {
    return countryData?.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [countryData]);

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

  return {
    fetchSingleCountryData,
    chartData,
    isLoading: isLoading || isFetching,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
    countries,
    timeRange,
  };
};

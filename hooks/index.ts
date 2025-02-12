import { getData } from '@/data-layer';
import { useMemo, useState } from 'react';
import { useData } from './use-data';
import {
  formatChartData,
  getAllCountriesData,
  handleGlobalError,
  TTimeRange,
} from '@/utils';
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
  const [isNewCountryLoading, setIsNewCountryLoading] = useState(false);

  const fetchCountryData = async ({ from, to }: TTimeRange) => {
    try {
      return getAllCountriesData(countries, from, to, indicator);
    } catch (error) {
      handleGlobalError(error);
    }
  };

  const {
    data: countryData,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ['countryData', timeRange, indicator],
    queryFn: () => fetchCountryData(timeRange),
    enabled: !!countries.length,
    placeholderData: (previousData) => previousData,
  });

  const fetchSingleCountryData = async (name: string) => {
    try {
      if (!countryData?.length) return;
      if (countryData.find((d) => d.country === name)) return;
      setIsNewCountryLoading(true);
      const data = await getData({
        countryCode: name,
        from: timeRange.from,
        to: timeRange.to,
        indicator: indicator,
      });
      setIsNewCountryLoading(false);

      queryClient.setQueryData(
        ['countryData', timeRange, indicator],
        [...countryData, { country: name, data }]
      );
    } catch (error) {
      setIsNewCountryLoading(false);
      handleGlobalError(error);
    }
  };

  const chartData = useMemo(() => {
    return formatChartData(countryData);
  }, [countryData]);

  return {
    fetchSingleCountryData,
    chartData,
    isLoading: isPending,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
    countries,
    timeRange,
    isFetching: isFetching || isNewCountryLoading,
  };
};

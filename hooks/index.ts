import { getData } from '@/data-layer';
import { useState, useEffect, useMemo } from 'react';
import { useData } from './use-data';

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
    data: countryData,
    countries,
    timeRange,
    setData,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
  } = useData({
    countryKey,
    timeRangeKey,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchGDPData = async ({ from, to }: { from: number; to: number }) => {
    if (!countries.length) return;
    setIsLoading(true);
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

    setIsLoading(false);
    setData(
      data.map((d, idx) => {
        return { country: countries[idx].value, data: d };
      })
    );
  };

  useEffect(() => {
    fetchGDPData(timeRange);
  }, []);

  const fetchSingleCountryGDPData = async (name: string) => {
    if (countryData.find((d) => d.country === name)) return;
    setIsLoading(true);
    const data = await getData({
      countryCode: name,
      from: timeRange.from,
      to: timeRange.to,
      indicator: indicator,
    });

    setIsLoading(false);
    setData((prev) => [...prev, { country: name, data }]);
  };

  const modifyData = useMemo(() => {
    return countryData.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [countryData]);

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

  return {
    fetchSingleCountryGDPData,
    chartData,
    isLoading,
    fetchGDPData,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    setTimeRange,
    countries,
    timeRange,
  };
};

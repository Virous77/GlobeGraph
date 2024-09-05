import { getData } from '@/data-layer';
import { TPerCapitaIncome } from '@/data-layer/types';
import { TCountries } from '@/store/use-gdp';
import { TTimeRange } from '@/utils';
import { useState, useEffect, useMemo } from 'react';

type TCountryData = {
  countries: TCountries[];
  timeRange: TTimeRange;
  countryData: [] | TPerCapitaIncome[];
  setCountryData: (data: TPerCapitaIncome[]) => void;
  indicator: string;
};

export const useCountryData = ({
  countries,
  timeRange,
  countryData,
  setCountryData,
  indicator,
}: TCountryData) => {
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
    setCountryData(
      data.map((d, idx) => {
        return { country: countries[idx].value, data: d };
      })
    );
  };

  useEffect(() => {
    fetchGDPData(timeRange);
  }, [countries]);

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
    setCountryData([{ country: name, data }]);
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
  };
};

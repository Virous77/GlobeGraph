'use client';

import { useState, useCallback } from 'react';
import {
  getLocalCountries,
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '@/utils';

export type TCountries = Record<'value' | 'label', string>;

export const useData = ({
  countryKey,
  timeRangeKey,
}: {
  countryKey: string;
  timeRangeKey: string;
}) => {
  const [countries, setCountriesState] = useState<TCountries[]>(
    getLocalCountries(countryKey)
  );
  const [timeRange, setTimeRangeState] = useState<TTimeRange>(
    getLocalTimeRange(timeRangeKey)
  );

  const setCountries = useCallback((newCountry: TCountries) => {
    setCountriesState((prevCountries) => {
      const updatedCountries = [...prevCountries, newCountry];
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const setMultipleCountries = useCallback((newCountries: TCountries[]) => {
    setCountriesState(newCountries);
  }, []);

  const removeCountry = useCallback((value: string) => {
    setCountriesState((prevCountries) => {
      const updatedCountries = prevCountries.filter((c) => c.value !== value);
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const removeLastCountry = useCallback(() => {
    setCountriesState((prevCountries) => {
      const updatedCountries = prevCountries.slice(0, -1);
      setLocalStorage(countryKey, updatedCountries);
      return updatedCountries;
    });
  }, []);

  const setTimeRange = useCallback((newTimeRange: TTimeRange) => {
    setTimeRangeState(newTimeRange);
    setLocalStorage(timeRangeKey, newTimeRange);
  }, []);

  return {
    countries,
    setCountries,
    setMultipleCountries,
    removeCountry,
    removeLastCountry,
    timeRange,
    setTimeRange,
  };
};

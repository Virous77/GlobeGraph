'use client';

import { create } from 'zustand';
import { TCountries } from './use-gdp';
import {
  getLocalCountries,
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '@/utils';
import { TLifeExpectancy } from '@/data-layer/types';

type TState = {
  lifeExpectancy: TLifeExpectancy[] | [];
  setLifeExpectancy: (data: TLifeExpectancy[]) => void;
  countries: TCountries[];
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
};

export const useCountryLifeStore = create<TState>((set) => ({
  lifeExpectancy: [],
  setLifeExpectancy: (data) => set({ lifeExpectancy: data }),
  countries: getLocalCountries('lifeExpectancyCountries'),
  setCountries: (countries) =>
    set((state) => {
      const newCountries = [...state.countries, countries];
      setLocalStorage('lifeExpectancyCountries', newCountries);
      return { countries: newCountries };
    }),
  removeCountry: (value) =>
    set((state) => {
      const newCountries = state.countries.filter((c) => c.value !== value);
      setLocalStorage('lifeExpectancyCountries', newCountries);
      return { countries: newCountries };
    }),
  removeLastCountry: () =>
    set((state) => {
      const newCountries = state.countries.slice(0, -1);
      setLocalStorage('lifeExpectancyCountries', newCountries);
      return { countries: newCountries };
    }),
  timeRange: getLocalTimeRange('lifeTimeRange'),
  setTimeRange: (timeRange) =>
    set(() => {
      setLocalStorage('lifeTimeRange', timeRange);
      return { timeRange };
    }),
}));

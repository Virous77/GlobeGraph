'use client';

import { TPerCapitaIncome } from '@/data-layer/types';
import { create } from 'zustand';
import { TCountries } from './use-gdp';
import {
  getLocalCountries,
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '@/utils';

type TState = {
  capitaIncome: TPerCapitaIncome[] | [];
  setCapitaIncome: (data: TPerCapitaIncome[]) => void;
  countries: TCountries[];
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
};

export const useCapitaIncomeStore = create<TState>((set) => ({
  capitaIncome: [],
  setCapitaIncome: (data) => set({ capitaIncome: data }),
  countries: getLocalCountries('capitaCountries'),
  setCountries: (countries) =>
    set((state) => {
      const newCountries = [...state.countries, countries];
      setLocalStorage('capitaCountries', newCountries);
      return { countries: newCountries };
    }),
  removeCountry: (value) =>
    set((state) => {
      const newCountries = state.countries.filter((c) => c.value !== value);
      setLocalStorage('capitaCountries', newCountries);
      return { countries: newCountries };
    }),
  removeLastCountry: () =>
    set((state) => {
      const newCountries = state.countries.slice(0, -1);
      setLocalStorage('capitaCountries', newCountries);
      return { countries: newCountries };
    }),
  timeRange: getLocalTimeRange('capitaTimeRange'),
  setTimeRange: (timeRange) =>
    set(() => {
      setLocalStorage('capitaTimeRange', timeRange);
      return { timeRange };
    }),
}));

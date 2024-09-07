'use client';

import { create } from 'zustand';
import {
  getLocalCountries,
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '@/utils';
import { TUnemployment } from '@/data-layer/types';
import { TCountries } from './use-gdp';

type TState = {
  countries: TCountries[];
  setCountries: (countries: TCountries) => void;
  setMultipleCountries: (countries: TCountries[]) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
  unemployment: TUnemployment[] | [];
  setUnemployment: (data: TUnemployment[]) => void;
};

export const useUnemploymentStore = create<TState>((set) => ({
  countries: getLocalCountries('uCountries'),
  setCountries: (countries) =>
    set((state) => {
      const newCountries = [...state.countries, countries];
      setLocalStorage('uCountries', newCountries);
      return { countries: newCountries };
    }),
  setMultipleCountries: (countries) =>
    set(() => {
      return { countries };
    }),
  removeCountry: (value) =>
    set((state) => {
      const newCountries = state.countries.filter((c) => c.value !== value);
      setLocalStorage('uCountries', newCountries);
      return { countries: newCountries };
    }),
  removeLastCountry: () =>
    set((state) => {
      const newCountries = state.countries.slice(0, -1);
      setLocalStorage('uCountries', newCountries);
      return { countries: newCountries };
    }),
  timeRange: getLocalTimeRange('uTimeRange'),
  setTimeRange: (timeRange) =>
    set(() => {
      setLocalStorage('uTimeRange', timeRange);
      return { timeRange };
    }),
  unemployment: [],
  setUnemployment: (data) => set({ unemployment: data }),
}));

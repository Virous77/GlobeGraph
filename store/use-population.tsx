'use client';

import { create } from 'zustand';
import {
  getLocalCountries,
  getLocalTimeRange,
  setLocalStorage,
  TTimeRange,
} from '@/utils';
import { TPopulation } from '@/data-layer/types';
import { TCountries } from './use-gdp';

type TState = {
  countries: TCountries[];
  setCountries: (countries: TCountries) => void;
  population: TPopulation[] | [];
  setPopulations: (population: TPopulation[]) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
};

export const usePopulationStore = create<TState>((set) => ({
  population: [],
  setPopulations: (data) => set({ population: data }),
  countries: getLocalCountries('populationCountries'),
  setCountries: (countries) =>
    set((state) => {
      const newCountries = [...state.countries, countries];
      setLocalStorage('populationCountries', newCountries);
      return { countries: newCountries };
    }),
  removeCountry: (value) =>
    set((state) => {
      const newCountries = state.countries.filter((c) => c.value !== value);
      setLocalStorage('populationCountries', newCountries);
      return { countries: newCountries };
    }),
  removeLastCountry: () =>
    set((state) => {
      const newCountries = state.countries.slice(0, -1);
      setLocalStorage('populationCountries', newCountries);
      return { countries: newCountries };
    }),
  timeRange: getLocalTimeRange('populationTimeRange'),
  setTimeRange: (timeRange) =>
    set(() => {
      setLocalStorage('populationTimeRange', timeRange);
      return { timeRange };
    }),
}));

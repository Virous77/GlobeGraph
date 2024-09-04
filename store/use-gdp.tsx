import { create } from "zustand";
import { getLocalCountries, setLocalStorage } from "@/utils";
import { TGDPData } from "@/data-layer/types";

export type TCountries = Record<"value" | "label", string>;

export type TTimeRange = {
  from: number;
  to: number;
};

type TAllGDPData = {
  country: string;
  data: TGDPData[];
};

type TState = {
  countries: TCountries[];
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
  timeRange: TTimeRange;
  setTimeRange: (timeRange: TTimeRange) => void;
  gdpData: TAllGDPData[] | [];
  setGDPData: (data: TAllGDPData[]) => void;
};

export const useGDPStore = create<TState>((set) => ({
  countries: getLocalCountries(),
  setCountries: (countries) =>
    set((state) => {
      const newCountries = [...state.countries, countries];
      setLocalStorage("countries", newCountries);
      return { countries: newCountries };
    }),
  removeCountry: (value) =>
    set((state) => {
      const newCountries = state.countries.filter((c) => c.value !== value);
      setLocalStorage("countries", newCountries);
      return { countries: newCountries };
    }),
  removeLastCountry: () =>
    set((state) => {
      const newCountries = state.countries.slice(0, -1);
      setLocalStorage("countries", newCountries);
      return { countries: newCountries };
    }),
  timeRange: { from: 2010, to: 2024 },
  setTimeRange: (timeRange) => set({ timeRange }),
  gdpData: [],
  setGDPData: (data) => set({ gdpData: data }),
}));

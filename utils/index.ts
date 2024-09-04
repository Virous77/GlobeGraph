import { COUNTRIES } from "@/components/gdp/config";
import currency from "currency.js";
import { z } from "zod";

type TColor = string[];

export const color: TColor = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

const schema = z.array(
  z.object({
    value: z.string(),
    label: z.string(),
  })
);

export const getLocalCountries = () => {
  const countries = getLocalStorage("countries") as any;
  if (!countries || countries.length === 0) return [COUNTRIES[0]];
  try {
    const parsed = schema.parse(countries);
    return parsed;
  } catch (error) {
    return [COUNTRIES[0]];
  }
};

export const setLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const schemaTimeRange = z.object({
  from: z.number(),
  to: z.number(),
});

export type TTimeRange = z.infer<typeof schemaTimeRange>;

export const getLocalTimeRange = () => {
  const timeRange = getLocalStorage("timeRange");
  if (!timeRange) return null;

  try {
    const parsed = schemaTimeRange.parse(timeRange);
    return parsed;
  } catch (error) {
    return null;
  }
};

export const formatCurrency = (value: number) => {
  const absValue = Math.abs(value);

  if (absValue >= 1e12) {
    return currency(value).divide(1e12).format({ precision: 2 }) + "T";
  } else if (absValue >= 1e9) {
    return currency(value).divide(1e9).format({ precision: 2 }) + "B";
  } else if (absValue >= 1e6) {
    return currency(value).divide(1e6).format({ precision: 2 }) + "M";
  } else {
    return currency(value).format();
  }
};

export const transformOBJtoARR = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== "year")
    .map(([country, value]) => ({ country, value }))
    .sort((a: any, b: any) => b.value - a.value)
    .reverse();
};

export const extractValueFromObject = (data: any) => {
  if (!data) return [];
  return Object?.entries(data)
    .filter(([key]) => key !== "year")
    .map(([_, value]) => value)
    .sort((a: any, b: any) => b - a);
};

const convertInrLakhToUsdBillion = (inrLakh: number, exchangeRate: number) => {
  const inr = inrLakh * 100000;
  const usd = inr / exchangeRate;
  const usdBillion = usd / 1000000000;
  return Math.round(usdBillion * 100) / 100;
};

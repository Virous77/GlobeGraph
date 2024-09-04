import { COUNTRIES } from "@/components/graph/config";
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

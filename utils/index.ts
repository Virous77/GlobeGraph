import { z } from "zod";

type TColor = {
  [key: number]: string;
};

export const color: TColor = {
  0: "bg-[hsl(var(--chart-1))]",
  1: "bg-[hsl(var(--chart-2))]",
  2: "bg-[hsl(var(--chart-3))]",
  3: "bg-[hsl(var(--chart-4))]",
  4: "bg-[hsl(var(--chart-5))]",
};

export const getLocalStorage = <T>(key: string) => {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

const schema = z.object({
  value: z.string(),
  label: z.string(),
});

export type Countries = z.infer<typeof schema>;
export const getLocalCountries = () => {
  const countries = getLocalStorage("countries");
  if (!countries) return null;
  try {
    const parsed = schema.parse(countries);
    return parsed;
  } catch (error) {
    return null;
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

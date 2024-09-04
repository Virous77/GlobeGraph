import { Countries } from "@/store/use-gdp";
import { ChartConfig } from "../ui/chart";

type TChartConfig = {
  data: {
    name: string;
    label: string;
  }[];
};

export const createChartConfig = (data: TChartConfig["data"]): ChartConfig => {
  return data.reduce((acc, curr, idx) => {
    acc[curr.name] = {
      label: curr.label,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return acc;
  }, {} as ChartConfig);
};

export const COUNTRIES = [
  {
    value: "IND",
    label: "India",
  },
  {
    value: "CHN",
    label: "China",
  },

  {
    value: "USA",
    label: "United States",
  },
  {
    value: "GBR",
    label: "United Kingdom",
  },
  {
    value: "CAN",
    label: "Canada",
  },
  {
    value: "AUS",
    label: "Australia",
  },
  {
    value: "JPN",
    label: "Japan",
  },
  {
    value: "DEU",
    label: "Germany",
  },
] satisfies Countries[];

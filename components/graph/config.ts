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

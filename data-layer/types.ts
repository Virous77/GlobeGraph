// One observation: [year, value]. Years with no data are left out.
export type TPoint = [number, number];

export type TSeriesMap = Record<string, TPoint[]>;

export type TCountryOption = {
  code: string;
  label: string;
  keywords: string[];
};

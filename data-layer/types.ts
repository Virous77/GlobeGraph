export type TResponseData = {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  obs_status: string;
  decimal: number;
};

export type TCountryData = {
  country: string;
  data: TResponseData[];
};

export type TPerCapitaIncome = {
  country: string;
  data: TResponseData[];
};

export type TLifeExpectancy = {
  country: string;
  data: TResponseData[];
};

export type TPopulation = {
  country: string;
  data: TResponseData[];
};

export type TUnemployment = {
  country: string;
  data: TResponseData[];
};

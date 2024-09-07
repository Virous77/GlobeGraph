export type TGDPData = {
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
  data: TGDPData[];
};

export type TPerCapitaIncome = {
  country: string;
  data: TGDPData[];
};

export type TLifeExpectancy = {
  country: string;
  data: TGDPData[];
};

export type TPopulation = {
  country: string;
  data: TGDPData[];
};

export type TUnemployment = {
  country: string;
  data: TGDPData[];
};

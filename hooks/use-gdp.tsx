import { getGDPData } from "@/data-layer";
import { TGDPData } from "@/data-layer/types";
import React, { useEffect } from "react";

export type Countries = Record<"value" | "label", string>;

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

type TAllGDPData = {
  country: string;
  data: TGDPData[];
};

const useGDP = () => {
  const [countries, setCountries] = React.useState<Countries[]>([COUNTRIES[0]]);
  const [gdpData, setGDPData] = React.useState<TAllGDPData[]>([]);

  useEffect(() => {
    const fetchGDPData = async () => {
      const data = await Promise.all(
        countries.map(async (country) => {
          return await getGDPData({
            countryCode: country.value,
            from: 2010,
            to: 2024,
          });
        })
      );

      setGDPData((prev) => [
        ...prev,
        ...data.map((d, idx) => ({ country: countries[idx].label, data: d })),
      ]);
    };
    fetchGDPData();
  }, []);

  const fetchSingleCountryGDPData = async (name: string) => {
    if (gdpData.find((d) => d.country === name)) return;
    const data = await getGDPData({
      countryCode: name,
      from: 2010,
      to: 2024,
    });

    setGDPData((prev) => [...prev, { country: name, data }]);
  };

  const removeCountry = (name: string) => {
    setGDPData((prev) => prev.filter((d) => d.country !== name));
  };

  const modifyData = gdpData.map((d) => {
    return d.data.map((dd) => ({
      year: dd.date,
      [dd.countryiso3code]: Number(dd.value),
    }));
  });

  const chartData = [] as any[];

  modifyData.forEach((group) => {
    group.forEach((item) => {
      const existingItem = chartData.find((res) => res.year === item.year);
      if (existingItem) {
        Object.assign(existingItem, item);
      } else {
        chartData.push({ ...item });
      }
    });
  });

  return {
    countries,
    setCountries,
    fetchSingleCountryGDPData,
    removeCountry,
    chartData,
  };
};

export default useGDP;

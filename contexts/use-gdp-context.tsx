import React, { createContext, useContext, useState, useEffect } from "react";
import { getGDPData } from "@/data-layer";
import { TGDPData } from "@/data-layer/types";

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

interface GDPContextProps {
  countries: Countries[];
  setCountries: React.Dispatch<React.SetStateAction<Countries[]>>;
  fetchSingleCountryGDPData: (name: string) => Promise<void>;
  removeCountry: (name: string) => void;
  chartData: any[];
  isLoading: boolean;
  timeRange: { from: number; to: number };
  setTimeRange: React.Dispatch<
    React.SetStateAction<{ from: number; to: number }>
  >;
}

const GDPContext = createContext<GDPContextProps | undefined>(undefined);

export const GDPContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [countries, setCountries] = useState<Countries[]>([COUNTRIES[0]]);
  const [gdpData, setGDPData] = useState<TAllGDPData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState({ from: 2010, to: 2024 });

  useEffect(() => {
    const fetchGDPData = async () => {
      if (!countries.length) return;
      setIsLoading(true);
      const data = await Promise.all(
        countries.map(async (country) => {
          return await getGDPData({
            countryCode: country.value,
            from: timeRange.from,
            to: timeRange.to,
          });
        })
      );

      setIsLoading(false);
      setGDPData((prev) => [
        ...prev,
        ...data.map((d, idx) => ({ country: countries[idx].label, data: d })),
      ]);
    };
    fetchGDPData();
  }, [countries, timeRange]);

  const fetchSingleCountryGDPData = async (name: string) => {
    if (gdpData.find((d) => d.country === name)) return;
    setIsLoading(true);
    const data = await getGDPData({
      countryCode: name,
      from: timeRange.from,
      to: timeRange.to,
    });

    setIsLoading(false);
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

  return (
    <GDPContext.Provider
      value={{
        countries,
        setCountries,
        fetchSingleCountryGDPData,
        removeCountry,
        chartData,
        isLoading,
        timeRange,
        setTimeRange,
      }}
    >
      {children}
    </GDPContext.Provider>
  );
};

export const useGDP = (): GDPContextProps => {
  const context = useContext(GDPContext);
  if (!context) {
    throw new Error("useGDP must be used within a GDPProvider");
  }
  return context;
};

import { useState, useEffect, useMemo } from "react";
import { getGDPData } from "@/data-layer";
import { useGDPStore } from "@/store/use-gdp";

export const useGDP = () => {
  const { countries, timeRange, gdpData, setGDPData } = useGDPStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGDPData = async ({ from, to }: { from: number; to: number }) => {
    if (!countries.length) return;
    setIsLoading(true);
    const data = await Promise.all(
      countries.map(async (country) => {
        return await getGDPData({
          countryCode: country.value,
          from: from,
          to: to,
        });
      })
    );

    setIsLoading(false);
    setGDPData(
      data.map((d, idx) => {
        return { country: countries[idx].value, data: d };
      })
    );
  };

  useEffect(() => {
    fetchGDPData(timeRange);
  }, [countries]);

  const fetchSingleCountryGDPData = async (name: string) => {
    if (gdpData.find((d) => d.country === name)) return;
    setIsLoading(true);
    const data = await getGDPData({
      countryCode: name,
      from: timeRange.from,
      to: timeRange.to,
    });

    setIsLoading(false);
    setGDPData([{ country: name, data }]);
  };

  const modifyData = useMemo(() => {
    return gdpData.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [gdpData]);

  const chartData = useMemo(() => {
    const data = [] as any[];
    modifyData.forEach((group) => {
      group.forEach((item) => {
        const existingItem = data.find((res) => res.year === item.year);
        if (existingItem) {
          Object.assign(existingItem, item);
        } else {
          data.push({ ...item });
        }
      });
    });
    return data;
  }, [modifyData]);

  return {
    fetchSingleCountryGDPData,
    chartData,
    isLoading,
    fetchGDPData,
  };
};

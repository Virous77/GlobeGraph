import { getGDPPCData } from "@/data-layer";
import { useCapitaIncomeStore } from "@/store/use-capita";
import { useState, useEffect, useMemo } from "react";

export const useCapitaIncome = () => {
  const { countries, timeRange, capitaIncome, setCapitaIncome } =
    useCapitaIncomeStore();
  const [isLoading, setIsLoading] = useState(false);

  const fetchGDPData = async ({ from, to }: { from: number; to: number }) => {
    if (!countries.length) return;
    setIsLoading(true);
    const data = await Promise.all(
      countries.map(async (country) => {
        return await getGDPPCData({
          countryCode: country.value,
          from: from,
          to: to,
        });
      })
    );

    setIsLoading(false);
    setCapitaIncome(
      data.map((d, idx) => {
        return { country: countries[idx].value, data: d };
      })
    );
  };

  useEffect(() => {
    fetchGDPData(timeRange);
  }, [countries]);

  const fetchSingleCountryGDPData = async (name: string) => {
    if (capitaIncome.find((d) => d.country === name)) return;
    setIsLoading(true);
    const data = await getGDPPCData({
      countryCode: name,
      from: timeRange.from,
      to: timeRange.to,
    });

    setIsLoading(false);
    setCapitaIncome([{ country: name, data }]);
  };

  const modifyData = useMemo(() => {
    return capitaIncome.map((d) => {
      return d.data.map((dd) => ({
        year: dd.date,
        [dd.countryiso3code]: Number(dd.value),
      }));
    });
  }, [capitaIncome]);

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

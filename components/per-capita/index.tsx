"use client";

import { useCapitaIncome } from "@/hooks/use-capita";
import MainChartComp from "../shared";
import { useCapitaIncomeStore } from "@/store/use-capita";

const PerCapita = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
  } = useCapitaIncomeStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCapitaIncome();

  return (
    <MainChartComp
      isLoading={isLoading}
      fetchGDPData={fetchGDPData}
      fetchSingleCountryGDPData={fetchSingleCountryGDPData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title="Country Per Capita Income"
      toolTipMessage="We move"
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
    />
  );
};

export default PerCapita;

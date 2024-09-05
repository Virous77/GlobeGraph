'use client';

import MainChartComp from '../shared';
import { useCapitaIncomeStore } from '@/store/use-capita';
import { useCountryData } from '@/hooks';

const PerCapita = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    capitaIncome,
    setCapitaIncome,
  } = useCapitaIncomeStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: capitaIncome,
      setCountryData: setCapitaIncome,
      timeRange,
      indicator: 'NY.GDP.PCAP.CD',
    });

  return (
    <MainChartComp
      isLoading={isLoading}
      fetchGDPData={fetchGDPData}
      fetchSingleCountryGDPData={fetchSingleCountryGDPData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title="Per Capita Income of Countries"
      toolTipMessage="Per Capita Income is the average income of a country's citizens. It is calculated by dividing the country's total income by its population."
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
    />
  );
};

export default PerCapita;

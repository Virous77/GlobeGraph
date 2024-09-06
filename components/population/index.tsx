'use client';

import MainChartComp from '../shared';
import { useCountryData } from '@/hooks';
import { usePopulationStore } from '@/store/use-population';

const Population = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    population,
    setPopulations,
  } = usePopulationStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: population,
      setCountryData: setPopulations,
      timeRange,
      indicator: 'SP.POP.TOTL',
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
      title="Country Population"
      toolTipMessage="Population stands for the total number of people living in a country."
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default Population;

'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useGDPStore } from '@/store/use-gdp';

const GDPChart = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    gdpData,
    setGDPData,
  } = useGDPStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: gdpData,
      setCountryData: setGDPData,
      timeRange,
      indicator: 'NY.GDP.MKTP.CD',
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
      title="GDP of Countries"
      toolTipMessage="GDP stands for Gross Domestic Product. It is the total value of all goods and services produced in a country in a year."
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
    />
  );
};

export default GDPChart;

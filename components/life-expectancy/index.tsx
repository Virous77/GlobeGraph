'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useCountryLifeStore } from '@/store/use-life';

const LifeExpectancy = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    lifeExpectancy,
    setLifeExpectancy,
  } = useCountryLifeStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: lifeExpectancy,
      setCountryData: setLifeExpectancy,
      timeRange,
      indicator: 'SP.DYN.LE00.IN',
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
      title="Life Expectancy of Countries"
      toolTipMessage="Life expectancy is the average number of years a person is expected to live based on the year of their birth."
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default LifeExpectancy;

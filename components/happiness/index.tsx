'use client';

import MainChartComp from '../shared';
import { useCountryData } from '@/hooks';
import { useUnemploymentStore } from '@/store/use-happiness';

const Unemployment = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    unemployment,
    setUnemployment,
  } = useUnemploymentStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: unemployment,
      setCountryData: setUnemployment,
      timeRange,
      indicator: 'SL.UEM.TOTL.ZS',
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
      title="Country Unemployment Labour Force"
      toolTipMessage="Unemployment rate is the percentage of the total labor force that is unemployed but actively seeking employment and willing to work."
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default Unemployment;

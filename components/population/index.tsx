'use client';

import MainChartComp from '../shared';
import { useCountryData } from '@/hooks';
import { usePopulationStore } from '@/store/use-population';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('Chart');

  return (
    <MainChartComp
      isLoading={isLoading}
      fetchGDPData={fetchGDPData}
      fetchSingleCountryGDPData={fetchSingleCountryGDPData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title={t('population')}
      toolTipMessage={t('populationDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default Population;

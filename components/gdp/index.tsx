'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useGDPStore } from '@/store/use-gdp';
import { useTranslations } from 'next-intl';

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
      title={t('gdp')}
      toolTipMessage={t('gdpDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
    />
  );
};

export default GDPChart;

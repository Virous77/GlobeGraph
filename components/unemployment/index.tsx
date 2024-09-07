'use client';

import MainChartComp from '../shared';
import { useCountryData } from '@/hooks';
import { useUnemploymentStore } from '@/store/use-happiness';
import { useTranslations } from 'next-intl';

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
      title={t('unemployment')}
      toolTipMessage={t('unemploymentDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default Unemployment;

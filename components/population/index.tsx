'use client';

import MainChartComp from '../shared';
import { useCountryData } from '@/hooks';
import useCountryLanguage from '@/hooks/use-country-language';
import { useLocale, useTranslations } from 'next-intl';

const Population = () => {
  const {
    isLoading,
    chartData,
    countries,
    setMultipleCountries,
    timeRange,
    setTimeRange,
    setCountries,
    removeCountry,
    removeLastCountry,
    fetchSingleCountryGDPData,
    fetchGDPData,
  } = useCountryData({
    indicator: 'SP.POP.TOTL',
    countryKey: 'populationCountries',
    timeRangeKey: 'populationTimeRange',
  });

  const t = useTranslations('Chart');
  const lang = useLocale();
  useCountryLanguage({ countries, setMultipleCountries, lang });

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

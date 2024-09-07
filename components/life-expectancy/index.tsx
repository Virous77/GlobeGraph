'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const LifeExpectancy = () => {
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
    indicator: 'SP.DYN.LE00.IN',
    countryKey: 'lifeExpectancyCountries',
    timeRangeKey: 'lifeTimeRange',
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
      title={t('life')}
      toolTipMessage={t('lifeDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
    />
  );
};

export default LifeExpectancy;

'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useCountryLifeStore } from '@/store/use-life';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

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
    setMultipleCountries,
  } = useCountryLifeStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: lifeExpectancy,
      setCountryData: setLifeExpectancy,
      timeRange,
      indicator: 'SP.DYN.LE00.IN',
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

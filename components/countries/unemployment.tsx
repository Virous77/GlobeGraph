'use client';

import MainChartComp from '@/components/shared';
import { useCountryData } from '@/hooks';
import useCountryLanguage from '@/hooks/use-country-language';
import { useLocale, useTranslations } from 'next-intl';

const Unemployment = () => {
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
    fetchSingleCountryData,
  } = useCountryData({
    indicator: 'SL.UEM.TOTL.ZS',
    countryKey: 'uCountries',
    timeRangeKey: 'uTimeRange',
  });

  const t = useTranslations('Chart');
  const lang = useLocale();
  useCountryLanguage({ countries, setMultipleCountries, lang });

  return (
    <MainChartComp
      isLoading={isLoading}
      fetchSingleCountryData={fetchSingleCountryData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title={t('unemploymentLaborForce')}
      toolTipMessage={t('unemploymentLaborForceDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      icon="%"
      indicator="SL.UEM.TOTL.ZS"
      type="unemploymentLaborForce"
    />
  );
};

export default Unemployment;

'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '@/components/shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const IncomeInequalityChart = () => {
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
    indicator: 'SI.POV.GINI',
    countryKey: 'incomeInequalityCountries',
    timeRangeKey: 'incomeInequalityTimeRange',
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
      title={t('incomeInequality')}
      toolTipMessage={t('incomeInequalityDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      indicator="SI.POV.GINI"
      type="incomeInequality"
    />
  );
};

export default IncomeInequalityChart;

'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '@/components/shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const FDIInflowsChart = () => {
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
    indicator: 'BX.KLT.DINV.CD.WD',
    countryKey: 'fiCountries',
    timeRangeKey: 'fiTimeRange',
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
      title={t('fdiInflows')}
      toolTipMessage={t('fdiInflowDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
      indicator="BX.KLT.DINV.CD.WD"
      type="fdiInflows"
    />
  );
};

export default FDIInflowsChart;

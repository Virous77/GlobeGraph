'use client';

import { useCountryData } from '@/hooks';
import MainChartComp from '../shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const GDPChart = () => {
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
    indicator: 'NY.GDP.MKTP.CD',
    countryKey: 'countries',
    timeRangeKey: 'timeRange',
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

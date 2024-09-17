'use client';

import MainChartComp from '@/components/shared';
import { useCountryData } from '@/hooks';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const PerCapita = () => {
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
    fetchCountryData,
  } = useCountryData({
    indicator: 'NY.GDP.PCAP.CD',
    countryKey: 'capitaCountries',
    timeRangeKey: 'capitaTimeRange',
  });

  const t = useTranslations('Chart');
  const lang = useLocale();
  useCountryLanguage({ countries, setMultipleCountries, lang });

  return (
    <MainChartComp
      isLoading={isLoading}
      fetchCountryData={fetchCountryData}
      fetchSingleCountryData={fetchSingleCountryData}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      countries={countries}
      chartData={chartData}
      title={t('perCapitaIncome')}
      toolTipMessage={t('perCapitaIncomeDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
      indicator="NY.GDP.PCAP.CD"
      type="perCapitaIncome"
    />
  );
};

export default PerCapita;

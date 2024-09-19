'use client';
import { useCountryData } from '@/hooks';
import MainChartComp from '@/components/shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const InternetUsersChart = () => {
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
    indicator: "IT.NET.USER.ZS",
    countryKey: "internetUsersCountries",
    timeRangeKey: "internetUsersTimeRange",
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
      title={t('internetUsers')}
      toolTipMessage={t('internetUsersDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      indicator="IT.NET.USER.ZS"
      type="internetUsers"
    />
  );
};

export default InternetUsersChart;

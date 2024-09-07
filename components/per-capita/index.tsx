'use client';

import MainChartComp from '../shared';
import { useCapitaIncomeStore } from '@/store/use-capita';
import { useCountryData } from '@/hooks';
import { useTranslations } from 'next-intl';

const PerCapita = () => {
  const {
    timeRange,
    setTimeRange,
    countries,
    setCountries,
    removeCountry,
    removeLastCountry,
    capitaIncome,
    setCapitaIncome,
  } = useCapitaIncomeStore();
  const { isLoading, chartData, fetchSingleCountryGDPData, fetchGDPData } =
    useCountryData({
      countries,
      countryData: capitaIncome,
      setCountryData: setCapitaIncome,
      timeRange,
      indicator: 'NY.GDP.PCAP.CD',
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
      title={t('capita')}
      toolTipMessage={t('capitaDesc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={true}
    />
  );
};

export default PerCapita;

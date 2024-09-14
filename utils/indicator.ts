const writeNewFile = ({
  localKey,
  indicator,
  titleKey,
  name,
  fileName,
  desc,
}: {
  localKey: string;
  indicator: string;
  titleKey: string;
  name: string;
  fileName: string;
  desc: string;
}) => {
  const file = `'use client';
import { useCountryData } from '@/hooks';
import MainChartComp from '@/components/shared';
import { useLocale, useTranslations } from 'next-intl';
import useCountryLanguage from '@/hooks/use-country-language';

const ${name}Chart = () => {
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
    indicator: "${indicator}",
    countryKey: "${localKey}Countries",
    timeRangeKey: "${localKey}TimeRange",
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
      title={t('${titleKey}')}
      toolTipMessage={t('${titleKey}Desc')}
      setCountries={setCountries}
      removeCountry={removeCountry}
      removeLastCountry={removeLastCountry}
      isCurrencySymbol={false}
      icon="%"
    />
  );
};

export default ${name}Chart;
`;

  const page = `
import ${name}Chart from '@/components/countries/${fileName}';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country ${name}',
    desc: '${desc}',
    url: "/country/${fileName}",
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const Country${name}Page = () => {
  return (
    <main>
      <section className="p-1">
        <${name}Chart />
      </section>
    </main>
  );
};

export default Country${name}Page;

`;

  fs.writeFileSync(`components/countries/${fileName}.tsx`, file);
  fs.mkdirSync(`app/country/${fileName}`);
  fs.writeFileSync(`app/country/${fileName}/page.tsx`, page);
};

writeNewFile({
  localKey: 'foreign',
  indicator: 'FI.RES.TOTL.CD',
  titleKey: 'foreignReserve',
  name: 'ForeignReserve',
  fileName: 'foreign-reserve',
  desc: 'Explore the foreign reserve of different countries using Globe Graph.',
});

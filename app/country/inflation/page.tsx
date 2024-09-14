import InflationChart from '@/components/countries/inflation';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country CPI',
    desc: 'Explore the CPI of different countries using Globe Graph.',
    url: '/country/inflation',
    keywords: ['geo chart', 'inflation', 'cpi', 'consumer price index'],
  });
  return {
    ...metaData,
  };
};

const CountryGDPPage = () => {
  return (
    <main>
      <section className="p-1">
        <InflationChart />
      </section>
    </main>
  );
};

export default CountryGDPPage;

import FDIInflowsChart from '@/components/countries/fdi-inflows';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country FDI Inflows',
    desc: 'Explore the FDI inflows of different countries using Globe Graph.',
    url: '/country/fdi-inflows',
    keywords: ['fdi', 'foreign direct investment', 'foreign investment'],
  });
  return {
    ...metaData,
  };
};

const CountryFDIPage = () => {
  return (
    <main>
      <section className="p-1">
        <FDIInflowsChart />
      </section>
    </main>
  );
};

export default CountryFDIPage;

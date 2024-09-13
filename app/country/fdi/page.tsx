import FDIChart from '@/components/countries/fdi';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country FDI',
    desc: 'Explore the FDI of different countries using Globe Graph.',
    url: '/country-fdi',
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
        <FDIChart />
      </section>
    </main>
  );
};

export default CountryFDIPage;

import CountryDebt from '@/components/countries/debt';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Debt',
    desc: 'Explore the Debt of different countries using Globe Graph.',
    url: '/debt',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const CountryFDIPage = () => {
  return (
    <main>
      <section className="p-1">
        <CountryDebt />
      </section>
    </main>
  );
};

export default CountryFDIPage;

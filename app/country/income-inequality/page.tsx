import IncomeInequalityChart from '@/components/countries/income-inequality';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Income Inequality',
    desc: 'Explore the income inequality of countries around the world.',
    url: '/country/income-inequality',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const CountryIncomeInequalityPage = () => {
  return (
    <main>
      <section className="p-1">
        <IncomeInequalityChart />
      </section>
    </main>
  );
};

export default CountryIncomeInequalityPage;

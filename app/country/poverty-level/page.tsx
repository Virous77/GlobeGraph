
import PovertyLevelChart from '@/components/countries/poverty-level';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country PovertyLevel',
    desc: 'Explore the poverty level of countries using Globe Graph.',
    url: "/country/poverty-level",
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const CountryPovertyLevelPage = () => {
  return (
    <main>
      <section className="p-1">
        <PovertyLevelChart />
      </section>
    </main>
  );
};

export default CountryPovertyLevelPage;


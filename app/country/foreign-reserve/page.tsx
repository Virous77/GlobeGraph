import ForeignReserveChart from '@/components/countries/foreign-reserve';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Foreign Reserve',
    desc: 'Explore the foreign reserve of different countries using Globe Graph.',
    url: '/foreign-reserve',
    keywords: ['geo chart', 'foreign reserve', 'foreign reserve chart'],
  });
  return {
    ...metaData,
  };
};

const CountryForeignReservePage = () => {
  return (
    <main>
      <section className="p-1">
        <ForeignReserveChart />
      </section>
    </main>
  );
};

export default CountryForeignReservePage;

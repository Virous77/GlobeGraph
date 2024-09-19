
import InternetUsersChart from '@/components/countries/internet-users';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country InternetUsers',
    desc: 'Explore the internet users percentage of countries population around the world.',
    url: "/country/internet-users",
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const CountryInternetUsersPage = () => {
  return (
    <main>
      <section className="p-1">
        <InternetUsersChart />
      </section>
    </main>
  );
};

export default CountryInternetUsersPage;


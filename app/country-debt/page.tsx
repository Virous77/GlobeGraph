import CountryDebt from '@/components/country-debt';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Debt',
    desc: 'Explore the Debt of different countries using Globe Graph.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/country-debt',
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

import FDIChart from '@/components/fdi';
import { commonMetaData } from '@/utils';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country FDI',
    desc: 'Explore the FDI of different countries using Globe Graph.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/country-fdi',
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
        <FDIChart />
      </section>
    </main>
  );
};

export default CountryFDIPage;

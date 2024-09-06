import Population from '@/components/population';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Population',
    desc: 'Explore the population of different countries using Globe Graph.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/country-population',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const PopulationPage = () => {
  return (
    <main>
      <section className="p-1">
        <Population />
      </section>
    </main>
  );
};

export default PopulationPage;

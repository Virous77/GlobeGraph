import Unemployment from '@/components/happiness';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Unemployment Labour Force',
    desc: 'Explore the unemployment rate of different countries using Globe Graph.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/country-unemployment-labor-force',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const UnemploymentPage = () => {
  return (
    <main>
      <section className="p-1">
        <Unemployment />
      </section>
    </main>
  );
};

export default UnemploymentPage;

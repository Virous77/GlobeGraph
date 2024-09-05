import LifeExpectancy from '@/components/life-expectancy';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Life Expectancy',
    desc: 'Explore the life expectancy of different countries using Globe Graph.',
    image:
      'https://res.cloudinary.com/dw6wav4jg/image/upload/v1725522213/Image_05-09-24_at_1.12_PM_hnwwl7.jpg',
    url: '/life-expectancy',
    keywords: ['geo chart'],
  });
  return {
    ...metaData,
  };
};

const LifeExpectancyPage = () => {
  return (
    <main>
      <section className="p-1">
        <LifeExpectancy />
      </section>
    </main>
  );
};

export default LifeExpectancyPage;

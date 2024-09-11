import LifeExpectancy from '@/components/life-expectancy';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Life Expectancy',
    desc: 'Explore the life expectancy of different countries using Globe Graph.',
    url: '/country-life-expectancy',
    keywords: ['geo chart', 'life expectancy', 'country life expectancy'],
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

import Unemployment from '@/components/countries/unemployment';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Unemployment Labour Force',
    desc: 'Explore the unemployment rate of different countries using Globe Graph.',
    url: '/country-unemployment-labor-force',
    keywords: ['geo chart', 'unemployment', 'country unemployment'],
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

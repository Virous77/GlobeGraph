import PerCapita from '@/components/countries/per-capita';
import { commonMetaData } from '@/utils';
import React from 'react';

export const generateMetadata = async () => {
  const metaData = commonMetaData({
    name: 'Country Per Capita Income',
    desc: 'Explore the per capita income of different countries using Globe Graph.',
    url: '/per-capita-income',
    keywords: ['geo chart', 'per capita income', 'country per capita income'],
  });
  return {
    ...metaData,
  };
};

const CountryPerCapitaIncomePage = () => {
  return (
    <main>
      <section className="p-1">
        <PerCapita />
      </section>
    </main>
  );
};

export default CountryPerCapitaIncomePage;

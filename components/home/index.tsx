import React from 'react';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import BackgroundDots from '../custom-ui/background';

const URLS = [
  {
    href: '/country-gdp',
    name: 'Country GDP',
    color: 'red',
  },
  {
    href: '/country-per-capita-income',
    name: 'Country Per Capita Income',
    color: 'blue',
  },
  {
    href: '/life-expectancy',
    name: 'Life Expectancy',
    color: 'green',
  },
];

const Home = () => {
  return (
    <section className="w-full rounded-[1rem] border p-5 md:w-fit">
      <h1 className="mb-3 text-2xl font-bold">Explore the data</h1>
      <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
        {URLS.map(({ href, name, color }) => (
          <Card
            key={href}
            className="relative m-0 w-full rounded-[1rem] p-0 md:w-[300px]"
          >
            <CardContent className="flex h-[100px] w-full flex-col items-center justify-center gap-1 rounded-[1rem] border p-3 md:w-[300px]">
              <h2 className="relative z-10 text-lg font-semibold">{name}</h2>
              <Link
                href={href}
                className="relative z-10 flex items-center gap-1 text-sm font-semibold hover:underline hover:underline-offset-4"
              >
                Visit
                <SquareArrowOutUpRight size={16} />
              </Link>
              <BackgroundDots dotColor={color} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Home;

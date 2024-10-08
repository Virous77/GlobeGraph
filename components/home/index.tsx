import React from 'react';
import { Card, CardContent } from '../ui/card';
import Link from 'next/link';
import { SquareArrowOutUpRight } from 'lucide-react';
import BackgroundDots from '../custom-ui/background';
import { useTranslations } from 'next-intl';
import urls from '@/url.json';

const Home = () => {
  const t = useTranslations('HomePage');

  const URLS = urls.map((url) => {
    const { name } = url;
    return {
      ...url,
      name: t(name),
    };
  });

  return (
    <section className="w-full rounded-[1rem] border p-5 md:w-fit">
      <h1 className="mb-3 text-2xl font-bold">{t('title')}</h1>
      <div className="flex w-full flex-col flex-wrap items-center gap-3 md:flex-row">
        {URLS.map(({ href, name, color }) => (
          <Card
            key={href}
            className="relative m-0 w-full flex-1 rounded-[1rem] p-0 md:min-w-[300px]"
          >
            <CardContent className="flex h-[100px] w-full flex-col items-center justify-center gap-1 rounded-[1rem] border p-3 md:min-w-[300px]">
              <h2 className="relative z-10 text-center text-lg font-semibold">
                {name}
              </h2>
              <Link
                href={href}
                className="relative z-10 flex items-center gap-1 text-sm font-semibold hover:underline hover:underline-offset-4"
              >
                {t('visit')}
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

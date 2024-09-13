import fs from 'fs';

const sitemap = async () => {
  const URL = 'https://globe-graph.vercel.app';

  const pages = fs
    .readdirSync('app/country')
    .map((page) => page.replace('.tsx', ''));

  const makeUrls = (pages: string[]) => {
    return pages.map((page) => {
      return {
        url: `${URL}/country/${page}`,
        lastModified: new Date(),
        priority: 0.9,
        changeFrequency: 'weekly',
      };
    });
  };

  const restUrls = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    ...makeUrls(pages),
  ];

  return [...restUrls];
};

export default sitemap;

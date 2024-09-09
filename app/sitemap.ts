const sitemap = async () => {
  const URL = 'https://globe-graph.vercel.app';

  const restUrls = [
    {
      url: `${URL}/`,
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-gdp`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-per-capita-income`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-life-expectancy`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-population`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-unemployment-labor-force`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-fdi`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
    {
      url: `${URL}/country-debt`,
      lastModified: new Date(),
      priority: 0.9,
      changeFrequency: 'weekly',
    },
  ];

  return [...restUrls];
};

export default sitemap;

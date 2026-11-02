export const SITE_URL = 'https://globe-graph.vercel.app';
export const SITE_NAME = 'Globe Graph';

// "GDP: India vs China, 2004–2024": the title follows what the chart shows
export const buildChartTitle = ({
  metric,
  labels,
  from,
  to,
}: {
  metric: string;
  labels: string[];
  from: number;
  to: number;
}) => {
  const range = `${from}–${to}`;
  if (!labels.length) return `${metric}, ${range}`;
  return `${metric}: ${labels.join(' vs ')}, ${range}`;
};

export const withSiteName = (title: string) => `${title} | ${SITE_NAME}`;

export const getMetricUrl = (slug: string) => `${SITE_URL}/country/${slug}`;

import { notFound } from 'next/navigation';
import { getMetric } from '@/data-layer/metrics';
import { OG_SIZE, renderOgImage } from '@/lib/og';
import messages from '@/messages/en.json';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Globe Graph country comparison chart';

const Image = async ({ params }: { params: Promise<{ metric: string }> }) => {
  const metric = getMetric((await params).metric);
  if (!metric) notFound();

  const copy = messages.Metric[metric.key as keyof typeof messages.Metric];
  return renderOgImage(`${copy.name} by country`, copy.about);
};

export default Image;

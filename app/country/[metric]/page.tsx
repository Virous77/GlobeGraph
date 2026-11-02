import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SearchParams } from 'nuqs/server';
import ExplorerPage from '@/components/explorer/page';
import { getMetric } from '@/data-layer/metrics';
import { buildMetadata } from '@/lib/metadata';

type TProps = {
  params: Promise<{ metric: string }>;
  searchParams: Promise<SearchParams>;
};

const loadMetric = async (params: TProps['params']) => {
  const metric = getMetric((await params).metric);
  if (!metric) notFound();
  return metric;
};

export const generateMetadata = async ({
  params,
  searchParams,
}: TProps): Promise<Metadata> =>
  buildMetadata({ metric: await loadMetric(params), searchParams });

const MetricPage = async ({ params, searchParams }: TProps) => (
  <ExplorerPage metric={await loadMetric(params)} searchParams={searchParams} />
);

export default MetricPage;

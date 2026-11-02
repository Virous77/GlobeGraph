import { Metadata } from 'next';
import { SearchParams } from 'nuqs/server';
import ExplorerPage from '@/components/explorer/page';
import { DEFAULT_METRIC } from '@/data-layer/metrics';
import { buildMetadata } from '@/lib/metadata';

type TProps = { searchParams: Promise<SearchParams> };

export const generateMetadata = async ({
  searchParams,
}: TProps): Promise<Metadata> =>
  buildMetadata({ metric: DEFAULT_METRIC, searchParams, isHome: true });

const HomePage = ({ searchParams }: TProps) => (
  <ExplorerPage metric={DEFAULT_METRIC} searchParams={searchParams} isHome />
);

export default HomePage;

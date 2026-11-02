import { NextResponse } from 'next/server';
import { ECONOMIES } from '@/data-layer/economies';
import { getMetric } from '@/data-layer/metrics';
import { CACHE_SECONDS, getSeries } from '@/data-layer/world-bank';

export const GET = async (
  _: Request,
  { params }: { params: Promise<{ metric: string; country: string }> }
) => {
  const { metric: slug, country } = await params;
  const metric = getMetric(slug);

  // Only known pairs reach the World Bank, so this can't be used as a proxy
  if (!metric || !ECONOMIES.has(country)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    const points = await getSeries(metric.indicator, country);
    return NextResponse.json(points, {
      headers: {
        'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 7}`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Data source unavailable' },
      { status: 503, headers: { 'Retry-After': '60' } }
    );
  }
};

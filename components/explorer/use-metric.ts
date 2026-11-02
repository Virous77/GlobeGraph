'use client';

import { usePathname } from 'next/navigation';
import { DEFAULT_METRIC, getMetric } from '@/data-layer/metrics';

// The metric comes from the URL, so switching needs no server render
export const useMetric = () => {
  const pathname = usePathname();
  return {
    metric: getMetric(pathname.split('/')[2] ?? '') ?? DEFAULT_METRIC,
    isHome: pathname === '/',
  };
};

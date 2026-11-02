'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { normalizeSelection, selectionParsers } from '@/lib/selection';
import { cn } from '@/lib/utils';
import { seriesQuery } from './series-query';
import { useMetric } from './use-metric';

const PREFETCH_DELAY_MS = 120;

type TGroup = {
  group: string;
  title: string;
  metrics: { slug: string; name: string }[];
};

// Real links, so crawlers reach every metric and a new tab works. A normal
// click only changes the URL: the shell stays put and the chart swaps in place.
const MetricNav = ({ label, groups }: { label: string; groups: TGroup[] }) => {
  const query = useSearchParams().toString();
  const { metric } = useMetric();
  const client = useQueryClient();
  const [raw] = useQueryStates(selectionParsers);
  const { countries } = normalizeSelection(raw);
  const hoverTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const href = (slug: string) => `/country/${slug}${query ? `?${query}` : ''}`;

  // Load on intent, so the click finds its data ready. The delay skips metrics
  // the pointer only passes over, and cached ones cost no request at all.
  const prefetch = (slug: string) => {
    hoverTimer.current = setTimeout(() => {
      countries.forEach((code) => {
        client.prefetchQuery(seriesQuery(slug, code));
      });
    }, PREFETCH_DELAY_MS);
  };

  return (
    <nav
      aria-label={label}
      className="bg-page sticky top-14 z-20 border-b lg:top-20 lg:mt-6 lg:max-h-[calc(100dvh-6rem)] lg:self-start lg:overflow-y-auto lg:border-0 lg:bg-transparent"
    >
      <div className="no-scrollbar flex gap-1 overflow-x-auto px-4 py-2 lg:block lg:space-y-5 lg:p-0">
        {groups.map(({ group, title, metrics }) => (
          <div key={group} className="contents lg:block">
            <p className="text-ink-2 mb-1 hidden px-3 text-xs font-medium lg:block">
              {title}
            </p>
            <ul className="contents lg:block lg:space-y-0.5">
              {metrics.map(({ slug, name }) => (
                <li key={slug} className="shrink-0">
                  <Link
                    href={href(slug)}
                    prefetch={false}
                    scroll={false}
                    aria-current={slug === metric.slug ? 'page' : undefined}
                    onPointerEnter={() => prefetch(slug)}
                    onPointerLeave={() => clearTimeout(hoverTimer.current)}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
                        return;
                      }
                      e.preventDefault();
                      window.history.pushState(null, '', href(slug));
                    }}
                    className={cn(
                      'block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap lg:whitespace-normal',
                      slug === metric.slug
                        ? 'bg-sunken font-medium'
                        : 'text-ink-2 hover:bg-sunken'
                    )}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default MetricNav;

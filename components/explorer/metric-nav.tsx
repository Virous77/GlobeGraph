'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

type TGroup = {
  group: string;
  title: string;
  metrics: { slug: string; name: string }[];
};

// Real links, so crawlers reach every metric. The query string carries the
// countries and years across metrics.
const MetricNav = ({
  active,
  label,
  groups,
}: {
  active: string;
  label: string;
  groups: TGroup[];
}) => {
  const query = useSearchParams().toString();
  const href = (slug: string) => `/country/${slug}${query ? `?${query}` : ''}`;

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
                    scroll={false}
                    aria-current={slug === active ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-1.5 text-sm whitespace-nowrap lg:whitespace-normal',
                      slug === active
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

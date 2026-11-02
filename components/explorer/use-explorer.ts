'use client';

import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useQueryStates } from 'nuqs';
import { TPoint, TSeriesMap } from '@/data-layer/types';
import { normalizeSelection, selectionParsers } from '@/lib/selection';

const SLOTS = 5;

const fetchSeries = async (slug: string, code: string) => {
  const res = await fetch(`/api/indicator/${slug}/${code}`);
  if (!res.ok) throw new Error('Failed to load data');
  return (await res.json()) as TPoint[];
};

// A color stays with its country: removing one never repaints the others
const assignSlots = (countries: string[], current: Record<string, number>) => {
  const next: Record<string, number> = {};
  countries.forEach((code) => {
    if (current[code] !== undefined) next[code] = current[code];
  });
  countries.forEach((code) => {
    if (next[code] !== undefined) return;
    const used = Object.values(next);
    next[code] = Array.from({ length: SLOTS }, (_, i) => i).find(
      (slot) => !used.includes(slot)
    )!;
  });
  return next;
};

export const useExplorer = (slug: string, initialSeries: TSeriesMap) => {
  const [raw, setRaw] = useQueryStates(selectionParsers, {
    history: 'replace',
    scroll: false,
    shallow: true,
  });
  const selection = normalizeSelection(raw);
  const { countries } = selection;

  const [slots, setSlots] = useState(() => assignSlots(countries, {}));
  const nextSlots = assignSlots(countries, slots);
  if (Object.keys(nextSlots).join() !== Object.keys(slots).join()) {
    setSlots(nextSlots);
  }

  // Years filter data that's already here. Only a new country or metric fetches.
  const { series, isLoading, failed, retry } = useQueries({
    queries: countries.map((code) => ({
      queryKey: ['series', slug, code],
      queryFn: () => fetchSeries(slug, code),
      initialData: initialSeries[code],
    })),
    combine: (results) => ({
      series: Object.fromEntries(
        countries.flatMap((code, idx) => {
          const { data } = results[idx] ?? {};
          return data ? [[code, data]] : [];
        })
      ) as TSeriesMap,
      isLoading: results.some((result) => result.isPending),
      failed: results.some((result) => result.isError),
      retry: () =>
        results.forEach((result) => result.isError && result.refetch()),
    }),
  });

  return {
    raw,
    selection,
    series,
    slots: nextSlots,
    isLoading,
    failed,
    retry,
    setRaw,
  };
};

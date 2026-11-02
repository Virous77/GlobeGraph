import {
  createLoader,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server';
import { ECONOMIES } from '@/data-layer/economies';
import { FIRST_YEAR } from '@/data-layer/metrics';

export const MAX_COUNTRIES = 5;
const DEFAULT_COUNTRIES = ['USA', 'CHN', 'IND'];
const DEFAULT_SPAN = 20;
const VIEWS = ['trend', 'ranking'] as const;

export type TView = (typeof VIEWS)[number];

export const selectionParsers = {
  c: parseAsArrayOf(parseAsString, '-').withDefault(DEFAULT_COUNTRIES),
  from: parseAsInteger,
  to: parseAsInteger,
  view: parseAsStringLiteral(VIEWS).withDefault('trend'),
};

export const loadSelection = createLoader(selectionParsers);

export const getMaxYear = () => new Date().getFullYear() - 1;

type TRaw = {
  c: string[];
  from: number | null;
  to: number | null;
  view: TView;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

// The URL is user input: everything is checked here before it's used
export const normalizeSelection = (raw: TRaw) => {
  const maxYear = getMaxYear();
  const countries = [...new Set(raw.c.map((code) => code.toUpperCase()))]
    .filter((code) => ECONOMIES.has(code))
    .slice(0, MAX_COUNTRIES);
  const to = clamp(raw.to ?? maxYear, FIRST_YEAR + 1, maxYear);
  const from = clamp(raw.from ?? maxYear - DEFAULT_SPAN, FIRST_YEAR, to - 1);

  return { countries, from, to, view: raw.view };
};

export const isDefaultSelection = ({ c, from, to, view }: TRaw) =>
  from === null &&
  to === null &&
  view === 'trend' &&
  c.join() === DEFAULT_COUNTRIES.join();

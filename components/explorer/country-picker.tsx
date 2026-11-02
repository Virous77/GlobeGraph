'use client';

import { useRef, useState } from 'react';
import { Command } from 'cmdk';
import { Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TCountryOption } from '@/data-layer/types';
import { MAX_COUNTRIES } from '@/lib/selection';

const normalize = (text: string) =>
  text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();

// Whole names and codes first, then word starts. No fuzzy matching: "usa" has
// to mean the United States, not every name holding those three letters.
const scoreCountry = ({ label, keywords }: TCountryOption, query: string) => {
  const names = [label, ...keywords].map(normalize);
  if (names.includes(query)) return 4;
  if (names.some((name) => name.startsWith(query))) return 3;
  if (names.some((name) => name.split(/[\s,()-]+/).includes(query))) return 2;
  return names.some((name) => name.includes(query)) ? 1 : 0;
};

// Searches a local list: typing never touches the network
const CountryPicker = ({
  options,
  selected,
  onAdd,
}: {
  options: TCountryOption[];
  selected: string[];
  onAdd: (code: string) => void;
}) => {
  const t = useTranslations('Explorer');
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const isFull = selected.length >= MAX_COUNTRIES;

  const query = normalize(search.trim());
  const matches = options
    .filter(({ code }) => !selected.includes(code))
    .map((option) => ({
      option,
      score: query ? scoreCountry(option, query) : 1,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <Command
      label={t('addCountry')}
      shouldFilter={false}
      className="relative w-full md:w-72"
      onKeyDown={(e) => {
        if (e.key === 'Escape') (e.target as HTMLElement).blur();
      }}
    >
      <div className="bg-surface focus-within:outline-accent flex h-10 items-center gap-2 rounded-lg border px-3 focus-within:outline-2">
        <Search className="text-ink-2 size-4 shrink-0" />
        <Command.Input
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          disabled={isFull}
          placeholder={
            isFull ? t('maxReached', { max: MAX_COUNTRIES }) : t('addCountry')
          }
          className="placeholder:text-ink-2 w-full bg-transparent text-base outline-none md:text-sm"
        />
      </div>
      {open && (
        <Command.List className="bg-surface absolute top-full z-30 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border p-1 shadow-lg">
          <Command.Empty className="text-ink-2 p-3 text-sm">
            {t('noMatch')}
          </Command.Empty>
          {matches.map(({ option: { code, label } }) => (
            <Command.Item
              key={code}
              value={code}
              onMouseDown={(e) => e.preventDefault()}
              onSelect={() => {
                onAdd(code);
                setSearch('');
                inputRef.current?.blur();
              }}
              className="data-[selected=true]:bg-sunken cursor-pointer rounded-md px-2 py-2 text-sm"
            >
              {label}
            </Command.Item>
          ))}
        </Command.List>
      )}
    </Command>
  );
};

export default CountryPicker;

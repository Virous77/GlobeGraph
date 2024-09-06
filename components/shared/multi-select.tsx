import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { TCountries } from '@/store/use-gdp';
import { COUNTRIES } from './config';

type TMultiSelect = {
  countries: TCountries[];
  fetchNewCountryData: (name: string) => void;
  setCountries: (countries: TCountries) => void;
  removeCountry: (name: string) => void;
  removeLastCountry: () => void;
};

const MultiSelect: React.FC<TMultiSelect> = ({
  countries,
  fetchNewCountryData,
  setCountries,
  removeCountry,
  removeLastCountry,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const handleUnselect = React.useCallback((framework: TCountries) => {
    removeCountry(framework.value);
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            removeLastCountry();
          }
        }
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    []
  );

  const selectTables = COUNTRIES.filter(
    (framework) => !countries.find((c) => c.value === framework.value)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className="group border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
        style={{
          borderRadius: '1rem',
        }}
      >
        <div className="flex flex-wrap gap-1">
          {countries.map((framework) => {
            return (
              <Badge key={framework.value} variant="secondary">
                {framework.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(framework);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(framework)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}

          {countries.length <= 4 && (
            <CommandPrimitive.Input
              ref={inputRef}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder="Select Countries..."
              className="ml-2 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          )}
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList className="border-none">
          {open && selectTables.length > 0 && countries.length <= 4 ? (
            <div
              className="absolute top-0 z-10 max-h-[400px] min-h-fit w-full overflow-scroll rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in"
              style={{
                borderRadius: '1rem',
              }}
            >
              <CommandGroup className="h-full overflow-auto">
                {selectTables.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setCountries(framework);
                        fetchNewCountryData(framework.value);
                      }}
                      className={'cursor-pointer rounded-[1rem]'}
                    >
                      {framework.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};

export default MultiSelect;

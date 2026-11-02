'use client';

import { useTransition } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LOCALES } from '@/i18n/locales';
import { languageAction } from './language-action';

const LanguageSelect = ({
  locale,
  label,
}: {
  locale: string;
  label: string;
}) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={locale}
      disabled={isPending}
      onValueChange={(language) =>
        startTransition(() => languageAction(language))
      }
    >
      <SelectTrigger
        aria-label={label}
        className="text-ink-2 border-transparent bg-transparent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {LOCALES.map(({ code, name }) => (
          <SelectItem key={code} value={code}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelect;

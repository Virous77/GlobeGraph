'use client';

import { ChartLine, ListOrdered } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { TView } from '@/lib/selection';
import { cn } from '@/lib/utils';

const TABS = [
  { view: 'trend', icon: ChartLine },
  { view: 'ranking', icon: ListOrdered },
] as const;

const ViewTabs = ({
  view,
  onChange,
}: {
  view: TView;
  onChange: (view: TView) => void;
}) => {
  const t = useTranslations('Explorer');

  return (
    <div
      role="group"
      aria-label={t('viewLabel')}
      className="bg-sunken flex rounded-lg p-0.5"
    >
      {TABS.map((tab) => (
        <button
          key={tab.view}
          type="button"
          aria-pressed={view === tab.view}
          onClick={() => onChange(tab.view)}
          className={cn(
            'flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm',
            view === tab.view
              ? 'bg-surface font-medium shadow-sm'
              : 'text-ink-2'
          )}
        >
          <tab.icon className="size-4" />
          {t(tab.view)}
        </button>
      ))}
    </div>
  );
};

export default ViewTabs;

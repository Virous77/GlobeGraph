'use client';

import { RefObject, useState } from 'react';
import { Check, ImageDown, Link2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { saveChartImage, TLegendItem } from '@/lib/save-chart';

const buttonClass =
  'text-ink-2 hover:bg-sunken flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-sm';

const ExportActions = ({
  chartRef,
  canSaveImage,
  title,
  legend,
}: {
  chartRef: RefObject<HTMLDivElement | null>;
  canSaveImage: boolean;
  title: string;
  legend: TLegendItem[];
}) => {
  const t = useTranslations('Explorer');
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />}
        <span aria-live="polite">{copied ? t('copied') : t('share')}</span>
      </button>
      {canSaveImage && (
        <button
          type="button"
          onClick={() => saveChartImage(chartRef.current, title, legend)}
          className={buttonClass}
        >
          <ImageDown className="size-4" />
          {t('saveImage')}
        </button>
      )}
    </div>
  );
};

export default ExportActions;

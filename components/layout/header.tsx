import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { MainLogo } from '@/assets/logo';
import { SITE_NAME } from '@/lib/seo';
import LanguageSelect from './language-select';
import ThemeToggle from './theme-toggle';

const Header = async () => {
  const locale = await getLocale();
  const t = await getTranslations('Layout');

  return (
    <header className="bg-page/90 sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-3 px-4 lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold whitespace-nowrap"
        >
          <MainLogo />
          {SITE_NAME}
        </Link>
        <div className="flex items-center gap-1">
          <LanguageSelect locale={locale} label={t('language')} />
          <ThemeToggle label={t('theme')} />
          <a
            href="https://github.com/Virous77/GlobeGraph"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink-2 hover:bg-sunken flex size-9 items-center justify-center rounded-lg"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor">
              <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;

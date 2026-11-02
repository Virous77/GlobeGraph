import { getTranslations } from 'next-intl/server';

const Footer = async () => {
  const t = await getTranslations('Layout');

  return (
    <footer className="text-ink-2 mt-auto border-t text-sm">
      <p className="mx-auto max-w-[1400px] px-4 py-4 lg:px-6">
        {t('source')}{' '}
        <a
          href="https://data.worldbank.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          World Bank Open Data
        </a>{' '}
        (CC BY 4.0)
      </p>
    </footer>
  );
};

export default Footer;

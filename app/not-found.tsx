import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

const NotFound = async () => {
  const t = await getTranslations('NotFound');

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold">{t('title')}</h1>
      <p className="text-ink-2">{t('message')}</p>
      <Link href="/" className="text-accent font-medium hover:underline">
        {t('back')}
      </Link>
    </main>
  );
};

export default NotFound;

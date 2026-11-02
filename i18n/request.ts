import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { isLocale } from './locales';

export default getRequestConfig(async () => {
  const lang = await cookies();
  const cookieLocale = lang.get('lang')?.value;
  // The cookie is user-controlled and picks the file imported below
  const locale = isLocale(cookieLocale) ? cookieLocale : 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

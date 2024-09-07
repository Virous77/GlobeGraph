import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
  const lang = cookies().get('lang');
  const locale = lang?.value || 'en';

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

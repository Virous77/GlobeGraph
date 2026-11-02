'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { isLocale } from '@/i18n/locales';

export const languageAction = async (language: string) => {
  const store = await cookies();
  store.set({
    name: 'lang',
    value: isLocale(language) ? language : 'en',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 100,
  });

  revalidatePath('/', 'layout');
};

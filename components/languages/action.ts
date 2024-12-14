'use server';

import z from 'zod';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const languageAction = async ({ language }: { language: string }) => {
  const schema = z.object({
    language: z.string().min(2).max(2),
  });

  const data = schema.safeParse({ language });
  let lang: string;
  if (!data.success) {
    lang = 'en';
  } else {
    lang = data.data.language;
  }

  const Cookies = await cookies();
  Cookies.set({
    name: 'lang',
    value: lang,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 100,
  });

  revalidatePath('/');
  return lang;
};

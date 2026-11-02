export const LOCALES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
];

export const isLocale = (value: string | undefined): value is string =>
  LOCALES.some(({ code }) => code === value);

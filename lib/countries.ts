import 'server-only';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import es from 'i18n-iso-countries/langs/es.json';
import fr from 'i18n-iso-countries/langs/fr.json';
import hi from 'i18n-iso-countries/langs/hi.json';
import de from 'i18n-iso-countries/langs/de.json';
import { ECONOMIES } from '@/data-layer/economies';
import { TCountryOption } from '@/data-layer/types';

[en, es, fr, hi, de].forEach((locale) => countries.registerLocale(locale));

// The World Bank uses XKX for Kosovo, the country list uses XKK
const toIsoCode = (code: string) => (code === 'XKX' ? 'XKK' : code);

const ACRONYM = /^[A-Z.]+$/;

const names = (code: string, locale: string) => {
  const alpha2 = countries.alpha3ToAlpha2(toIsoCode(code));
  return alpha2
    ? (countries.getName(alpha2, locale, { select: 'all' }) ?? [])
    : [];
};

// Built on the server, so the name tables stay out of the browser bundle
export const getCountryOptions = (locale: string): TCountryOption[] =>
  [...ECONOMIES]
    .flatMap((code) => {
      const localized = names(code, locale);
      const english = names(code, 'en');
      // The shortest full name reads best: "Russia", not "Russian Federation"
      const label = localized
        .filter((name) => !ACRONYM.test(name) && name !== 'Great Britain')
        .sort((a, b) => a.length - b.length)[0];
      if (!label) return [];
      const alpha2 = countries.alpha3ToAlpha2(toIsoCode(code)) ?? '';
      return [
        { code, label, keywords: [code, alpha2, ...localized, ...english] },
      ];
    })
    .sort((a, b) => a.label.localeCompare(b.label, locale));

'use client';

import React, { useState } from 'react';
import MainSelect from '../custom-ui/main-select';
import { languageAction } from './action';
import { useTranslations } from 'next-intl';

const Languages = ({ lang }: { lang: string }) => {
  const [language, setLanguage] = useState(lang);
  const t = useTranslations('Language');

  const LANGUAGES = [
    {
      name: t('en'),
      value: 'en',
    },
    {
      name: t('hi'),
      value: 'hi',
    },
    {
      name: t('es'),
      value: 'es',
    },
    {
      name: t('fr'),
      value: 'fr',
    },
    {
      name: t('de'),
      value: 'de',
    },
  ];

  return (
    <MainSelect
      data={LANGUAGES}
      placeholder="Select Language"
      classNames={{
        trigger: 'w-[160px]',
      }}
      value={language}
      onChange={(e) => {
        setLanguage(e);
        languageAction({ language: e });
      }}
    />
  );
};

export default Languages;

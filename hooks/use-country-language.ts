import { getAllCountries } from '@/components/shared/config';
import { useEffect } from 'react';
import { TCountries } from './use-data';

type TCountry = {
  countries: TCountries[];
  setMultipleCountries: (countries: TCountries[]) => void;
  lang: string;
};

const useCountryLanguage = ({
  countries,
  setMultipleCountries,
  lang,
}: TCountry) => {
  const getUpdatedCountries = (lang: string, oldCountries: TCountries[]) => {
    const newCountriesLang = oldCountries.map((country) => country.value);
    const allCountries = getAllCountries(lang);
    const updatedCountries = allCountries.filter((country) =>
      newCountriesLang.includes(country.value)
    );
    setMultipleCountries(updatedCountries);
  };

  useEffect(() => {
    getUpdatedCountries(lang, countries);
  }, [lang]);

  return {
    getUpdatedCountries,
  };
};

export default useCountryLanguage;

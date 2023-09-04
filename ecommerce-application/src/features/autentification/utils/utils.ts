import { MINIMAL_ACCESS_AGE, countriesData } from '../constants/constants';

export const getFullYears = (date: string): number => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  if (!years) return 0;
  if (currentDate.getMonth() > birthDate.getMonth()) return years;
  if (currentDate.getMonth() < birthDate.getMonth()) return years - 1;
  return currentDate.getDate() >= birthDate.getDate() ? years : years - 1;
};

export const checkDateValidity = (date: string): boolean | string => {
  if (new Date(date).getTime() > new Date().getTime()) {
    return "You can't be born in the future";
  }
  return (
    getFullYears(date) >= MINIMAL_ACCESS_AGE ||
    `Sorry, you are under ${MINIMAL_ACCESS_AGE}`
  );
};

export const changeDateView = (date: string | undefined): string | null => {
  if (date) {
    return date.split('-').reverse().join('. ');
  }
  return null;
};

export const getCountryName = (code: string): string | null => {
  const countryInfo = countriesData.find((el) => el.code === code);
  return countryInfo?.name ? countryInfo.name : null;
};

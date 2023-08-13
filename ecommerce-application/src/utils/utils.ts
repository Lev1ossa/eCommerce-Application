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
  if (new Date(date) > new Date()) {
    return "You can't be born in the future";
  }
  return getFullYears(date) >= 13 || `Sorry, you are under 13`;
};

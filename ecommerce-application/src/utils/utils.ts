export const getFullYears = (date: string): number => {
  const birthDate = new Date(date);
  const currentDate = new Date();
  const years = currentDate.getFullYear() - birthDate.getFullYear();
  if (!years) return 0;
  if (currentDate.getMonth() > birthDate.getMonth()) return years;
  if (currentDate.getMonth() < birthDate.getMonth()) return years - 1;
  return currentDate.getDate() >= birthDate.getDate() ? years : years - 1;
};

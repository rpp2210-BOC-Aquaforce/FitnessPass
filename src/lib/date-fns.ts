/* eslint-disable import/prefer-default-export */
export const parseLocalDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-').map(Number);
  // Note: JavaScript counts months from 0 (January is 0, February is 1, etc.)
  return new Date(year, month - 1, day);
};

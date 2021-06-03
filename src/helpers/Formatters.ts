export const onlyNumbersAllowed = (input: string): string => {
  const pattern = /[^0-9.]/gm;
  const str = input.replace(pattern, '');

  return str;
};

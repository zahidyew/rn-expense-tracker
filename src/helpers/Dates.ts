// expected output of toDateString(): Wed Jul 28 1993
export const getDate = () => {
  const [_dayName, month, day, year] = new Date().toDateString().split(' ');

  return `${day} ${month} ${year}`;
};

export const getMonth = () => {
  const [_dayName, month, _day, _year] = new Date().toDateString().split(' ');
  return month;
};

export const getYear = () => {
  const [_dayName, _month, _day, year] = new Date().toDateString().split(' ');
  return year;
};

type DateFormat =
  | 'dayName'
  | 'day'
  | 'month'
  | 'year'
  | 'dayMonth'
  | 'monthYear'
  | 'dayMonthYear';

// month is returned in the form of the first three letters of the month name
// Todo: rewrite this to seperate into smaller functions
export const getDate = (format: DateFormat) => {
  // expected output of toDateString(): Wed Jul 28 1993
  const [dayName, month, day, year] = new Date().toDateString().split(' ');
  //console.log(`${dayName}, ${day}, ${month}, ${year}`);

  switch (format) {
    case 'dayName':
      return dayName;
    case 'day':
      return day;
    case 'month':
      return month;
    case 'year':
      return year;
    case 'dayMonth':
      return `${day} ${month}`;
    case 'monthYear':
      return `${month} ${year}`;
    case 'dayMonthYear':
      return `${day} ${month} ${year}`;
    default:
      console.error(
        'Incorrect date format passed in function getDate() in Dates.ts',
      );
      return `${day} ${month} ${year}`;
  }
};

export const getMonth = () => {
  const [_dayName, month, _day, _year] = new Date().toDateString().split(' ');
  return month;
};

export const getYear = () => {
  const [_dayName, _month, _day, year] = new Date().toDateString().split(' ');
  return year;
};

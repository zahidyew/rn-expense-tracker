type DateFormat =
  | 'weekday'
  | 'day'
  | 'month'
  | 'year'
  | 'dayMonth'
  | 'monthYear'
  | 'dayMonthYear';

export const getDate = (format: DateFormat) => {
  const [month, day, year] = new Date().toLocaleDateString('en-US').split('/');
  //const [hour, minute] = new Date().toLocaleTimeString('en-US').split(/:| /);

  switch (format) {
    case 'weekday':
      return new Date().toLocaleDateString('en-US', { weekday: 'short' });
    case 'day':
      return new Date().toLocaleDateString('en-US', { day: 'numeric' });
    case 'month':
      return new Date().toLocaleDateString('en-US', { month: 'long' });
    case 'year':
      return year;
    case 'dayMonth':
      return `${day}/${month}`;
    case 'monthYear':
      return `${month}/${year}`;
    case 'dayMonthYear':
      return `${day}/${month}/${year}`;
    default:
      console.error(
        'Incorrect date format passed in function getDate() in Dates.ts',
      );
      return `${day}/${month}/${year}`;
  }
};

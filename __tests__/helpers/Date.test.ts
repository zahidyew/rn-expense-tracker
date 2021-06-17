import { getDate } from '../../src/helpers/Dates';

it('returns full date', () => {
  const [_dayName, month, day, year] = new Date().toDateString().split(' ');

  expect(getDate('dayMonthYear')).toBe(`${day} ${month} ${year}`);
});

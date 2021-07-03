import { getDate, getMonth, getYear } from '../../src/helpers/Dates';

test('returns full date', () => {
  const [_dayName, month, day, year] = new Date().toDateString().split(' ');

  expect(getDate()).toBe(`${day} ${month} ${year}`);
});

test('returns month', () => {
  const [_dayName, month, _day, _year] = new Date().toDateString().split(' ');

  expect(getMonth()).toBe(`${month}`);
});

test('returns year', () => {
  const [_dayName, _month, _day, year] = new Date().toDateString().split(' ');

  expect(getYear()).toBe(`${year}`);
});

import { filterExpenses } from '../../src/helpers/Filters';

test('filtering expenses', () => {
  const expense = [
    {
      id: 1,
      name: 'Coffee',
      price: 5,
      date: '14/6/2021',
    },
    {
      id: 2,
      name: 'Tea',
      price: 3,
      date: '2/9/2021',
    },
  ];

  expect(filterExpenses(expense, '9', '2021')).not.toEqual([]);
  expect(filterExpenses(expense, '9', '2021')).toEqual([
    {
      id: 2,
      name: 'Tea',
      price: 3,
      date: '2/9/2021',
    },
  ]);
  expect(filterExpenses(expense, '6', '2021')).not.toEqual([]);
  expect(filterExpenses(expense, '6', '2021')).toEqual([
    {
      id: 1,
      name: 'Coffee',
      price: 5,
      date: '14/6/2021',
    },
  ]);
  expect(filterExpenses(expense, '5', '2021')).toEqual([]);
  expect(filterExpenses(expense, '6', '2020')).toEqual([]);
});

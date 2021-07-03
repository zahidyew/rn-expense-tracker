import { Expense } from '../../src/models/Expense';
import {
  extractCategories,
  buildChartData,
  sliceColors,
} from '../../src/containers/chartsLogic';

const expenses: Expense[] = [
  {
    id: 1321,
    name: 'Food',
    price: 5,
    date: '03 Jul 2021',
  },
  {
    id: 1322,
    name: 'Food',
    price: 15,
    date: '04 Jul 2021',
  },
  {
    id: 1323,
    name: 'Home',
    price: 150,
    date: '04 Jul 2021',
  },
];

test('return expenses categories and its total spending', () => {
  const expectedValue = new Map();
  expectedValue.set('Food', 20);
  expectedValue.set('Home', 150);

  expect(extractCategories(expenses)).toEqual(expectedValue);
});

test('build chart data', () => {
  const expectedValue = [
    {
      name: 'Food',
      total: 20,
      color: sliceColors[0],
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
    {
      name: 'Home',
      total: 150,
      color: sliceColors[1],
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    },
  ];

  expect(buildChartData(expenses)).toEqual(expectedValue);
});

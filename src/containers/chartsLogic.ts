import { Expense } from '@src/models/Expense';

interface ChartData {
  name: string;
  total: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

export const extractCategories = (expenses: Expense[]) => {
  const categories = new Map();

  expenses.forEach((expense) => {
    if (categories.has(expense.name)) {
      const value = categories.get(expense.name);
      categories.set(expense.name, value + expense.price);
    } else {
      categories.set(expense.name, expense.price);
    }
  });
  return categories;
};

export const buildChartData = (expenses: Expense[]): ChartData[] => {
  const chartData: ChartData[] = [];
  const categories = extractCategories(expenses);
  const sliceColors = ['red', 'blue', 'yellow', 'green'];
  let index = 0;

  categories.forEach((value, key) => {
    chartData.push({
      name: key,
      total: value,
      color: sliceColors[index++],
      legendFontColor: '#7F7F7F',
      legendFontSize: 10,
    });
  });
  return chartData;
};

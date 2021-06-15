import { Expense } from '@models/Expense';

export const filterExpenses = (
  expenses: Expense[],
  monthNumber: string,
  year: string,
) => {
  return expenses.filter(
    (expense) =>
      expense.date.split('/')[1] == monthNumber &&
      expense.date.split('/')[2] == year,
  );
};

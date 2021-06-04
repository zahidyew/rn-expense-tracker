import { ExpenseItemProps } from '@components/ExpenseItem';
import { createSlice } from '@reduxjs/toolkit';

const dummyData: ExpenseItemProps[] = [
  {
    name: 'Groceries',
    value: 44.5,
    date: '30/5/2020',
  },
  {
    name: 'Dinner',
    value: 10,
    date: '30/1/2021',
  },
];

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: dummyData,
  reducers: {
    addNewExpense: (state, action) => {
      // for array/object, you have to return a new array/object
      return [...state, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewExpense } = expensesSlice.actions;

export default expensesSlice.reducer;
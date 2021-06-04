import { ExpenseItemProps } from '@components/ExpenseItem';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// TODO: item needs a proper ID for update and deletion
const dummyData: ExpenseItemProps[] = [
  {
    name: 'Groceries',
    price: 44.5,
    date: '30/5/2020',
  },
  {
    name: 'Dinner',
    price: 10,
    date: '30/1/2021',
  },
];

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: dummyData,
  reducers: {
    addNewExpense: (state, action: PayloadAction<ExpenseItemProps>) => {
      // for array/object, you have to return a new array/object
      return [...state, action.payload];
    },
    updateExpense: (state, action: PayloadAction<ExpenseItemProps>) => {
      const selectedItem = state.find(
        (item) => item.name === action.payload.name,
      ) as ExpenseItemProps;
      selectedItem.price = action.payload.price;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewExpense, updateExpense } = expensesSlice.actions;

export default expensesSlice.reducer;

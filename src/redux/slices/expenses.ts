import { Expense } from '@models/Expense';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const dummyData: Expense[] = [
  {
    id: 1,
    name: 'Groceries',
    price: 44.5,
    date: '30/4/2020',
  },
  {
    id: 2,
    name: 'Dinner',
    price: 10,
    date: '22/5/2021',
  },
];

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState: dummyData,
  reducers: {
    addNewExpense: (state, action: PayloadAction<Expense>) => {
      // for array/object, you have to return a new array/object
      return [...state, action.payload];
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const selectedItem = state.find(
        (item) => item.id === action.payload.id,
      ) as Expense;
      selectedItem.name = action.payload.name;
      selectedItem.price = action.payload.price;
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewExpense, updateExpense, deleteExpense } =
  expensesSlice.actions;

export default expensesSlice.reducer;

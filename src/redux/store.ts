import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses';

export default configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

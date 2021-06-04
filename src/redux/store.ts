import { configureStore } from '@reduxjs/toolkit';
import expensesReducer from './slices/expenses';

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

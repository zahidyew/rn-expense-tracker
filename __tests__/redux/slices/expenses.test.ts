import { Expense } from '../../../src/models/Expense';
import { PayloadAction } from '@reduxjs/toolkit';
import reducer from '../../../src/redux/slices/expenses';

test('add new expense', () => {
  const initialState: Expense[] = [];
  const action: PayloadAction<Expense> = {
    payload: {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Tea',
      price: 2,
    },
    type: 'expenses/addNewExpense',
  };

  expect(reducer(initialState, action)).toEqual([
    ...initialState,
    action.payload,
  ]);
});

test('update expense', () => {
  const initialStateTestOne: Expense[] = [
    {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Tea',
      price: 2,
    },
  ];

  const initialStateTestTwo: Expense[] = [
    {
      date: '10 May 2021',
      id: 1123836072422,
      name: 'Coffee',
      price: 5,
    },

    {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Tea',
      price: 3,
    },
    {
      date: '22 Jun 2021',
      id: 2223836072433,
      name: 'Soap',
      price: 2,
    },
  ];

  const action: PayloadAction<Expense> = {
    payload: {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Coffee',
      price: 5,
    },
    type: 'expenses/updateExpense',
  };

  expect(reducer(initialStateTestOne, action)).toEqual([
    /* ...initialStateTestOne.filter(
      (expense) => expense.id !== action.payload.id,
    ), */
    action.payload,
  ]);

  expect(reducer(initialStateTestTwo, action)).toEqual([
    {
      date: '10 May 2021',
      id: 1123836072422,
      name: 'Coffee',
      price: 5,
    },
    {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Coffee',
      price: 5,
    },
    {
      date: '22 Jun 2021',
      id: 2223836072433,
      name: 'Soap',
      price: 2,
    },
  ]);
});

test('delete expense', () => {
  const initialState: Expense[] = [
    {
      date: '10 May 2021',
      id: 1123836072422,
      name: 'Coffee',
      price: 5,
    },
    {
      date: '16 Jun 2021',
      id: 1623836072416,
      name: 'Tea',
      price: 3,
    },
    {
      date: '22 Jun 2021',
      id: 2223836072433,
      name: 'Soap',
      price: 2,
    },
  ];

  const action: PayloadAction<number> = {
    payload: 1623836072416,
    type: 'expenses/deleteExpense',
  };

  expect(reducer(initialState, action)).toEqual([
    ...initialState.filter((expense) => expense.id !== action.payload),
    /* {
      date: '10 May 2021',
      id: 1123836072422,
      name: 'Coffee',
      price: 5,
    },
    {
      date: '22 Jun 2021',
      id: 2223836072433,
      name: 'Soap',
      price: 2,
    }, */
  ]);
});

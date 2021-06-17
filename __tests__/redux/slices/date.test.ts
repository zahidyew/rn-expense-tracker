import { Date } from '../../../src/models/Date';
import { PayloadAction } from '@reduxjs/toolkit';
import reducer from '../../../src/redux/slices/date';

it('update month', () => {
  const initialState: Date = {
    month: 'May',
    year: '2021',
  };
  const action: PayloadAction<string> = {
    payload: 'Jun',
    type: 'date/updateMonth',
  };

  expect(reducer(initialState, action)).toEqual({
    month: action.payload,
    year: initialState.year,
  });
});

it('increments year by one', () => {
  const initialState: Date = {
    month: 'May',
    year: '2021',
  };
  const action: PayloadAction<undefined> = {
    payload: undefined,
    type: 'date/incrementYear',
  };
  const incrementedYear = parseInt(initialState.year) + 1;

  expect(reducer(initialState, action)).toEqual({
    month: initialState.month,
    year: incrementedYear.toString(),
  });
});

it('decrements year by one', () => {
  const initialState: Date = {
    month: 'May',
    year: '2021',
  };
  const action: PayloadAction<undefined> = {
    payload: undefined,
    type: 'date/decrementYear',
  };
  const decrementedYear = parseInt(initialState.year) - 1;

  expect(reducer(initialState, action)).toEqual({
    month: initialState.month,
    year: decrementedYear.toString(),
  });
});

import { Date } from '@models/Date';
import { getMonth, getYear } from '@src/helpers/Dates';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDate: Date = {
  month: getMonth(),
  year: getYear(),
};

export const dateSlice = createSlice({
  name: 'date',
  initialState: initialDate,
  reducers: {
    updateMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    incrementYear: (state) => {
      const incrementedYear = parseInt(state.year) + 1;
      state.year = incrementedYear.toString();
    },
    decrementYear: (state) => {
      const decrementedYear = parseInt(state.year) - 1;
      state.year = decrementedYear.toString();
    },
  },
});

export const { updateMonth, incrementYear, decrementYear } = dateSlice.actions;

export default dateSlice.reducer;

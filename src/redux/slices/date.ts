import { getDate } from '@helpers/Dates';
import { Date } from '@models/Date';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialDate: Date = {
  month: getDate('monthInText'),
  year: getDate('year'),
};

export const dateSlice = createSlice({
  name: 'date',
  initialState: initialDate,
  reducers: {
    updateMonth: (state, action: PayloadAction<string>) => {
      state.month = action.payload;
    },
    updateYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
  },
});

export const { updateMonth, updateYear } = dateSlice.actions;

export default dateSlice.reducer;

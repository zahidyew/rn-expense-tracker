import { getDate } from '@helpers/Dates';
import { Date } from '@models/Date';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface monthPayloadType {
  month: string;
  monthNumber: string;
}

const initialDate: Date = {
  month: getDate('monthInText'),
  year: getDate('year'),
  monthNumber: getDate('month'),
};

export const dateSlice = createSlice({
  name: 'date',
  initialState: initialDate,
  reducers: {
    updateMonth: (state, action: PayloadAction<monthPayloadType>) => {
      state.month = action.payload.month;
      state.monthNumber = action.payload.monthNumber;
    },
    updateYear: (state, action: PayloadAction<string>) => {
      state.year = action.payload;
    },
  },
});

export const { updateMonth, updateYear } = dateSlice.actions;

export default dateSlice.reducer;

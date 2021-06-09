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

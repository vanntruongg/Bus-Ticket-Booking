import { getCurrentDateFormatted } from '@/utils/dateUtils';
import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    from: { locationName: '', locationCode: '' },
    to: {
      locationName: '',
      locationCode: '',
    },
    fromTime: getCurrentDateFormatted(),
    toTime: '',
    isReturn: false,
  },
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload;
    },
    setTo: (state, action) => {
      state.to = action.payload;
    },
    setFromTime: (state, action) => {
      state.fromTime = action.payload;
    },
    setToTime: (state, action) => {
      state.toTime = action.payload;
    },
    setIsReturn: (state, action) => {
      state.isReturn = action.payload;
    },
  },
});

export const { setFrom, setTo, setFromTime, setToTime, setIsReturn } =
  tripSlice.actions;

export default tripSlice.reducer;

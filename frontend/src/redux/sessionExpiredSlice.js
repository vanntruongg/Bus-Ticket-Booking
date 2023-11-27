import { createSlice } from '@reduxjs/toolkit';

const sessionExpiredSlice = createSlice({
  name: 'sessionExpired',
  initialState: {
    sessionExpired: null,
  },
  reducers: {
    setSessionExpired: (state, action) => {
      state.sessionExpired = action.payload;
    },
  },
});

export const { setSessionExpired } = sessionExpiredSlice.actions;
export default sessionExpiredSlice.reducer;

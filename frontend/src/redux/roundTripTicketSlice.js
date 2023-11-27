import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trip: {
    tripInfo: null,
    seats: '',
    seatsCode: [],
    pickUp: '',
    totalPrice: '',
  },
  roundTrip: {
    tripInfo: null,
    seats: '',
    seatsCode: [],
    pickUp: '',
    totalPrice: '',
  },
};
const roundTripTicketSlice = createSlice({
  name: 'ticket',
  initialState: initialState,
  reducers: {
    // trip and round trip
    setInfo: (state, action) => {
      state[action.payload.type].tripInfo = action.payload.info;
    },
    setSeats: (state, action) => {
      state[action.payload.type].seats = action.payload.seats;
    },
    setSeatCode: (state, action) => {
      state[action.payload.type].seatsCode = action.payload.seatsCode;
    },
    setPickUp: (state, action) => {
      state[action.payload.type].pickUp = action.payload.pickUp;
    },
    settotalPrice: (state, action) => {
      state[action.payload.type].totalPrice = action.payload.totalPrice;
    },

    clearFromAndTo: (state) => {
      state.trip = initialState.trip;
      state.roundTrip = initialState.roundTrip;
    },
  },
});

export const {
  setInfo,
  setSeats,
  setSeatCode,
  setPickUp,
  settotalPrice,
  clearFromAndTo,
} = roundTripTicketSlice.actions;
export default roundTripTicketSlice.reducer;

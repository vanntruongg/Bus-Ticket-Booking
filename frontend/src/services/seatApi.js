import { SEAT } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const seatApi = {
  getAllSeatByTripId: async (tripId, tripDate) => {
    const res = await axiosInstance.get(
      `${SEAT.GET_BY_TRIP_ID}?id=${tripId}&tripDate=${tripDate}`,
    );
    return res.data;
  },
};

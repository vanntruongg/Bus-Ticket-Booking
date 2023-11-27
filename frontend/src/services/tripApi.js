import { formatDateYYYTMMDD, formatTripDate } from '@/utils/dateUtils';
import axiosInstance from './axiosInstance';
import { TRIP } from '@/constants/ApiEndpoint';

const tripApi = {
  createTrip: async (tripCreate) => {
    const res = await axiosInstance.post(TRIP.CREATE_TRIP, tripCreate);
    return res;
  },
  searchTrip: async (origin, destination, fromTime, toTime, isReturn) => {
    // console.log('fromTime: ', fromTime);
    // console.log('toTime: ', toTime);
    const fromTimeformated = formatTripDate(fromTime);
    const toTimeformated = toTime !== '' ? formatTripDate(toTime) : '';

    const url = `${TRIP.GET_ALL}?origin=${origin}&destination=${destination}&fromTime=${fromTimeformated}&toTime=${toTimeformated}&isReturn=${isReturn}`;

    const res = await axiosInstance.get(url);

    return res.data;
  },
  getById: async (tripId) => {
    const res = await axiosInstance.get(`/trip/${tripId}`);
    return res.data;
  },
  getAllByWeek: async (week) => {
    const res = await axiosInstance.get(TRIP.GET_ALL_BY_WEEK + `?week=${week}`);
    return res.data;
  },
  getAllTripByDate: async (date) => {
    const formatDate = formatDateYYYTMMDD(date);
    const res = await axiosInstance.get(
      TRIP.GET_ALL_BY_DATE + `?date=${formatDate}`,
    );
    return res.data;
  },
  getScheduleInWeek: async (week) => {
    const res = await axiosInstance.get(
      TRIP.GET_ALL_SCHEDULE_BY_WEEK + `?week=${week}`,
    );
    return res.data;
  },
  deleteTrip: async (tripId, tripDate) => {
    return await axiosInstance.delete(
      TRIP.DELETE_TRIP + `?id=${tripId}&tripDate=${tripDate}`,
    );
  },
  updateTrip: async (tripId, tripDate) => {
    return await axiosInstance.delete(TRIP.UPDATE_TRIP);
  },
};

export default tripApi;

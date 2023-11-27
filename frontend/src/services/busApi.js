import { BUS } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const busApi = {
  getAllBusUnusedByDay: async (day) => {
    const res = await axiosInstance.get(BUS.GET_ALL_UNUSED + `?day=${day}`);
    return res.data;
  },
};

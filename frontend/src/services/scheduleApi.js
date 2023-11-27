import { SCHEDULE } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const scheduleApi = {
  getAllSchedule: async () => {
    try {
      const res = await axiosInstance.get(SCHEDULE.GET_ALL);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  },
};

import { STATISTIC } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

const statisticApi = {
  getYearlyRevenue: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.YEARLY_REVENUE);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getQuarterRevenue: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.QUARTERLY_REVENUE);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getMonthlyRevenue: async (month) => {
    try {
      const res = await axiosInstance.get(
        STATISTIC.MONTHLY_REVENUE + `?month=${month}`,
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getWeeklyRevenue: async (month, week) => {
    try {
      const res = await axiosInstance.get(
        STATISTIC.WEEKLY_REVENUE + `?month=${month}&week=${week}`,
      );
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getRevenueThisWeek: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.THIS_WEEK_REVENUE);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getTotalTicketUsedToday: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.TOTAL_TICKET_USED_TODAY);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getTotalTicketBookingToday: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.TOTAL_TICKET_BOOKING_TODAY);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  countTotalUsers: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.TOTAL_USERS);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
  getTicketSoldThisWeek: async () => {
    try {
      const res = await axiosInstance.get(STATISTIC.TICKET_SOLD_THIS_WEEK);
      return res.data;
    } catch (err) {
      console.log(err.message);
    }
  },
};

export default statisticApi;

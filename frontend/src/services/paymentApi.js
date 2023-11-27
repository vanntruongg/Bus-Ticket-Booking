import { PAYMENT } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const paymentApi = {
  createOrderPayment: async (amount) => {
    const res = await axiosInstance.post(PAYMENT.CREATE_ORDER, { amount });
    return res;
  },
};

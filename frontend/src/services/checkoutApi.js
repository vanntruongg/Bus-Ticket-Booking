import { PAYMENT } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

const checkOut = {
  createOrder: async (amount) => {
    const res = await axiosInstance.post(PAYMENT.CREATE_ORDER, {
      amount: amount,
    });
    window.location.href = res;
  },
};

export default checkOut;

import { USER } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const userApi = {
  resgister: async (data) => {
    try {
      const res = await axiosInstance.post(USER.RESGISTER, data);
      return res;
    } catch (error) {
      return error;
    }
  },
  forgotPassword: async (data) => {
    try {
      const res = await axiosInstance.post(
        USER.FORGOT_PASSWORD + `?email=${data.email}`,
      );
      return res;
    } catch (error) {
      return error;
    }
  },
  resetPassword: async (data) => {
    try {
      return await axiosInstance.post(USER.RESET_PASSWORD, data);
    } catch (error) {
      return error;
    }
  },
  getAllUser: async () => {
    try {
      return await axiosInstance.get(USER.GET_ALL_USER);
    } catch (error) {
      return error;
    }
  },
  createUser: async (data) => {
    return await axiosInstance.post(USER.CREATE_USER, data);
  },
  updateUser: async (data) => {
    return await axiosInstance.post(USER.UPDATE_USER, data);
  },
  updateUserByAdmin: async (data) => {
    return await axiosInstance.patch(USER.UPDATE_USER_BY_ADMIN, data);
  },
  deleteUser: async (email) => {
    return await axiosInstance.delete(USER.DELETE_USER + `/${email}`);
  },
  changePassword: async (data) => {
    return await axiosInstance.post(USER.CHANGE_PASSWORD, data);
  },
  sendFeedback: async (data) => {
    return await axiosInstance.post(USER.FEEDBACK, data);
  },
};

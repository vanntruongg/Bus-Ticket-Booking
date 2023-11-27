import axiosInstance from './axiosInstance';
import { AUTH_ENDPOINT, USER } from '../constants/ApiEndpoint';
import { AuthConstant } from '@/constants/commonConstant';

export const HandleLogout = () => {
  return logout;
};

const authApi = {
  login: async (credentials) => {
    const res = await axiosInstance.post(AUTH_ENDPOINT.LOGIN, credentials);
    return res.data;
  },
  logout: async () => {
    // call API logout trước, vì cần token
    const res = await axiosInstance.post(AUTH_ENDPOINT.LOGOUT);
    localStorage.removeItem(AuthConstant.ACCESS_TOKEN);
    localStorage.removeItem(AuthConstant.REFRESH_TOKEN);
    // console.log('res logout: ', res);
    return res?.data;
  },
  getUser: async () => {
    const res = await axiosInstance.get(USER.GET_USER);
    return res.data;
  },
};
export default authApi;

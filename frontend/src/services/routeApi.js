import { ROUTE } from '@/constants/ApiEndpoint';
import axiosInstance from './axiosInstance';

export const routeApi = {
  getAll: async () => {
    const res = await axiosInstance.get(ROUTE.GET_ALL);
    return res.data;
  },
  getALLRouteByOrigin: async (origin) => {
    const res = await axiosInstance.get(ROUTE.GET_ALL + `/${origin}`);
    return res.data;
  },
  getAllRoute: async () => {
    const res = await axiosInstance.get(ROUTE.GET_ALL_GROUP_BY);
    return res.data;
  },
  createRoute: async (route) => {
    return await axiosInstance.post(ROUTE.CREATE_ROUTE, route);
  },
  updateRoute: async (route) => {
    return await axiosInstance.patch(ROUTE.UPDATE_ROUTE, route);
  },
  deleteRoute: async (routeId) => {
    return await axiosInstance.patch(ROUTE.DELETE_ROUTE + `/${routeId}`);
  },
};

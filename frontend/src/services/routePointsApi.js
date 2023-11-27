import axiosInstance from './axiosInstance';

export const routePointsApi = {
  getAllByTRipId: async (tripId) => {
    const res = await axiosInstance.get(`/route-point/trip/${tripId}`);
    return res.data;
  },
};

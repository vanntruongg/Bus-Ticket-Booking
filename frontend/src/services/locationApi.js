import axiosInstance from '@/services/axiosInstance';
import { LOCATION } from '@/constants/ApiEndpoint';

const locationApi = {
  getAllProvince: async () => {
    try {
      return await axiosInstance.get(LOCATION.LOCATION_GET_ALL);
    } catch (error) {
      console.log(error);
    }
  },
  getByCode: async (locationCode) => {
    try {
      return await axiosInstance.get(
        `${LOCATION.LOCATION_GET_BY_CODE}/${locationCode}`,
      );
    } catch (error) {
      console.log(error);
    }
  },
};

export default locationApi;

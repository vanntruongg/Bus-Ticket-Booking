import axios from 'axios';
import authApi from './authApi';
import jwtDecode from 'jwt-decode';
import { AUTH_ENDPOINT } from '@/constants/ApiEndpoint';
import { AuthConstant } from '@/constants/commonConstant';
import { store } from '@/redux/store';
import { setSessionExpired } from '@/redux/sessionExpiredSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/obtbms',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAccessToken = (token) => {
  localStorage.setItem(AuthConstant.ACCESS_TOKEN, token);
};

export const setRefreshToken = (token) => {
  localStorage.setItem(AuthConstant.REFRESH_TOKEN, token);
};
export const getAccessToken = () => {
  return localStorage.getItem(AuthConstant.ACCESS_TOKEN);
};

export const getRefreshToken = () => {
  return localStorage.getItem(AuthConstant.REFRESH_TOKEN);
};
const validateToken = (token) => {
  const nowInSeconds = new Date().getTime() / 1000;
  const decodedToken = jwtDecode(token);
  return decodedToken.exp > nowInSeconds;
};
const handleRefreshToken = async () => {
  const refreshToken = getRefreshToken();

  // if (!refreshToken) {
  //   // Handle the case where refreshToken is missing
  //   await authApi.logout();
  //   store.dispatch(setSessionExpired(true));
  //   console.log('RefreshToken is missing. Logged out.');
  //   return Promise.resolve('RefreshToken is missing & Logged out');
  // }

  if (refreshToken && !validateToken(refreshToken)) {
    // Handle the case where refreshToken is invalid
    await authApi.logout();
    store.dispatch(setSessionExpired(true));
    console.log('RefreshToken is invalid. Logged out.');
    return Promise.resolve('RefreshToken is invalid & Logged out');
  }

  try {
    // Thực hiện logic refresh token ở đây
    const res = await axios.post(
      `http://localhost:8080/obtbms/${AUTH_ENDPOINT.REFRESH_TOKEN}`,
      {
        refreshToken: refreshToken,
      },
    );
    const newAccessToken = res.data.data.accessToken;
    // console.log('newAccessToken: ', newAccessToken);
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    // Xử lý lỗi khi không thể refresh token
    authApi.logout();
    return Promise.reject(error);
  }
};

let isRefreshing = false;

axiosInstance.interceptors.request.use(async (config) => {
  const token = getAccessToken();
  if (token && config.url) {
    if (!validateToken(token)) {
      // console.log('Vào refreshToken 1');
      if (!isRefreshing) {
        isRefreshing = true;
        // console.log('Vào refreshToken 2');
        return handleRefreshToken()
          .then((newAccessToken) => {
            // console.log('Đã refreshToken ở request');
            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return config;
          })
          .catch((error) => {
            authApi.logout();
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    } else {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      // console.log('error.response: ', error.response);
      // console.log('error.response.status: ', error.response.status);
      // console.log(
      //   'error.response.status === 401: ',
      //   error.response.status === 401,
      // );
      if (error.response.data.message === 'Bad credentials') {
        return error.response;
      } else {
        // Handle 401 Unauthorized error, possibly by refreshing the token
        // const newAccessToken = await handleRefreshToken();
        await handleRefreshToken();
        // console.log('Đã refreshToken ở response');
        // error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

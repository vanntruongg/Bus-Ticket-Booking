import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from '../services/authApi';
import { setAccessToken, setRefreshToken } from '@/services/axiosInstance';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkApi) => {
    const res = await authApi.login(credentials);
    if (res.accessToken && res.refreshToken) {
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      return res;
    }
    return res;
  },
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (params, thunkApi) => {
    const currentUser = await authApi.getUser();
    return currentUser;
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    isLoading: false,
    error: '',
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoggedIn = false;
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const {
  setCurrentUser,
  setIsLoggedIn,
  loginPending,
  loginSuccess,
  loginFailed,
} = authSlice.actions;
export default authSlice.reducer;

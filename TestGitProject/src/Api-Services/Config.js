export const BASE_URL = 'https://customer-api.5serv.com/api/v1';
// export const LIVE_IMAGE_URL = 'https://keeraikadai.shrewdbs.com/api/v1';
// export const BASE_URL = 'https://dev-customer-api.5serv.com/api/v1';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dayjs from 'dayjs';
import jwt_decode from 'jwt-decode';

export const axiosInstanceWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${AsyncStorage.getItem('userToken')}`,
  },
});

axiosInstanceWithAuth.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('userToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  const decoded = jwt_decode(token);
  const currentTime = dayjs().unix();
  if (decoded.exp > currentTime) {
    return config;
  }
  if (decoded.exp < currentTime) {
    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refreshToken: refreshToken,
    });

    AsyncStorage.setItem('userToken', response.data.data.accessToken);
    AsyncStorage.setItem('refreshToken', response.data.data.refreshToken);
    config.headers.Authorization = `Bearer ${response.data.data.accessToken}`;
  }
  return config;
});

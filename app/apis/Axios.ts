import Axios, {InternalAxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'https://k11a402.p.ssafy.io/api';

const axios = Axios.create({
  baseURL: url,
});

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

const renewToken = async (): Promise<TokenResponse | void> => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) return;

  const response: AxiosResponse<{result: TokenResponse}> = await axios.post(
    '/auth/refresh',
    {refreshToken},
  );

  if (response.status !== 200) {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    return Promise.reject(response);
  }
  return response.data.result;
};

axios.interceptors.request.use(
  async (request: InternalAxiosRequestConfig) => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    // headers가 undefined일 수 있으므로 빈 객체 할당
    request.headers = request.headers || {};

    if (request.url !== '/auth/logout' && request.url?.includes('/auth')) {
      return request;
    }

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
      const newTokens = await renewToken();
      if (newTokens) {
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
          newTokens;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        request.headers.Authorization = `Bearer ${newAccessToken}`;
      }
    }
    return request;
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    const originalRequest = error.config;
    if (
      originalRequest.url !== '/auth/logout' &&
      originalRequest.url?.includes('/auth')
    ) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newTokens = await renewToken();
      if (newTokens) {
        const {accessToken: newAccessToken, refreshToken: newRefreshToken} =
          newTokens;
        await AsyncStorage.setItem('accessToken', newAccessToken);
        await AsyncStorage.setItem('refreshToken', newRefreshToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  },
);

export default axios;

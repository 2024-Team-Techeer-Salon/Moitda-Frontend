/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { getCookie, setCookie } from '@/app/cookies.tsx';

const accessToken = getCookie('accessToken');
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

const reIssuedToken = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/reissue`,
      {
        access_token: getCookie('accessToken'),
        refresh_token: getCookie('refreshToken'),
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true, // CORS 요청 시 쿠키를 포함
      },
    );
    if (response.data.data.access_token) {
      setCookie('accessToken', response.data.data.access_token);
    }
    if (response.data.data.refresh_token) {
      setCookie('refreshToken', response.data.data.refresh_token);
    }
    return response.data;
  } catch (error) {
    throw new Error('토큰 재발급 로직 에러 : ', error || '');
  }
};

const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

api.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 반환
  async (error) => {
    if (accessToken !== undefined) {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // 재요청 플래그를 설정하여 무한 루프 방지
        try {
          const data = await reIssuedToken(); // 토큰 재발급 함수 호출
          // 재발급 받은 토큰으로 요청 헤더 설정
          api.defaults.headers.common.Authorization = `Bearer ${data.data.access_token}`;
          originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;

          return api(originalRequest); // 원래 요청 재시도
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  },
);

export { api };

export const formApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
});

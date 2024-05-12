/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCookie } from '@/app/cookies.tsx';

const accessToken = getCookie('accessToken');
console.log('accessToken : ', accessToken);

// const BASE_URL = '/api/v1'; // 배포용
const BASE_URL = 'http://localhost:8080/api/v1'; // 개발용
export const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

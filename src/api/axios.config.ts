/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCookie } from '@/app/cookies.tsx';

const accessToken = getCookie('accessToken');
console.log('accessToken : ', accessToken);

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(BASE_URL);
export const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

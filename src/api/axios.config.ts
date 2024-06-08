/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCookie } from '@/app/cookies.tsx';

const accessToken = getCookie('accessToken');
const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1`;

export const api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL, // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export const formApi = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${accessToken}`,
  },
});

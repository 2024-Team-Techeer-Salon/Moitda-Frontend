/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { api } from './axios.config.ts';

export async function sample() {
  try {
    const response = await api.get('http://localhost:8080/api/v1/users/1');
    return response.data;
  } catch (error: any) {
    console.error('sample error : ', error.response.config.url);
  }
}

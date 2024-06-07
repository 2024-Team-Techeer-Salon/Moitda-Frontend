/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */
import { api } from './axios.config.ts';

export async function profileCheck() {
  try {
    const response = await api.get('/users/${userId}');
    return response.data;
  } catch (error) {
    console.error('sample error : ', error);
  }
}

export async function bannerCheck() {
  try {
    const response = await api.get('/users/${userId}');
    return response.data;
  } catch (error) {
    console.error('sample error : ', error);
  }
}

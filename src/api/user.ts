/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { api } from './axios.config.ts';

export async function signupUserInfo(
  username: string,
  dateOfBirth: string,
  gender: string,
  location: string,
) {
  try {
    const response = await api.post('/users', {
      username,
      date_of_birth: dateOfBirth,
      gender,
      location,
    });
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

export async function getUserId() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

export async function getUserInfo({ userId }: { userId: number }) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

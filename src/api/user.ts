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
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

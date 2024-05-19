/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { getCookie } from '@/app/cookies.tsx';
import { api } from './axios.config.ts';

// users 함수가 userData를 인자로 받을 수 있도록 수정
// export async function signupUserInfo(
//   username: string,
//   dateOfBirth: string,
//   gender: string,
//   location: string,
// ) {
//   try {
//     const response = await api.post('http://localhost:8080/api/v1/users', {
//       username: username,
//       data_of_birth: dateOfBirth
//       gender: gender,
//       location: location,
//     });
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error('users error 제발좀 되라: ', error);
//   }
// }

export async function signupUserInfo(
  username: string,
  dateOfBirth: string,
  gender: string,
  location: string,
) {
  try {
    const accessToken = await getCookie('accessToken');
    const response = await axios.post(
      'http://localhost:8080/api/v1/users',
      {
        username,
        date_of_birth: dateOfBirth,
        gender,
        location,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
    console.log('');
  }
}

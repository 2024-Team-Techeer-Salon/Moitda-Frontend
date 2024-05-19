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

// export async function signupUserInfo(
//   username: string,
//   dateOfBirth: string,
//   gender: string,
//   location: string,
// ) {
//   try {
//     const accessToken = await getCookie('accessToken');
//     const response = await axios.post(
//       'http://localhost:8080/api/v1/users',
//       {
//         username,
//         date_of_birth: dateOfBirth,
//         gender,
//         location,
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error: any) {
//     console.error('users error : ', error.response);
//     console.log('');
//   }
// }

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

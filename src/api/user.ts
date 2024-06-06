/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { api, formApi } from './axios.config.ts';

// 회원가입시 정보 입력
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

// 유저 정보 조회(마이페이지)
export async function getUserInfo(userId: number) {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

// 유저 정보 수정
export async function putUserInfo(
  name: string,
  gender: string,
  statusMessage: string,
  location: string,
  profileUrl: string,
  bannerUrl: string,
  profileImage: File | null,
  bannerImage: File | null,
) {
  const formData = new FormData();
  formData.append(
    'updateUserReq',
    new Blob(
      [
        JSON.stringify({
          username: name,
          gender,
          introduce: statusMessage,
          location,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  if (profileImage !== null) {
    formData.append('profile_image_file', profileImage);
  } else if (profileImage === null && profileUrl !== '') {
    formData.append('profileUrl', profileUrl);
  }

  if (bannerImage !== null) {
    formData.append('banner_image_file', bannerImage);
  } else if (bannerImage === null && bannerUrl !== '') {
    formData.append('bannerUrl', bannerUrl);
  }

  try {
    const response = await formApi.put('/users', formData);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('users error : ', error.response);
  }
}

// 본인 ID 조회
export async function login() {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    console.error('Get User ID Error : ', error);
  }
}

// 로그아웃
export async function logout() {
  try {
    const response = await api.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Logout Error : ', error);
  }
}

// 참여한 모임 리스트 조회
export async function getMyMeetingList(
  tab: string,
  userId: number,
  end: boolean,
  page: number,
  size: number,
) {
  try {
    if (tab === 'joined') {
      const response = await api.get(
        `/users/${userId}/records/participated?end=${end}&page=${page}&size=${size}`,
      );
      return response.data;
    }
    if (tab === 'created') {
      const response = await api.get(
        `/users/${userId}/records/created?end=${end}&page=${page}&size=${size}`,
      );
      return response.data;
    }
  } catch (error) {
    console.error('Get Participant List Error : ', error);
  }
}

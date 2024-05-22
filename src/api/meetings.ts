/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */

import { formApi, api } from './axios.config.ts';

export const postMeetings = async (
  categoryId: number,
  title: string,
  editorHTML: string,
  placeName: string,
  roadAddressName: string,
  addressDetail: string,
  numPeople: number,
  needsApproval: boolean,
  meetingTime: string,
  images: File[],
) => {
  const formData = new FormData();
  formData.append(
    'createMeetingReq',
    new Blob(
      [
        JSON.stringify({
          category_id: categoryId,
          title,
          content: editorHTML,
          place_name: placeName,
          road_address_name: roadAddressName,
          detailed_address: addressDetail,
          max_participants_count: numPeople,
          approval_required: needsApproval,
          appointment_time: meetingTime,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  images.forEach((img) => {
    formData.append('meeting_images', img); // 'meeting_images' 배열 형태로 추가
  });
  try {
    const response = await formApi.post('/meetings', formData);
    return response.data;
  } catch (error) {
    console.error('postMeetings error : ', error);
  }
};

export const getMeetingList = async (page: number, size: number) => {
  try {
    const response = await api.get(`/meetings?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    console.error('Meeting List Get API Error : ', error);
  }
};

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

export const getMeetingsData = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data.data;
  } catch (error) {
    console.error('meeting data get api request error : ', error);
  }
};

export const postMeetingJoin = async (meetingId: number) => {
  try {
    const response = await api.post(`/meetings/participant/${meetingId}`);
    return response.data;
  } catch (error) {
    console.error('meeting join api request error : ', error);
  }
};

export const patchEndMeeting = async (meetingId: number) => {
  try {
    const response = await api.patch(`/meetings/end/${meetingId}`);
    return response.data;
  } catch (error) {
    console.error('meeting end api request error : ', error);
  }
};

export const deleteMeeting = async (meetingId: number) => {
  try {
    const response = await api.delete(`/meetings/${meetingId}`);
    return response.data;
  } catch (error) {
    console.error('meeting delete api request error : ', error);
  }
};

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
    const response = await api.get(
      `/meetings/search/latest?page=${page}&size=${size}`,
    );
    console.log('response.data : ', response.data);
    return response.data;
  } catch (error) {
    console.error('Meeting List Get API Error : ', error);
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

export const editMeeting = async (
  meetingId: number,
  categoryId: number,
  title: string,
  editorHTML: string,
  placeName: string,
  roadAddressName: string,
  addressDetail: string,
  numPeople: number,
  meetingTime: string,
) => {
  try {
    const response = await api.put(`/meetings/${meetingId}`, {
      category_id: categoryId,
      title,
      content: editorHTML,
      place_name: placeName,
      road_address_name: roadAddressName,
      detailed_address: addressDetail,
      max_participants_count: numPeople,
      appointment_time: meetingTime,
    });
    return response.data;
  } catch (error) {
    console.error('meeting edit api request error : ', error);
  }
};

export const getMeetingApplicants = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/${meetingId}/participants`);
    return response.data.data;
  } catch (error) {
    console.error('meeting applicants get api request error : ', error);
  }
};

export const patchMeetingApproval = async (
  participantId: number,
  meetingId: number,
  isApproval: boolean,
) => {
  try {
    const response = await api.patch('/meetings/participant', {
      participant_id: participantId,
      meeting_id: meetingId,
      is_approval: isApproval,
    });
    return response.data;
  } catch (error) {
    console.error('meeting approval patch api request error : ', error);
  }
};

/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import build from 'next/dist/build/index';
import { formApi, api } from './axios.config.ts';

export const postMeetings = async (
  title: string,
  categoryId: number,
  editorHTML: string,
  buildingName: string,
  address: string,
  addressDetail: string,
  numPeople: number,
  needsApproval: boolean,
  meetingTime: string,
  image: File[],
) => {
  const formData = new FormData();
  formData.append(
    'meetingsInfo',
    new Blob(
      [
        JSON.stringify({
          category_id: categoryId,
          title,
          content: editorHTML,
          building_name: buildingName,
          address,
          address_detail: addressDetail,
          max_participants_count: numPeople,
          approval_required: needsApproval,
          appointment_time: meetingTime,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  image.forEach((img, index) => {
    formData.append(`meeting_image_${index}`, img);
  });
  try {
    const response = await formApi.post('/meetings', formData);
    return response.data;
  } catch (error) {
    console.error('postMeetings error : ', error);
  }
};

/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import { formApi, api } from './axios.config.ts';

export const postMeetings = async (
  categoryId: number,
  title: string,
  content: string,
  buildingName: string,
  address: string,
  numPeople: number,
  joinImmediately: boolean,
  meetingTime: string,
  image: File[],
) => {
  const formData = new FormData();
  formData.append(
    'meetingsInfo',
    new Blob(
      [
        JSON.stringify({
          categoryId,
          title,
          content,
          buildingName,
          address,
          numPeople,
          joinImmediately,
          meetingTime,
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

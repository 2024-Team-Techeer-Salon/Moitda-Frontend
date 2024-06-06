/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { api } from './axios.config';

export const searchMeetings = async (
  latitude: number,
  longitude: number,
  page: number,
  size: number,
  sort: any,
) => {
  try {
    const response = await api.get(
      `/meetings/search/?latitude=${latitude}&longitude=${longitude}&page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data;
  } catch (error) {
    console.error('searchMeetings error:', error);
  }
};

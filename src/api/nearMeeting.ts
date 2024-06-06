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
  const headers = {
    'Content-Type': 'application/json',
  };

  const pageable = {
    page,
    size,
    sort,
  };

  try {
    const response = await api.get('/api/v1/meetings/search/', {
      headers,
      params: {
        latitude,
        longitude,
        pageable,
      },
    });
    return response.data;
  } catch (error) {
    console.error('searchMeetings error:', error);
  }
};

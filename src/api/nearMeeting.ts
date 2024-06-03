/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';

export const searchMeetings = async (
  latitude: string,
  longitude: string,
  page: string,
  size: string,
  sort: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await axios.get('/api/v1/meetings/search/', {
      headers,
      params: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        'pageable.page': page,
        'pageable.size': size,
        'pageable.sort': sort,
      },
    });
    return response.data;
  } catch (error) {
    console.error('searchMeetings error:', error);
  }
};

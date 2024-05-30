/* eslint-disable no-console */
/* eslint-disable consistent-return */
import axios from 'axios';
import { api } from './axios.config.ts';

export const searchMeetings = async (
  latitude: number,
  longitude: number,
  page: number,
  size: number,
  sort: string,
) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  const body = {
    latitude,
    longitude,
    pageable: {
      page,
      size,
      sort,
    },
  };

  try {
    const response = await axios.get('/api/v1/meetings/search/', {
      headers,
      body,
    });
    return response.data;
  } catch (error) {
    console.error('searchMeetings error:', error);
  }
};

export const findnearMeetings = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data.data;
  } catch (error) {
    console.error('meeting data get api request error : ', error);
  }
};

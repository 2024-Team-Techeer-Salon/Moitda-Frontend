/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */

import { api } from './axios.config.ts';

export const chatlists = async (
  room_id: number,
  page: number,
  size: number,
) => {
  try {
    const response = await api.get(
      `/chattings/rooms/chatlists/room_id=${room_id}?&page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    console.error('sample error : ', error);
  }
};

export const deleteChat = async (chatId: number) => {
  try {
    const response = await api.delete(`chattings/rooms/${chatId}`);
    return response.data;
  } catch (error) {
    throw new Error('chat delete api request error : ', error || '');
  }
};

export const getChats = async (meetingId: number) => {
  try {
    const response = await api.get(`/chats/${meetingId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('chat get api request error : ', error || '');
  }
};

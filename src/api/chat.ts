/* eslint-disable camelcase */
/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable no-console */

import { api } from './axios.config';

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

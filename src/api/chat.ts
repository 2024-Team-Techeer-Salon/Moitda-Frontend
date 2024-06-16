import { api } from './axios.config.ts';

export const deleteChat = async (chatId: number) => {
  try {
    const response = await api.delete(`chattings/rooms/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('chat delete api request error : ', error);
    throw error;
  }
};

export const getChats = async (meetingId: number) => {
  try {
    const response = await api.get(`/chats/${meetingId}`);
    return response.data.data;
  } catch (error) {
    console.error('chat get api request error : ', error);
    throw error;
  }
};

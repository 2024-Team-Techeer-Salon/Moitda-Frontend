import { api } from './axios.config.ts';

const searchMeetings = async (
  latitude: number,
  longitude: number,
  page: number,
  size: number,
  sort: string,
) => {
  try {
    const response = await api.get(
      `/meetings/search/?latitude=${latitude}&longitude=${longitude}&page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('meeting search api request error : ', error || '');
  }
};

export default searchMeetings;

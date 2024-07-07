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
    throw new Error('주변 모임 검색 에러 : ', error || '');
  }
};

export default searchMeetings;

import { api } from './axios.config.ts';
import { nearMeetingProps } from '@/types/meeting.ts';

export const getSearchData = async (
  searchType: string,
  searchKeyword: string,
  lat: number,
  lng: number,
  page: number,
  size: number,
) => {
  try {
    if (searchType === 'category') {
      const response = await api.get(
        `/meetings/search/category/${searchKeyword}?latitude=${lat}&longitude=${lng}&page=${page}&size=${size}&sort=create_at`,
      );
      return response.data.data;
    }
    const response = await api.get(
      `/meetings/search/${searchKeyword}?page=${page}&size=${size}&latitude=${lat}&longitude=${lng}&sort=create_at`,
    );
    return response.data.data;
  } catch (error) {
    throw new Error('search api request error : ', error || '');
  }
};

export const searchMeetings = async ({
  latitude,
  longitude,
  page,
  size,
  sort,
}: nearMeetingProps) => {
  try {
    const response = await api.get(
      `/meetings/search/?latitude=${latitude}&longitude=${longitude}&page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('주변 모임 검색 에러 : ', error || '');
  }
};

// 모든 모임 리스트 조회
export const getAllMeetings = async ({
  latitude,
  longitude,
  page,
  size,
  sort,
}: nearMeetingProps) => {
  try {
    const response = await api.get(
      `/meetings/search/all?latitude=${latitude}&longitude=${longitude}&page=${page}&size=${size}&sort=${sort}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('all meeting list get api request error : ', error || '');
  }
};

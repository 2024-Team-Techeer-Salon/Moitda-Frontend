import { api } from './axios.config.ts';

const getSearchData = async (
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

export default getSearchData;

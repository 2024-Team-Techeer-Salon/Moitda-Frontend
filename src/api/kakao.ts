import axios from 'axios';

export default async function searchAddress(
  keyword: string,
  lat: number,
  lng: number,
  page: number,
  size: number,
) {
  if (!keyword) {
    return null;
  }
  try {
    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/keyword.json',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
        params: {
          query: keyword,
          x: lng,
          y: lat,
          page,
          size,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error('kakao search address api request error : ', error || '');
  }
}

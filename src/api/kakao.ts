/* eslint-disable import/prefer-default-export */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
import axios from 'axios';

export async function searchAddress(
  keyword: string,
  lat: number,
  lng: number,
  page: number,
  size: number,
) {
  if (!keyword) {
    return;
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
    console.log('searchAddress response : ', response.data);
    return response.data;
  } catch (error) {
    console.error('searchAddress error : ', error);
  }
}

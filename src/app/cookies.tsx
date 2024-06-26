/* eslint-disable implicit-arrow-linebreak */
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// 쿠키를 저장함
export const setCookie = (name: string, value: string) => {
  cookies.set(name, value);
};

// 쿠키를 가져옴
export const getCookie = (name: string) => cookies.get(name);

// 쿠키를 삭제함
export const removeCookie = (name: string) => cookies.remove(name);

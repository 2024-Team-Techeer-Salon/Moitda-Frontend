/* eslint-disable implicit-arrow-linebreak */
import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';

const cookies = new Cookies();

// 쿠키를 저장함
export const setCookie = (
  name: string,
  value: string,
  option: CookieSetOptions,
) => {
  cookies.set(name, value, { ...option });
};

// 쿠키를 가져옴
export const getCookie = (name: string) => cookies.get(name);

// 쿠키를 삭제함
export const removeCookie = (name: string, option: CookieSetOptions) =>
  cookies.remove(name, { ...option });

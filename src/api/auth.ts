/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */

export function GoogleLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
  } catch (error) {
    console.error('구글 로그인 에러 : ', error);
  }
}

export function KakaoLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
  } catch (error) {
    console.error('카카오 로그인 에러 : ', error);
  }
}

export function NaverLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/naver`;
  } catch (error) {
    console.error('네이버 로그인 에러 : ', error);
  }
}

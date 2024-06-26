export function GoogleLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/google`;
  } catch (error) {
    throw new Error('구글 로그인 에러 : ', error || '');
  }
}

export function KakaoLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/kakao`;
  } catch (error) {
    throw new Error('카카오 로그인 에러 : ', error || '');
  }
}

export function NaverLogin() {
  try {
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/oauth2/authorization/naver`;
  } catch (error) {
    throw new Error('네이버 로그인 에러 : ', error || '');
  }
}

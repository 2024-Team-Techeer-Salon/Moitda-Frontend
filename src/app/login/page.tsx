/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable prefer-destructuring */
/* eslint-disable lines-around-directive */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Montserrat } from 'next/font/google';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import { GoogleLogin } from 'react-google-login';
import axios, { AxiosError } from 'axios';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function page() {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(['token']);
  const [error, setError] = useState<string | null>(null);

  // 구글 로그인 성공시 처리
  const responseGoogle = async (response: { tokenId: any }) => {
    try {
      const tokenId = response.tokenId; // 구글에서 받은 tokenId

      // tokenId를 서버로 전송하여 토큰 발급 요청
      const res = await axios.post('http://localhost:8080/login', { tokenId });

      // 토큰을 쿠키에 저장
      setCookie('token', res.data.token, { path: '/' });

      // 홈페이지로 리다이렉트 또는 다른 작업 수행
      router.push('/');
    } catch (err) {
      // 에러 객체의 형식을 AxiosError로 명시하여 사용
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        // 서버에서 응답을 받은 경우 (상태 코드가 응답되었으나 2xx 코드가 아닌 경우)
        setError(axiosError.response.data.message);
      } else if (axiosError.request) {
        // 요청을 보냈으나 응답이 없는 경우
        setError('서버로부터 응답이 없습니다.');
      } else {
        // 요청을 보내기 전에 에러가 발생한 경우
        setError('요청을 보내는 중 에러가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className={`mt-28 text-center text-8xl ${mont.className}`}>MOITDA</h1>
      <div className="mt-4 flex items-center">
        <div className="w-40 border-b border-gray-300"></div>
        <p className="mx-4 text-center text-gray-300">소셜 로그인</p>
        <div className="w-40 border-b border-gray-300"></div>
      </div>
      <button className="relative mt-12 h-16 w-[26.5rem] border border-[#C7C7C7]">
        <img
          src="https://i.ibb.co/vLCS9bV/images.png"
          className="center no-repeat ml-5 h-6 w-5"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            Apple로 시작하기
          </div>
        </div>
      </button>
      <button className="relative mt-4 h-16 w-[26.5rem] border border-[#C7C7C7]">
        <img
          src="https://i.ibb.co/5cHq8gJ/images-1.png"
          className="center no-repeat ml-5 h-6 w-6"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          {error && <p>{error}</p>}
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            buttonText="Google로 시작하기"
            onSuccess={responseGoogle}
            onFailure={responseGoogle} // 실패 시에도 같은 핸들러 호출
            cookiePolicy={'single_host_origin'}
          />
          {/* <div className="flex items-center justify-center">
            Google로 시작하기
          </div> */}
        </div>
      </button>
      <button className="relative mt-4 h-16 w-[26.5rem] border border-[#FFE812] bg-[#FFE812]">
        <img
          src="https://i.ibb.co/X4hFqqV/2024-04-30-5-48-05.png"
          className="center no-repeat ml-4 h-8 w-8"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            카카오로 시작하기
          </div>
        </div>
      </button>
      <button className="relative mt-4 h-16 w-[26.5rem] border border-[#00D05C] bg-[#00D05C]">
        <img
          src="https://i.ibb.co/mzHwht8/2024-04-30-5-49-44.png"
          className="center no-repeat ml-4 h-8 w-8"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center text-white">
            네이버로 시작하기
          </div>
        </div>
      </button>
    </div>
  );
}

export default page;

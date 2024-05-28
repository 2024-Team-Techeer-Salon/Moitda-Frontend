/* eslint-disable @next/next/no-img-element */

'use client';

import { NaverLogin } from '@/api/auth.ts';

function Naver() {
  return (
    <div>
      <button
        onClick={NaverLogin}
        className="relative mt-4 h-12 w-[16rem] border border-[#04CF5E] bg-[#04CF5E] sm:h-12 sm:w-[16rem] lg:h-16 lg:w-[26.5rem]"
      >
        <img
          src="https://i.ibb.co/mzHwht8/2024-04-30-5-49-44.png"
          className="center no-repeat ml-4 h-8 w-8"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center text-sm text-white sm:text-sm lg:text-lg">
            네이버로 시작하기
          </div>
        </div>
      </button>
    </div>
  );
}

export default Naver;

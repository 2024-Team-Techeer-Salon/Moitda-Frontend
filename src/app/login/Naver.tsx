/* eslint-disable @next/next/no-img-element */

'use client';

import { NaverLogin } from '@/api/auth.ts';

function Naver() {
  return (
    <div>
      <button
        onClick={NaverLogin}
        className="relative mt-4 h-16 w-[26.5rem] border border-[#C7C7C7]"
      >
        <img
          src="https://i.ibb.co/mzHwht8/2024-04-30-5-49-44.png"
          className="center no-repeat ml-4 h-8 w-8"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            네이버로 시작하기
          </div>
        </div>
      </button>
    </div>
  );
}

export default Naver;

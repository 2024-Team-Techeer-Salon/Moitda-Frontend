/* eslint-disable @next/next/no-img-element */

'use client';

import { GoogleLogin } from '@/api/auth.ts';

function Google() {
  return (
    <div>
      <button
        onClick={GoogleLogin}
        className="relative mt-4 h-16 w-[26.5rem] border border-[#C7C7C7]"
      >
        <img
          src="https://i.ibb.co/5cHq8gJ/images-1.png"
          className="center no-repeat ml-5 h-6 w-6"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            Google로 시작하기
          </div>
        </div>
      </button>
    </div>
  );
}

export default Google;

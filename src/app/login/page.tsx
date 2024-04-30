/* eslint-disable lines-around-directive */
/* eslint-disable @next/next/no-img-element */
'use client';

import { Montserrat } from 'next/font/google';
import React from 'react';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className={`text-8xl text-center mt-28 ${mont.className}`}>MOITDA</h1>
      <div className="flex items-center mt-4">
        <div className="w-40 border-b border-gray-300"></div>
        <p className="text-center mx-4 text-gray-300">소셜 로그인</p>
        <div className="w-40 border-b border-gray-300"></div>
      </div>
      <button className="relative mt-12 border border-[#C7C7C7] w-[26.5rem] h-16">
        <img
          src="https://i.ibb.co/vLCS9bV/images.png"
          className="w-5 h-6 ml-5 center no-repeat"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            Apple로 시작하기
          </div>
        </div>
      </button>
      <button className="relative mt-4 border border-[#C7C7C7] w-[26.5rem] h-16">
        <img
          src="https://i.ibb.co/5cHq8gJ/images-1.png"
          className="w-6 h-6 ml-5 center no-repeat"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            Google로 시작하기
          </div>
        </div>
      </button>
      <button className="relative mt-4 bg-[#FFE812] border border-[#FFE812] w-[26.5rem] h-16">
        <img
          src="https://i.ibb.co/X4hFqqV/2024-04-30-5-48-05.png"
          className="w-8 h-8 ml-4 center no-repeat"
          alt="이미지"
        ></img>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center">
            카카오로 시작하기
          </div>
        </div>
      </button>
      <button className="relative mt-4 bg-[#00D05C] border border-[#00D05C] w-[26.5rem] h-16">
        <img
          src="https://i.ibb.co/mzHwht8/2024-04-30-5-49-44.png"
          className="w-8 h-8 ml-4 center no-repeat"
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

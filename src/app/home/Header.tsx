/* eslint-disable @next/next/no-img-element */
// 메인 페이지 홈 헤더 컴포넌트

'use client';

import { useState } from 'react';

function Banner() {
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex] = useState(4);

  return (
    <div className="relative flex h-52 w-full flex-row items-center justify-center overflow-hidden bg-black opacity-90 sm:h-72 lg:h-96">
      <img
        src="https://i.ibb.co/wL61Zx5/home-Image.png"
        alt="home-Image"
        className="absolute h-full w-full"
      />
      <div className="b 0 z-0 flex h-full w-1/6 items-center justify-center"></div>
      <div className="z-0 flex h-full w-4/6 flex-col justify-center">
        <div>
          <p className="text-2xl text-white lg:text-5xl">모임을 만들고</p>
          <p className="text-2xl font-bold text-white lg:mt-2 lg:text-5xl">
            잇다
          </p>
        </div>
        <p className="mt-2 text-base text-white lg:mt-4 lg:text-2xl">
          간편 만남 서비스, <span className="font-bold">모잇다</span>
        </p>
      </div>
      <div className="z-0 flex h-full w-1/6 items-center justify-center"></div>
    </div>
  );
}

export default Banner;

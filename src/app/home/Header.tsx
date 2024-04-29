/* eslint-disable @next/next/no-img-element */
// 메인 페이지 홈 헤더 컴포넌트

'use client';

import { useState } from 'react';

function Header() {
  const [pageIndex, setPageIndex] = useState(1);
  const [maxPageIndex] = useState(4);

  const handleForwardClick = () => {
    if (pageIndex < maxPageIndex) {
      setPageIndex(pageIndex + 1);
    }
  };

  const handleBackwardClick = () => {
    if (pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    }
  };

  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center overflow-hidden bg-black opacity-90">
      <img
        src="https://i.ibb.co/wL61Zx5/home-Image.png"
        alt="home-Image"
        className="absolute w-full"
      />
      <div className="z-0 flex h-full w-1/6 items-center justify-center">
        <button
          className="btn btn-circle border-none bg-black bg-opacity-20 text-white hover:bg-zinc-800"
          onClick={handleBackwardClick}
        >
          <svg
            className="h-6 w-6 rotate-180 transform"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="z-0 flex h-full w-4/6 flex-col justify-center">
        <p className="p-2 text-4xl text-white">모임을 만들고</p>
        <p className="p-2 text-4xl font-bold text-white">잇다</p>
        <p className="p-2 text-2xl text-white">
          간편 만남 서비스, <span className="font-bold">모잇다</span>
        </p>
      </div>
      <div className="z-0 flex h-full w-1/6 items-center justify-center">
        <button
          className="btn btn-circle border-none bg-black bg-opacity-20 text-white hover:bg-zinc-800"
          onClick={handleForwardClick}
        >
          <svg className="h-6 w-6 transform" fill="none" stroke="currentColor">
            <path strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Header;

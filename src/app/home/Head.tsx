/* eslint-disable @next/next/no-img-element */
// 메인 페이지 홈 헤더 컴포넌트

'use client';

import { useState } from 'react';

function HomeHeaderComponent() {
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
    <div className="flex flex-row w-full h-96 justify-center items-center bg-black opacity-90 relative overflow-hidden">
      <img
        src="https://i.ibb.co/wL61Zx5/home-Image.png"
        alt="home-Image"
        className="w-full absolute"
      />
      <div className="flex w-1/6 h-full justify-center items-center z-0">
        <button
          className="btn btn-circle bg-black bg-opacity-20 text-white border-none hover:bg-zinc-800"
          onClick={handleBackwardClick}
        >
          <svg
            className="h-6 w-6 transform rotate-180"
            fill="none"
            stroke="currentColor"
          >
            <path strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col w-4/6 h-full justify-center z-0">
        <p className="text-white text-4xl p-2">모임을 만들고</p>
        <p className="text-white text-4xl font-bold p-2">잇다</p>
        <p className="text-white text-2xl p-2">
          간편 만남 서비스, <span className="font-bold">모잇다</span>
        </p>
      </div>
      <div className="flex w-1/6 h-full justify-center items-center z-0">
        <button
          className="btn btn-circle bg-black bg-opacity-20 text-white border-none hover:bg-zinc-800"
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

export default HomeHeaderComponent;

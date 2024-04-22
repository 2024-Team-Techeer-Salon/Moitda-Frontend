/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useState } from 'react';

function page() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-center items-center bg-blue-200 relative">
        <div className="w-full h-96 bg-zinc-200 flex justify-between items-center px-4">
          <button className="btn btn-circle bg-black bg-opacity-20 text-white border-none">
            <svg
              className="h-6 w-6 transform rotate-180"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button className="btn btn-circle bg-black bg-opacity-20 text-white border-none">
            <svg
              className="h-6 w-6 transform"
              fill="none"
              stroke="currentColor"
            >
              <path strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <h1 className="ml-8 mt-8 text-lg font-semibold">
            4월 9일 화요일 18:00
          </h1>
          <h1 className="ml-8 mt-2 text-2xl font-light">모각코 할사람?</h1>
          <h1 className="ml-8 mt-1 text-sm font-light">
            경기도 시흥시 정왕동 산기대학로 237
          </h1>
          <h1 className="ml-8 mt-2 text-sm font-light underline text-gray-400">
            지도보기
          </h1>
        </div>
        <div className="flex mt-8 w-1/2 mr-10 justify-end h-16">
          <details className="dropdown dropdown-bottom dropdown-end">
            <summary className="mt-1 btn btn-circle">
              {' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 bg-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {/* 추가된 부분: 점 세 개 */}
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                <circle cx="12" cy="18" r="1.5" fill="currentColor" />
              </svg>
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[10] bg-base-100 rounded-box w-52">
              <li>
                <a>수정하기</a>
              </li>
              <li>
                <a>모임완료</a>
              </li>
              <li>
                <a>모임삭제</a>
              </li>
            </ul>
          </details>
        </div>
      </div>

      <div className="flew flex-row w-full">
        <div className="flex items-center w-full">
          <div className="flex flex-row justify-start items-center w-5/6">
            <div className="w-14 h-14 rounded-full bg-pink-100 ml-8 mt-4"></div>
            <h1 className="ml-3 mt-4 text-medium font-light">안나경</h1>
            <div className="flex flex-col ml-20 mt-4">
              <div className="flex flex-row">
                <h1 className="text-sm font-light">매너스탯</h1>
                <h1 className="ml-24 text-sm font-semibold">A+</h1>
              </div>
              <progress
                className="progress w-40 h-1 mt-1"
                value="70"
                max="100"
              ></progress>
            </div>
          </div>
          <div className="flex flex-row justify-end items-center w-1/6 mr-12">
            <button className="bg-black w-32 h-10 rounded-md text-white">
              신청하기
            </button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer ml-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="ml-2 mr-4">10</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4 mx-8"></div>
      <div className="flex flex-row">
        <div className="ml-12 mt-6 mr-12 flex w-3/4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
          exercitationem architecto deleniti voluptatibus ratione rem rerum amet
          sit temporibus sed, aliquid, dolorum itaque hic quis dolorem fugit
          fuga repudiandae eveniet. Sint temporibus nihil repellendus ullam
          beatae! Voluptates minima quod minus enim voluptate quo ex, quisquam
          architecto accusantium impedit magnam optio ab qui. Sed odio fugiat,
          blanditiis esse veritatis cupiditate? Est voluptatem asperiores culpa
          impedit aperiam, aliquam dolorum eum sint quo alias, optio eaque
          illum, modi hic consequatur! Inventore dolorem corporis labore earum
          culpa magnam atque minima nulla, at cumque vel vero accusantium
          officiis tenetur nisi voluptatem id nam. Quam, voluptate!
        </div>
        <div className="ml-3 mt-4 flex flex-col w-1/4">
          <h1 className="text-medium font-semibold mt-2">참여 인원</h1>
          <div className="flex flex-col">
            <div className="flex items-center mt-2">
              <div className="w-14 h-14 rounded-full bg-pink-100 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">안나경</h1>
            </div>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">정유진</h1>
            </div>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">조진우</h1>
            </div>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">이상훈</h1>
            </div>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">윤주원</h1>
            </div>
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full bg-zinc-200 mt-3"></div>
              <h1 className="ml-3 mt-4 text-medium font-light">강정현</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;

/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable eol-last */
'use client';

import { Montserrat } from 'next/font/google';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const mont = Montserrat({ subsets: ['latin'], weight: ['400'] });

function page() {
  const today = dayjs();
  const [selectedTheme, setSelectedTheme] = useState<string>('지역 선택');
  const cityList = [
    '모든 지역',
    '서울',
    '경기',
    '인천',
    '강원',
    '대전/세종',
    '충남',
    '충북',
    '대구',
    '경북',
    '부산',
    '울산',
    '경남',
    '광주',
    '전남',
    '전북',
    '제주',
  ];
  const handleThemeChange = (event: any) => {
    setSelectedTheme(event.target.value);
  };

  // 상태 추가: 라디오 버튼의 선택 상태
  const [selectedRadio, setSelectedRadio] = useState('radio-1');

  // 라디오 버튼 선택 핸들러
  const handleRadioChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedRadio(event.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <div>
        <h1 className="mb-14 mt-20 flex flex-row text-3xl font-light">
          <p className={`text-center text-3xl ${mont.className}`}>MOITDA</p>에
          오신 것을 환영합니다!
        </h1>
      </div>
      <div className="ml-1">
        <div className="text-[#505050]">성별</div>
        <div className="mb-4 flex flex-row items-center">
          {/* 첫 번째 라디오 버튼 */}
          <p className="mr-1">남</p>
          <input
            type="radio"
            name="radio-1"
            className="radio mr-2 mt-1"
            value="radio-1"
            checked={selectedRadio === 'radio-1'}
            onChange={handleRadioChange}
          />
          {/* 두 번째 라디오 버튼 */}
          <p className="mr-1">녀</p>
          <input
            type="radio"
            name="radio-1"
            className="radio"
            value="radio-2"
            checked={selectedRadio === 'radio-2'}
            onChange={handleRadioChange}
          />
        </div>
        <div className="mb-1 mt-2 text-[#505050]">생년월일</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker className="mb-4 flex w-80" label="" value={today} />
        </LocalizationProvider>
        <div className="mb-1 text-[#505050]">이름</div>
        <input
          type="text"
          className="input mb-4 h-10 w-80 border border-b border-black"
        />
        <div className="text-[#505050]">지역</div>
        <div className="dropdown dropdown-end dropdown-bottom">
          <div tabIndex={0} role="button" className="btn">
            {selectedTheme}
            <svg
              className="inline-block h-2 w-2 fill-current opacity-60"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow-2xl"
          >
            {cityList.map((district, index) => (
              <li key={`${index}`}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                  aria-label={`${district}`}
                  value={`${district}`}
                  onChange={handleThemeChange}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="border-40 mt-16 h-14 w-72 border border-[#1A1A1A] bg-[#1A1A1A] font-extralight text-white">
        기본 회원정보 저장
      </button>
    </div>
  );
}

export default page;
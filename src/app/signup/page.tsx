/* eslint-disable no-console */
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
import dayjs, { Dayjs } from 'dayjs';
import { signupUserInfo } from '@/api/user.ts';
import { useQuery } from '@tanstack/react-query';
import test from 'node:test';
import { sample } from '@/api/sample.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['400'] });

function Page() {
  const today = dayjs();
  const [selectedTheme, setSelectedTheme] = useState<string>('지역 선택');
  const [selectedRadio, setSelectedRadio] = useState<string>('radio-1');
  const [birthDate, setBirthDate] = useState<Dayjs | null>(today);
  const [name, setName] = useState<string>('');

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

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTheme(event.target.value);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    const gender = selectedRadio === 'radio-1' ? 'M' : 'F';
    const location = selectedTheme;
    const formattedBirthDate = birthDate ? birthDate.format('YYYY-MM-DD') : '';

    console.log('Name:', name);
    console.log('Birth Date:', formattedBirthDate);
    console.log('Gender:', gender);
    console.log('Location:', location);

    await signupUserInfo(name, formattedBirthDate, gender, location);
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
            style={{ width: '18px', height: '18px' }}
            className="radio mr-2"
            value="radio-1"
            checked={selectedRadio === 'radio-1'}
            onChange={handleRadioChange}
          />
          {/* 두 번째 라디오 버튼 */}
          <p className="mr-1">여</p>
          <input
            type="radio"
            name="radio-1"
            style={{ width: '18px', height: '18px' }}
            className="radio"
            value="radio-2"
            checked={selectedRadio === 'radio-2'}
            onChange={handleRadioChange}
          />
        </div>
        <div className="mb-1 mt-2 text-[#505050]">생년월일</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            className="mb-4 flex w-80"
            label=""
            value={birthDate}
            onChange={(date) => setBirthDate(date)}
          />
        </LocalizationProvider>
        <div className="mb-1 text-[#505050]">이름</div>
        <input
          type="text"
          className="input mb-4 h-10 w-80 border border-b border-black"
          value={name}
          onChange={handleNameChange}
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
      <button
        onClick={handleSubmit}
        className="border-40 mt-16 h-14 w-72 border border-[#1A1A1A] bg-[#1A1A1A] font-extralight text-white"
      >
        기본 회원정보 저장
      </button>
    </div>
  );
}

export default Page;

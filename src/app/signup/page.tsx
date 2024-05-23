/* eslint-disable quotes */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable lines-around-directive */
/* eslint-disable no-alert */
'use client';

import { Montserrat } from 'next/font/google';
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { signupUserInfo } from '@/api/user.ts';
import WarningAlert from '../components/WarningAlert.tsx';

const mont = Montserrat({ subsets: ['latin'], weight: ['400'] });

function Page() {
  const today = dayjs();
  const [selectedRadio, setSelectedRadio] = useState<string>('radio-1');
  const [birthDate, setBirthDate] = useState<Dayjs | null>(today);
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRadio(event.target.value);
  };

  const handleSubmit = async () => {
    // 유효성 검사: 이름과 지역이 모두 입력되었는지 확인
    if (!name.trim() || !location.trim()) {
      // alert('이름과 지역을 설정해주세요!');
      setShowAlert(true);
      setErrorMessage('이름과 지역을 설정해주세요!');
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return;
    }

    // location의 형식이 '시'와 '구'로 이루어진지 검사
    const locationRegex = /^[가-힣]+시 [가-힣]+구$/;
    if (!locationRegex.test(location.trim())) {
      // alert('지역을 "~~시 ~~구" 형식으로 입력해주세요!');
      setShowAlert(true);
      setErrorMessage(`지역을 '~~시 ~~구' 형식으로 입력해주세요!`);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      return; // 지역 형식이 맞지 않으면 함수 종료
    }

    const gender = selectedRadio === 'radio-1' ? 'M' : 'F';
    const formattedBirthDate = birthDate ? birthDate.format('YYYY-MM-DD') : '';

    await signupUserInfo(name, formattedBirthDate, gender, location);
  };

  return (
    <div className="flex flex-col items-center">
      <WarningAlert errorMessage={errorMessage} showAlert={showAlert} />
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
          onChange={(event) => setName(event.target.value)}
        />
        <div className="mb-1 text-[#505050]">지역</div>
        <input
          type="text"
          className="input mb-4 h-10 w-80 border border-b border-black"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="border-40 mt-16 h-14 w-72 rounded-md border border-[#1A1A1A] bg-[#1A1A1A] font-extralight text-white"
      >
        기본 회원정보 저장
      </button>
    </div>
  );
}

export default Page;
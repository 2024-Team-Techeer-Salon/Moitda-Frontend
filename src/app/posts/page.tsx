/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function pcategory() {
  const [category, setcategory] = useState('');
  const { register, handleSubmit } = useForm();
  const today = dayjs();

  const onSubmit = (data: any) => {
    console.log(data); // 이곳에서 form 데이터를 처리합니다.
  };

  const handleChange = (event: SelectChangeEvent) => {
    setcategory(event.target.value as string);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-20">
      <div className="flex flex-col w-[67.5rem] h-full">
        {/* 제목 입력 및 카테고리 선택 */}
        <div className="flex flex-row w-full h-12 ">
          <form
            className="flex w-full mr-4 border border-1 p-2 border-zinc-300"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="글 제목을 입력하세요"
              className="flex w-full focus:outline-none"
            />
          </form>

          <FormControl className="w-40 h-12 " fullWidth>
            <InputLabel className="h-full">카테고리</InputLabel>
            <Select
              value={category}
              label="카테고리"
              onChange={handleChange}
              style={{ borderRadius: 0 }}
              className="flex w-full h-full"
            >
              <MenuItem value="Category1">Category1</MenuItem>
              <MenuItem value="Category2">Category2</MenuItem>
              <MenuItem value="Category3">Category3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 장소 선택 */}
        <div className="flex flex-row w-full mt-4 h-60">
          <div className="flex flex-col justify-end w-1/2 ">
            <p className="flex text-sm text-zinc-300">
              모임 장소를 입력해 주세요!
            </p>
            <div className="flex flex-row w-full mt-4 h-12">
              <p className="flex w-full border border-1 justify-start items-center pl-2 text-zinc-300 border-zinc-300 mr-4">
                주소
              </p>
              <button className="btn w-32 h-12 text-white bg-[#E6E1E1] hover:bg-[#C7B7B7]">
                주소 검색
              </button>
            </div>
            <form className="flex w-full mt-4 mr-4 border border-1 p-2 border-zinc-300">
              <input
                {...register('address', { required: true })}
                type="text"
                placeholder="상세 주소"
                className="flex w-full focus:outline-none"
              />
            </form>
            <div className="flex w-full h-12 mt-4"></div>
          </div>
          <div className="flex w-1/2 h-60 border border-zinc-300 m-4" id="map">
            <Script
              src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
              strategy="beforeInteractive"
            />
            <Map
              center={{ lat: 33.450701, lng: 126.570667 }}
              style={{ width: '100%', height: '100%' }}
            ></Map>
          </div>
        </div>

        {/* 날짜 선택 */}
        <p className="flex text-sm text-zinc-300 mt-8">
          약속 날짜를 입력해 주세요!
        </p>
        <div className="flex w-60 mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="날짜 선택"
              value={today}
              views={['year', 'month', 'day']}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default pcategory;

/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/display-name */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  Unstable_NumberInput as BaseNumberInput,
  NumberInputProps,
  NumberInputOwnerState,
} from '@mui/base/Unstable_NumberInput';
import clsx from 'clsx';
import { DateTimePicker } from '@mui/x-date-pickers';

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

// numberInput 컴포넌트
const NumberInput = React.forwardRef(
  (props: NumberInputProps, ref: React.ForwardedRef<HTMLDivElement>) => (
    <BaseNumberInput
      {...props}
      ref={ref}
      slotProps={{
        root: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-violet-400 dark:hover:border-violet-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-violet-400 dark:border-violet-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
                : 'border-slate-300 dark:border-slate-600 shadow-md shadow-slate-100 dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
        input: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.input,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'col-start-1 col-end-2 row-start-1 row-end-3 text-sm font-sans leading-normal text-slate-900 bg-inherit border-0 rounded-[inherit] dark:text-slate-300 px-3 py-2 outline-0 focus-visible:outline-0 focus-visible:outline-none',
              resolvedSlotProps?.className,
            ),
          };
        },
        incrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.incrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▴',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-t-md border-slate-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-1 row-end-2',
              resolvedSlotProps?.className,
            ),
          };
        },
        decrementButton: (ownerState: NumberInputOwnerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.decrementButton,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            children: '▾',
            className: clsx(
              'font-[system-ui] flex flex-row flex-nowrap justify-center items-center p-0 w-[19px] h-[19px] border border-solid outline-none text-sm box-border leading-[1.2] rounded-b-md border-slate-200 border-t-0 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-300 transition-all duration-[120ms] hover:cursor-pointer hover:bg-purple-500 hover:text-slate-50 dark:hover:bg-slate-800 dark:border-slate-600 col-start-3 col-end-3 row-start-2 row-end-3',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  ),
);
function pcategory() {
  const [category, setcategory] = useState('');
  const [numPeople, setNumPeople] = useState(0);
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
        <div className="flex flex-row w-full mt-8 h-60">
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
        <p className="flex text-sm text-zinc-300 mt-12">
          약속 날짜를 입력해 주세요!
        </p>
        <div className="flex w-full mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="flex w-80"
              label="날짜 선택"
              value={today}
            />
          </LocalizationProvider>
        </div>

        {/* 인원수 선택 */}
        <p className="flex text-sm text-zinc-300 mt-12">
          본인을 포함해 모일 최대 인원수를 입력해 주세요!
        </p>
        <div className="flex flex-row w-full mt-4">
          {' '}
          <NumberInput
            aria-label="Demo number input"
            // endAdornment={
            //   <InputAdornment
            //     className="flex pt-6 -ml-6"
            //     position="end"
            //     component="div"
            //   >
            //     명
            //   </InputAdornment>
            // }
            placeholder="인원수"
            value={numPeople}
            onChange={(event, val: any) => setNumPeople(val)}
            min={0}
            max={99}
          />
        </div>
      </div>
    </div>
  );
}

export default pcategory;

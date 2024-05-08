/* eslint-disable no-undef */
/* eslint-disable @next/next/no-script-component-in-head */
/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/display-name */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import DaumPostcode from 'react-daum-postcode';
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
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Script from 'next/script';

const ReactQuill = dynamic(async () => import('react-quill'), {
  ssr: false,
});

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
              'grid grid-cols-[1fr_8px] grid-rows-2 overflow-hidden font-sans rounded-lg text-slate-900 dark:text-slate-300 border border-solid  bg-white dark:bg-slate-900  hover:border-slate-400 dark:hover:border-slate-400 focus-visible:outline-0 p-1',
              ownerState.focused
                ? 'border-slate-400 dark:border-slate-400 shadow-lg shadow-outline-purple dark:shadow-outline-purple'
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
function page() {
  const [category, setcategory] = useState('');
  const [numPeople, setNumPeople] = useState(1);
  const [joinImmediately, setJoinImmediately] = useState(true);
  const [editorHtml, setEditorHtml] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [address, setAddress] = useState('');
  const [meetingAddressModalOpen, setMeetingAddressModalOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const today = dayjs();
  const [center, setCenter] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 사용자 위치를 성공적으로 가져온 경우, 지도 중심을 사용자의 현재 위치로 설정
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        },
      );
      // console.log(center);
    } else {
      console.error('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  }, []);

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    const tempImages: string[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      // 이미지 파일만 추가하도록 필터링
      if (file.type.startsWith('image/')) {
        tempImages.push(URL.createObjectURL(file));
      }
    }
    setImages((prevImages) => [
      ...prevImages,
      ...tempImages.slice(0, 8 - prevImages.length),
    ]);
  };

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = (data: any) => {
    console.log(data); // 이곳에서 form 데이터를 처리합니다.
  };

  const handleChange = (event: SelectChangeEvent) => {
    setcategory(event.target.value as string);
  };

  // 텍스트 에디터 내용이 변경될 때 호출되는 콜백 함수
  const handleEditorChange = (html: any) => {
    setEditorHtml(html);
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 주소 검색 모달
  function DaumPostCodeModal() {
    const handleComplete = (data: any) => {
      let fullAddress = data.buildingName;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress +=
            extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }

      window.kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(data.address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const newCenter = {
              lat: result[0].y,
              lng: result[0].x,
            };
            setCenter({
              lat: parseFloat(newCenter.lat),
              lng: parseFloat(newCenter.lng),
            });
          }
        });
      });

      console.log(data); // 콘솔에 주소 출력
      setAddress(fullAddress); // 상태에 주소 저장
      setMeetingAddressModalOpen(false); // 모달 닫기
    };

    return (
      <div
        className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-10"
        onClick={() => setMeetingAddressModalOpen(false)}
      >
        <div className="flex h-96 w-1/3">
          <DaumPostcode onComplete={handleComplete} className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <Script
        type="text/javascript"
        src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
        strategy="beforeInteractive"
      />

      <div className="flex h-full w-[67.5rem] flex-col">
        {/* 제목 입력 및 카테고리 선택 */}
        <div className="flex h-12 w-full flex-row ">
          <form
            className="border-1 mr-4 flex w-full border border-zinc-300 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              {...register('title', { required: true })}
              type="text"
              placeholder="글 제목을 입력하세요"
              className="flex w-full focus:outline-none"
            />
          </form>

          <FormControl className="flex h-12 w-40">
            <InputLabel className="flex h-full">카테고리</InputLabel>
            <Select
              value={category}
              label="카테고리"
              onChange={handleChange}
              style={{ borderRadius: 0 }} // width: '160px', height: '48px',
              className="flex h-full w-full"
            >
              <MenuItem value="Category1">Category1</MenuItem>
              <MenuItem value="Category2">Category2</MenuItem>
              <MenuItem value="Category3">Category3</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* 장소 선택 */}
        <div className="mt-8 flex h-60 w-full flex-row">
          {meetingAddressModalOpen && <DaumPostCodeModal />}
          <div className="flex w-1/2 flex-col justify-end ">
            <p className="flex text-sm text-zinc-300">
              모임 장소를 입력해 주세요!
            </p>
            <div className="mt-4 flex h-12 w-full flex-row">
              <input
                className="border-1 mr-4 flex w-full items-center justify-start border border-zinc-300 pl-2 focus:outline-none"
                readOnly
                type="text"
                value={address}
                placeholder="주소"
              />
              <button
                className="btn h-12 w-32 bg-[#E6E1E1] text-white hover:bg-[#C7B7B7]"
                onClick={() => setMeetingAddressModalOpen(true)}
              >
                주소 검색
              </button>
            </div>
            <form className="border-1 mr-4 mt-4 flex w-full border border-zinc-300">
              <input
                {...register('address', { required: true })}
                type="text"
                placeholder="상세 주소"
                className="flex h-12 w-full p-2 focus:outline-none"
              />
            </form>
          </div>
          <div className="ml-4 flex h-60 w-1/2 border border-zinc-300" id="map">
            {/* <Script
              src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
              strategy="beforeInteractive"
            /> */}
            <Map // 지도를 표시할 컨테이너
              center={center} // 지도의 중심좌표
              style={{ width: '100%', height: '100%' }}
            >
              <MapMarker position={center} /> {/* 사용자의 위치에 마커 표시 */}
            </Map>
          </div>
        </div>

        {/* 날짜 선택 */}
        <p className="mt-12 flex text-sm text-zinc-300">
          약속 날짜를 입력해 주세요!
        </p>
        <div className="mt-4 flex w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="flex w-80"
              label="날짜 선택"
              value={today}
            />
          </LocalizationProvider>
        </div>

        {/* 인원수 선택 */}
        <p className="mt-12 flex text-sm text-zinc-300">
          본인을 포함해 모일 최대 인원수를 입력해 주세요!
        </p>
        <div className="mt-4 flex w-full flex-row">
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

        {/* 참가 방식 결정 */}
        <p className="mt-12 flex text-sm text-zinc-300">
          참가 방식을 선택해 주세요!
        </p>
        <div className="mt-4 flex h-16 w-72 flex-row items-center justify-start rounded-2xl bg-gray-200 p-4 shadow-md">
          <div
            className="absolute h-12 w-32 items-center justify-center rounded-2xl bg-gray-100 shadow-md"
            style={{
              transform: joinImmediately ? 'translateX(0)' : 'translateX(100%)',
              transition: 'transform 0.3s ease-in-out',
            }}
          />
          <p
            className="z-10 flex w-1/2 cursor-pointer justify-center text-lg font-bold text-zinc-500"
            onClick={() => setJoinImmediately(true)}
          >
            즉시 참가
          </p>
          <p
            className="z-10 flex w-1/2 cursor-pointer justify-center text-lg font-bold text-zinc-500"
            onClick={() => setJoinImmediately(false)}
          >
            승인 후 참가
          </p>
        </div>

        <div className="mt-12 flex h-full w-full flex-col">
          {/* React-Quill 컴포넌트 */}
          <ReactQuill
            theme="snow" // 에디터의 테마 설정
            value={editorHtml} // 현재 편집 중인 HTML 내용
            onChange={handleEditorChange} // 내용이 변경될 때 호출되는 콜백 함수
            className="h-96 w-full"
            placeholder="어떤 모임을 가질 지 설명해주세요!"
          />
        </div>

        {/* 이미지 업로드 */}
        <p className="mt-20 flex text-sm text-zinc-300">
          모임 대표 사진을 업로드해 주세요! (최대 8장)
        </p>

        <div className="flex h-auto w-full flex-row overflow-x-scroll">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {images.length < 8 && (
            <label
              htmlFor="fileInput"
              style={{
                cursor: 'pointer',
                textDecoration: 'underline',
                color: 'blue',
              }}
              onClick={handleFileInputChange}
            >
              <div className="border-1 m-3 flex h-28 w-28 cursor-pointer items-center justify-center border border-zinc-300 text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </label>
          )}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              <Image
                src={image}
                alt={`Uploaded ${index}`}
                className="border-1 m-3 flex cursor-pointer border border-zinc-300"
                width={112}
                height={112}
              />
              {hoveredIndex === index && (
                <div
                  className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center bg-zinc-200 bg-opacity-70"
                  onClick={() => handleImageDelete(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => handleImageDelete(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 flex w-full flex-row justify-end">
          <button className="btn h-12 w-32 bg-[#E6E1E1] text-white hover:bg-[#C7B7B7]">
            등록
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;

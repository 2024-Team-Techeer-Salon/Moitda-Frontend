/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Script from 'next/script';
import { postMeetings, getMeetingsData, editMeeting } from '@/api/meetings.ts';
import utc from 'dayjs/plugin/utc'; // UTC 플러그인을 사용
import timezone from 'dayjs/plugin/timezone';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchAddress } from '@/api/kakao.ts';
import Swal from 'sweetalert2';
import { useRouter, useSearchParams } from 'next/navigation';
import category from '@/util/category.json';
import WarningAlert from '../components/WarningAlert.tsx';

dayjs.extend(utc);
dayjs.extend(timezone);

const ReactQuill = dynamic(async () => import('react-quill'), {
  ssr: false,
});

function page() {
  const today = dayjs();
  const renderSize = 10;

  // useState 훅
  const [categoryId, setCategoryId] = useState<number>(-1);
  const [numPeople, setNumPeople] = useState(2);
  const [needsApproval, setNeedsApproval] = useState(true);
  const [editorHtml, setEditorHtml] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [title, setTitle] = useState('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [address, setAddress] = useState('');
  const [addressDetail, setAddressDetail] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [meetingAddressModalOpen, setMeetingAddressModalOpen] =
    useState<boolean>(false);
  const [meetingTime, setMeetingTime] = useState(
    dayjs(today).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm'), // 약속 날짜와 시간의 초기값, 한국 기준 현재 시간으로 설정
  );
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [postType, setPostType] = useState<string>(''); // create or edit
  const [meetingId, setMeetingId] = useState<number>();

  // useRef 훅
  const fileInputRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<string>(title);
  const addressDetailRef = useRef<string>(addressDetail);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // useForm 훅
  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm(); // 주소 검색 폼

  const router = useRouter();
  const searchParams = useSearchParams();

  // useInfiniteQuery 훅
  const { data, hasNextPage, fetchNextPage, refetch } = useInfiniteQuery({
    queryKey: ['search address'],
    queryFn: ({ pageParam }) =>
      searchAddress(
        searchKeyword,
        center.lat,
        center.lng,
        pageParam,
        renderSize,
      ),
    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.meta.is_end === true) {
        return undefined;
      }
      return allPages.length + 1;
    },
  });

  // useEffect 훅

  useEffect(() => {
    if (navigator.geolocation) {
      setPostType(searchParams?.get('type') || 'create');
      setMeetingId(Number(searchParams?.get('meetingId')) || undefined);

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
    } else {
      console.error('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasNextPage) {
            fetchNextPage();
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);

  if (postType === 'edit' && meetingId) {
    getMeetingsData(meetingId)
      .then((data) => {
        setTitle(data.title);
        setCategoryId(data.category_id);
        setEditorHtml(data.content);
        setNumPeople(data.max_participants_count);
        setNeedsApproval(data.approval_required);
        setMeetingTime(data.appointment_time);
      })
      .catch(() => {
        setPostType('create');
        setMeetingId(undefined);
      });
  }

  const handleImageChange = (e: any) => {
    const { files } = e.target;
    const tempImages: File[] = [];
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      // 이미지 파일만 추가하도록 필터링
      if (file.type.startsWith('image/')) {
        tempImages.push(file);
      }
    }
    setImages((prevImages) => [
      ...prevImages,
      ...tempImages.slice(0, 8 - prevImages.length),
    ]);
  };

  const onSubmitSearch = async (data: any) => {
    setSearchKeyword(data.localKeyword);
    await fetchNextPage();
    refetch();
  };

  const handleImageDelete = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // 주소 검색 모달
  function SearchAddressModal({ isOpen }: { isOpen: boolean }) {
    // 모달이 열렸을 때 body 스크롤을 막기 위한 useEffect
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [isOpen]);

    if (!isOpen) return null;

    // 검색 결과에서 주소를 클릭했을 때 실행되는 함수
    const handleComplete = (data: any) => {
      setAddress(
        data.road_address_name ? data.road_address_name : data.address_name,
      );
      setPlaceName(data.place_name);

      window.kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          data.road_address_name ? data.road_address_name : data.address_name,
          (result, status) => {
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
          },
        );
      });
      setMeetingAddressModalOpen(false); // 모달 닫기
    };

    // 주소 검색 결과를 표시하는 컴포넌트
    function Location({
      title,
      roadName,
    }: {
      title: string;
      roadName: string;
    }) {
      return (
        <div
          className="flex h-20 w-full cursor-pointer flex-row items-center justify-start p-2 hover:bg-gray-100"
          onClick={() => {
            handleComplete(data);
          }}
        >
          <svg className="m-2 mx-8 h-10 w-10" viewBox="0 0 72 72" fill="none">
            <path
              d="M22.1275 14.5775C25.9665 10.8591 30.5906 9 36 9C41.4094 9 46.0117 10.838 49.807 14.5141C53.6024 18.1902 55.5 22.6479 55.5 27.8873C55.5 30.5071 54.8238 33.507 53.4715 36.8873C52.1191 40.2676 50.4832 43.4366 48.5638 46.3944C46.6443 49.3521 44.7467 52.1197 42.8708 54.6972C40.995 57.2747 39.4027 59.3239 38.094 60.8451L36 63C35.4765 62.4084 34.7785 61.6268 33.906 60.6549C33.0336 59.6831 31.4631 57.7395 29.1946 54.8239C26.9262 51.9084 24.9413 49.0775 23.2399 46.331C21.5386 43.5845 19.9899 40.4789 18.594 37.0141C17.198 33.5493 16.5 30.5071 16.5 27.8873C16.5 22.6479 18.3758 18.2113 22.1275 14.5775Z"
              stroke="black"
              strokeWidth="6"
            />
            <path
              d="M39 28.5C39 30.1569 37.6569 31.5 36 31.5C34.3431 31.5 33 30.1569 33 28.5C33 26.8431 34.3431 25.5 36 25.5C37.6569 25.5 39 26.8431 39 28.5Z"
              stroke="black"
              strokeWidth="4"
            />
          </svg>
          <div className="flex flex-col">
            <p className="text-lg text-black">{title}</p>
            <p className="text-sm text-zinc-700">{roadName}</p>
          </div>
        </div>
      );
    }

    return (
      // 모달 배경
      <div
        className="fixed inset-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-10"
        onClick={() => setMeetingAddressModalOpen(false)}
      >
        {/* 모달 내부 */}
        <div
          className="flex h-1/2 w-[60rem] flex-col rounded-lg bg-white p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 제목 */}
          <div className="border-1 relative flex h-14 w-full flex-row items-center justify-start rounded-lg border-2 border-zinc-200">
            <form
              className="flex w-full flex-row items-center"
              onSubmit={handleSubmitSearch(onSubmitSearch)}
            >
              <input
                {...registerSearch('localKeyword', { required: true })}
                type="text"
                className="mx-2 h-full w-full focus:outline-none"
                placeholder="주소를 입력하세요"
                autoComplete="off"
              />
              <button type="submit">
                <svg
                  className="m-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* 돋보기 아이콘 */}
          </div>
          {/* 검색 결과 */}
          <div className=" mt-4 flex h-12 w-full flex-row items-center justify-start rounded-t-lg bg-zinc-200 p-4 text-zinc-500">
            Suggested Addresses
          </div>
          <div className="hide-scrollbar relative flex h-full w-full flex-col overflow-y-scroll rounded-b-lg border-2 border-zinc-200">
            <div className="flex w-full flex-col">
              {data?.pages.map((page, pageIndex) => (
                <>
                  {page?.documents.map(
                    (
                      doc: {
                        address_name: string;
                        place_name: string;
                        road_address_name: string;
                      },
                      docIndex: any,
                    ) => (
                      <div
                        key={`${pageIndex}-${docIndex}`}
                        onClick={() => handleComplete(doc)}
                      >
                        <Location
                          key={`${pageIndex}-${docIndex}`}
                          title={doc.place_name}
                          roadName={
                            doc.road_address_name
                              ? doc.road_address_name
                              : doc.address_name
                          }
                        />
                      </div>
                    ),
                  )}
                </>
              ))}
              <div
                className={`flex w-full cursor-pointer items-center justify-center text-zinc-500 ${hasNextPage && searchKeyword ? 'h-12 hover:bg-gray-100' : ''} cursor-pointer`}
                ref={loadMoreRef}
                onClick={(event: React.MouseEvent) => {
                  event.preventDefault();
                  if (hasNextPage && searchKeyword) {
                    fetchNextPage();
                  }
                }}
              >
                {hasNextPage && searchKeyword ? 'Load More' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDateChange = (newValue: any) => {
    // newValue를 ISO 문자열 형식으로 변환하여 상태 업데이트
    setMeetingTime(
      newValue
        ? dayjs(newValue).tz('Asia/Seoul').format('YYYY-MM-DDTHH:mm')
        : '',
    );
  };

  const handlePostMeetings = () => {
    if (title === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setErrorMessage('제목을 입력해 주세요!');
    } else if (categoryId === -1) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setErrorMessage('카테고리를 선택해 주세요!');
    } else if (address === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setErrorMessage('주소를 입력해 주세요!');
    } else if (editorHtml === '') {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setErrorMessage('모임 설명을 입력해 주세요!');
    } else if (postType === 'edit' && meetingId) {
      editMeeting(
        meetingId,
        categoryId,
        title,
        editorHtml,
        placeName,
        address,
        addressDetail,
        numPeople,
        meetingTime,
      )
        .then(() => {
          Swal.fire({
            title: '모임이 성공적으로 수정되었습니다!',
            text: '모임이 성공적으로 수정되었습니다!',
            icon: 'success',
          });
        })
        .then(() => {
          router.push(`/meeting/${meetingId}`);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      postMeetings(
        categoryId,
        title,
        editorHtml,
        placeName,
        address,
        addressDetail,
        numPeople,
        needsApproval,
        meetingTime,
        images,
      )
        .then(() => {
          Swal.fire({
            // title: '모임이 성공적으로 생성되었습니다!',
            text: '모임이 성공적으로 생성되었습니다!',
            icon: 'success',
          });
        })
        .then(() => {
          router.push('/home');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  console.log('meetingId', meetingId);

  return (
    <div className="mt-20 flex h-full w-full flex-col items-center justify-center">
      <Script
        type="text/javascript"
        src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
        strategy="beforeInteractive"
      />
      <WarningAlert errorMessage={errorMessage} showAlert={showAlert} />
      <div className="flex h-full w-[67.5rem] flex-col">
        {/* 제목 입력 및 카테고리 선택 */}
        <div className="flex h-12 w-full flex-row ">
          <input
            type="text"
            placeholder="글 제목을 입력하세요"
            className="border-1 mr-4 flex w-full border border-zinc-300 p-2 focus:outline-none"
            defaultValue={title}
            onChange={(e) => (titleRef.current = e.target.value)}
            onBlur={() => setTitle(titleRef.current)}
          />

          <FormControl className="flex h-12 w-40">
            <InputLabel className="flex h-full">카테고리</InputLabel>
            <Select
              label="카테고리"
              onChange={(event) => {
                setCategoryId(Number(event.target.value));
              }}
              style={{ borderRadius: 0 }}
              className="flex h-full w-full"
            >
              {category.category_name.map((name, index) => (
                <MenuItem
                  key={index}
                  value={index}
                  onClick={() => {
                    setCategoryId(index);
                  }}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* 장소 선택 */}
        <div className="mt-8 flex h-60 w-full flex-row">
          <SearchAddressModal isOpen={meetingAddressModalOpen} />
          <div className="flex w-1/2 flex-col justify-end ">
            <p className="flex text-sm text-zinc-300">
              모임 장소를 입력해 주세요!
            </p>
            <div className="mt-4 flex h-12 w-full flex-row">
              <input
                className="border-1 mr-4 flex w-full items-center justify-start border border-zinc-300 pl-2 focus:outline-none"
                readOnly
                type="text"
                value={placeName}
                placeholder="주소"
              />
              <button
                className="btn h-12 w-32 bg-[#E6E1E1] text-white hover:bg-[#C7B7B7]"
                onClick={() => setMeetingAddressModalOpen(true)}
              >
                주소 검색
              </button>
            </div>

            <input
              type="text"
              placeholder="상세 주소"
              className="border-1 mr-4 mt-4 flex h-12 w-full border border-zinc-300 p-2 focus:outline-none"
              onChange={(e) => (addressDetailRef.current = e.target.value)}
              onBlur={() => setAddressDetail(addressDetailRef.current)}
            />
          </div>
          <div className="ml-4 flex h-60 w-1/2 border border-zinc-300" id="map">
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
              value={dayjs(meetingTime)}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>

        {/* 인원수 선택 */}
        <p className="mt-12 flex text-sm text-zinc-300">
          본인을 포함해 모일 최대 인원수를 입력해 주세요!
        </p>
        <div className="mt-4 flex w-52 flex-row rounded-lg border border-solid bg-white p-1 font-sans hover:border-slate-400  focus-visible:outline-0">
          <input
            type="number"
            className="w-full border-0 bg-white p-2 text-left focus:outline-none"
            value={numPeople}
            onChange={(e) => {
              if (Number(e.target.value) < 2) {
                setNumPeople(2);
              } else if (Number(e.target.value) > 99) {
                setNumPeople(99);
              } else setNumPeople(Number(e.target.value));
            }}
            min={2}
            max={99}
            placeholder="인원수를 입력해 주세요"
          />
          <div className="flex flex-col">
            <button
              className="flex h-5 w-5 cursor-pointer flex-row items-center justify-center rounded-t-md border border-b-0 border-slate-200 bg-slate-50 font-[system-ui] transition-all duration-300 hover:bg-indigo-500 hover:text-slate-50"
              onClick={() => {
                if (numPeople < 2) {
                  setNumPeople(2);
                } else if (numPeople < 100) {
                  setNumPeople((prevNum) => prevNum + 1);
                } else {
                  setNumPeople(99);
                }
              }}
            >
              ▴
            </button>
            <button
              className="flex h-5 w-5 cursor-pointer flex-row items-center justify-center rounded-b-md border border-t-0 border-slate-200 bg-slate-50 font-[system-ui] transition-all duration-300 hover:bg-indigo-500 hover:text-slate-50"
              onClick={() => {
                if (numPeople > 100) {
                  setNumPeople(99);
                } else if (numPeople > 2) {
                  setNumPeople((prevNum) => prevNum - 1);
                } else {
                  setNumPeople(2);
                }
              }}
            >
              ▾
            </button>
          </div>
        </div>

        {/* 참가 방식 결정 */}
        {!(postType === 'edit' && meetingId !== undefined) && (
          <div>
            <p className="mt-12 flex text-sm text-zinc-300">
              참가 방식을 선택해 주세요!
            </p>
            <div className="mt-4 flex h-16 w-72 flex-row items-center justify-start rounded-2xl bg-gray-200 p-4 shadow-md">
              <div
                className="absolute h-12 w-32 items-center justify-center rounded-2xl bg-gray-100 shadow-md"
                style={{
                  transform: needsApproval
                    ? 'translateX(0)'
                    : 'translateX(100%)',
                  transition: 'transform 0.3s ease-in-out',
                }}
              />
              <p
                className="z-10 flex w-1/2 cursor-pointer justify-center text-lg font-bold text-zinc-500"
                onClick={() => setNeedsApproval(true)}
              >
                승인 후 참가
              </p>
              <p
                className="z-10 flex w-1/2 cursor-pointer justify-center text-lg font-bold text-zinc-500"
                onClick={() => setNeedsApproval(false)}
              >
                즉시 참가
              </p>
            </div>
          </div>
        )}

        <div className="mb-12 mt-12 flex h-full w-full flex-col">
          {/* React-Quill 컴포넌트 */}
          <ReactQuill
            theme="snow" // 에디터의 테마 설정
            value={editorHtml} // 현재 편집 중인 HTML 내용
            onChange={(html: any) => {
              setEditorHtml(html);
            }} // 내용이 변경될 때 호출되는 콜백 함수
            className="h-96 w-full"
            placeholder="어떤 모임을 가질 지 설명해주세요!"
          />
        </div>

        {/* 이미지 업로드 */}
        {!(postType === 'edit' && meetingId !== undefined) && (
          <div>
            <p className="mt-8 flex text-sm text-zinc-300">
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
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.click();
                    }
                  }}
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
              {images.map((image, index) => {
                const imageUrl = URL.createObjectURL(image);
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                  >
                    <Image
                      src={imageUrl}
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
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-12 flex w-full flex-row justify-end">
          <button
            className="btn h-12 w-32 bg-[#E6E1E1] text-white hover:bg-[#C7B7B7]"
            onClick={handlePostMeetings}
            type="button"
          >
            {postType === 'edit' ? '수정하기' : '모임 등록'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;

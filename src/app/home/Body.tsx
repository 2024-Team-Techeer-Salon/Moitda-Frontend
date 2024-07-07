/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable function-paren-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useInfiniteQuery } from '@tanstack/react-query';
import searchMeetings from '@/api/nearMeeting.ts';
import category from '@/util/category.json';
import { useRouter } from 'next/navigation';
import Post from '../components/Post.tsx';

function Distance() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function successCallback(position: {
      coords: { latitude: number; longitude: number };
    }) {
      // 완료 되면 콘솔 지우기!!
      console.log('Latitude: ', position.coords.latitude);
      console.log('Longitude: ', position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLocationFetched(true); // 위치 정보를 성공적으로 가져온 후 설정
    }

    function errorCallback(error: { code: number; message: string }) {
      // 함수 매개변수의 타입 지정
      console.error('Error Code = ', error.code, ' - ', error.message);
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const locPosition =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  const renderSize = 8;

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['Latest Meeting List', latitude, longitude],
    queryFn: async ({ pageParam = 0 }) => {
      if (latitude !== null && longitude !== null) {
        return searchMeetings(
          latitude,
          longitude,
          pageParam,
          renderSize,
          'asc',
        );
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage === null) {
        return undefined;
      }
      return allPages.length;
    },
    enabled: locationFetched, // 위치 정보를 성공적으로 가져왔을 때만 쿼리 실행
    initialPageParam: 0,
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 기본적으로 브라우저 뷰포트를 root로 사용
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage, loadMoreRef.current]);

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedAddressName, setSelectedAddressName] = useState<string>('');
  const [selectedImg, setSelectedImg] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null,
  );

  const handleMain = (marker: {
    time: string;
    mainTitle: string;
    address: string;
    place_name: string;
    category_id: number;
    mainImg: string;
    meetingId: number;
  }) => {
    setSelectedTime(
      format(new Date(marker.time), 'PPP EEEE', {
        locale: ko,
      }),
    );
    setSelectedTitle(marker.mainTitle);
    setSelectedAddress(marker.address);
    setSelectedAddressName(marker.place_name);
    setSelectedCategory(marker.category_id);
    setSelectedImg(marker.mainImg);
    setSelectedMeetingId(marker.meetingId);
  };

  const markers =
    data?.pages
      .filter((page) => page && page.data && page.data.meeting_list)
      .flatMap((page) =>
        page.data.meeting_list.map(
          (meeting: {
            image_url: string;
            title: string;
            meeting_id: number;
            road_address_name: string;
            latitude: number;
            longitude: number;
            appointment_time: string;
            category_id: number;
            place_name: string;
          }) => ({
            lat: meeting.latitude,
            lng: meeting.longitude,
            meetingId: meeting.meeting_id,
            mainTitle: meeting.title,
            address: meeting.road_address_name,
            mainImg: meeting.image_url,
            time: meeting.appointment_time,
            category_id: meeting.category_id,
            place_name: meeting.place_name,
          }),
        ),
      ) || [];

  return (
    <div className="mt-[-0.5rem] flex h-full w-[30rem] flex-col sm:w-[30rem] md:w-[43rem] lg:w-[65rem]">
      <div className="flex flex-row items-center justify-center">
        <div
          className={`m-4 flex h-[28rem] w-60 flex-col border border-zinc-300 ${selectedMeetingId ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (selectedMeetingId) {
              router.push(`/meeting/${selectedMeetingId}`);
            }
            console.log(selectedMeetingId);
          }}
        >
          <figure className="relative flex min-h-60 min-w-60">
            <Image
              src={
                selectedImg ||
                (selectedCategory !== null
                  ? category.category_image[selectedCategory]
                  : category.basic_image[4])
              }
              fill
              alt="Image"
              sizes="100vm"
            />
          </figure>
          <div className="flex h-full flex-col justify-around p-2 py-8">
            <p className="text-lg font-bold">{selectedTime}</p>
            <p className="text-xl">
              {selectedTitle || (
                <span className="flex items-center justify-center text-lg font-bold text-zinc-500">
                  모임을 선택해주세요.
                </span>
              )}
            </p>
            <p className="mt-2 text-sm text-zinc-400">{selectedAddress}</p>
            <p className="text-sm text-zinc-400">{selectedAddressName}</p>
            <p className="mt-3 text-sm text-zinc-400">
              {selectedCategory !== null
                ? `#${category.category_name[selectedCategory]}`
                : ''}
            </p>
          </div>
        </div>
        <div
          className="m-4 h-[28rem] w-[50rem] border border-zinc-300"
          id="map"
        >
          {locPosition ? (
            <Map
              center={locPosition}
              style={{ width: '100%', height: '100%' }}
              level={3}
            >
              {/* 내위치 */}
              {/* <MapMarker position={locPosition} /> */}
              {markers.map((marker, index) => (
                <MapMarker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  onClick={() => handleMain(marker)}
                  image={{
                    src: 'https://i.ibb.co/sCQvt3z/Group-2608599.png',
                    size: { width: 64, height: 70 },
                    options: { offset: { x: 27, y: 69 } },
                  }}
                />
              ))}
            </Map>
          ) : (
            <p className="flex items-center justify-center">
              GPS 기능을 활성화 해 주세요.
            </p>
          )}
        </div>
      </div>
      <div className="my-20 flex flex-row flex-wrap items-center">
        {data?.pages // pages가 정의된 경우에만 접근
          .filter((page) => page && page.data && page.data.meeting_list)
          .flatMap((page) =>
            page.data.meeting_list.map(
              (meeting: {
                image_url: string;
                title: string;
                meeting_id: number;
                road_address_name: string;
                category_id: number;
                end_time: string;
              }) => (
                <Post
                  key={meeting.meeting_id}
                  titleImage={
                    meeting.image_url ||
                    category.category_image[meeting.category_id]
                  }
                  title={meeting.title}
                  meetingId={meeting.meeting_id}
                  location={meeting.road_address_name}
                  endTime={meeting.end_time}
                />
              ),
            ),
          )}
        {/* {isFetchingNextPage && <div>Loading...</div>} */}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}

export default Distance;

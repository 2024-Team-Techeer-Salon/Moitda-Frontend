/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */

'use client';

import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { searchMeetings } from '@/api/nearMeeting.ts';
import category from '@/util/category.json';
import PostComponent from '../components/Post.tsx';

function Distance() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position: any) {
      // 함수 매개변수의 타입 지정
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLocationFetched(true); // 위치 정보를 성공적으로 가져온 후 설정
    }

    function errorCallback(error: any) {
      // 함수 매개변수의 타입 지정
      console.error('Error Code = ' + error.code + ' - ' + error.message);
    }
  }, []);

  const locPosition =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  const renderSize = 8;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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
  }, [hasNextPage, fetchNextPage]);

  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // 선택했을 때
  // useEffect(() => {
  //   if (data && latitude && longitude) {
  //     const closestMeeting = getClosestMeeting(
  //       data.pages.flatMap((page) => page.data.meeting_list),
  //     );
  //     if (closestMeeting) {
  //       setSelectedTime(closestMeeting.appointment_time);
  //       setSelectedTitle(closestMeeting.title);
  //       setSelectedAddress(closestMeeting.road_address_name);
  //       setSelectedCategory(closestMeeting.category_id);
  //     }
  //   }
  // }, [data, latitude, longitude]);

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
          }) => ({
            lat: meeting.latitude,
            lng: meeting.longitude,
            meetingId: meeting.meeting_id,
            mainTitle: meeting.title,
            address: meeting.road_address_name,
            mainImg: meeting.image_url,
          }),
        ),
      ) || [];

  return (
    <div className="mt-[-0.5rem] flex h-full w-[30rem] flex-col sm:w-[30rem] md:w-[43rem] lg:w-[65rem]">
      <div className="flex flex-row items-center justify-center">
        <div className="m-4 flex h-[28rem] w-60 flex-col border border-zinc-300">
          <div className="relative flex h-60 w-60">
            <Image
              src="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
              layout="fill"
              objectFit="cover"
              alt="Image"
            />
          </div>
          <div className="flex h-full flex-col justify-around p-2 py-8">
            <p className="text-lg font-bold">{selectedTime}</p>
            <p className="text-xl">{selectedTitle}</p>
            <p className="text-sm text-zinc-400">{selectedAddress}</p>
            {/* <p className="text-sm text-zinc-400">({selectedAddressName})</p> */}
            <p className="text-sm text-zinc-400">#{selectedCategory}</p>
          </div>
        </div>
        <div
          className="m-4 h-[28rem] w-[50rem] border border-zinc-300"
          id="map"
        >
          <Script
            src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
            strategy="beforeInteractive"
          />
          {locPosition ? (
            <Map
              center={locPosition}
              style={{ width: '100%', height: '100%' }}
              level={3}
            >
              <MapMarker position={locPosition} />
              {markers.map((marker, index) => (
                <MapMarker
                  key={index}
                  position={{ lat: marker.lat, lng: marker.lng }}
                ></MapMarker>
              ))}
            </Map>
          ) : (
            <p className="flex items-center justify-center">Loading map...</p>
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
              }) => (
                <PostComponent
                  key={meeting.meeting_id}
                  titleImage={meeting.image_url || category.basic_image[0]}
                  title={meeting.title}
                  meetingId={meeting.meeting_id}
                  location={meeting.road_address_name}
                />
              ),
            ),
          )}
        {isFetchingNextPage && <div>Loading...</div>}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}

export default Distance;

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
import Latest from './Latest.tsx';

function Distance() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationFetched, setLocationFetched] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      setLocationFetched(true); // 위치 정보를 성공적으로 가져온 후 설정
    }

    function errorCallback(error) {
      console.error('Error Code = ' + error.code + ' - ' + error.message);
    }
  }, []);

  const locPosition =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  const renderSize = 6;

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

  const loadMoreRef = useRef(null);

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
            <p className="text-lg font-bold">4월 8일 월요일 16:00</p>
            <p className="text-xl">모각코 할 사람!</p>
            <p className="text-sm text-zinc-400">
              경기 수원시 장안구 경수대로 831
            </p>
            <p className="text-sm text-zinc-400">(스타벅스 수원조원 DT점)</p>
            <p className="text-sm text-zinc-400">#공부</p>
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
            </Map>
          ) : (
            <p className="flex items-center justify-center">Loading map...</p>
          )}
        </div>
      </div>
      <Latest />
    </div>
  );
}

export default Distance;

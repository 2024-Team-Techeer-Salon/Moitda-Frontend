/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */

'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { searchMeetings } from '@/api/nearMeeting.ts';
import category from '@/util/category.json';
import PostComponent from '../components/Post.tsx';
import React from 'react';

function Latest() {
  const [lat, setLatitude] = useState(null);
  const [lng, setLongitude] = useState(null);
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

  const renderSize = 32;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['Latest Meeting List', lat, lng],
      queryFn: async ({ pageParam = 0 }) => {
        if (lat !== null && lng !== null) {
          return searchMeetings(lat, lng, pageParam, renderSize, 'string');
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

  if (!data) return null;

  return (
    <div className="flex flex-row flex-wrap items-center">
      {data.pages.map((page) => (
        <>
          {page?.data?.map(
            (meeting: {
              image_url: string;
              title: string;
              meeting_id: number;
              road_address_name: string;
            }) => (
              <PostComponent
                key={meeting.meeting_id}
                titleImage={meeting.image_url || category.category_image[1]}
                title={meeting.title}
                meetingId={meeting.meeting_id}
                location={meeting.road_address_name}
              />
            ),
          )}
        </>
      ))}
      {isFetchingNextPage && <div>Loading...</div>}
      <div ref={loadMoreRef} />
    </div>
  );
}

export default Latest;

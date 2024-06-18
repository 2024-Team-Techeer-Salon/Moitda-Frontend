/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable function-paren-newline */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import category from '@/util/category.json';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchData } from '@/api/search.ts';
import Post from '../components/Post.tsx';

function page() {
  const renderSize = 24;
  const searchParams = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const [searchType, setSearchType] = useState<string>('keyword'); // category or keyword
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // keyword or category id
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  console.log('searchParams', searchParams);

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
    } else {
      console.error('이 브라우저에서는 Geolocation이 지원되지 않습니다.');
    }
  }, []);

  useEffect(() => {
    const type = searchParams?.get('type');
    const keyword = searchParams?.get('keyword');
    if (type && keyword) {
      setSearchType(type);
      setSearchKeyword(keyword);
    }
  }, [searchParams]);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['search', searchType, searchKeyword],
    queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
      getSearchData(
        searchType,
        searchKeyword,
        center.lat,
        center.lng,
        pageParam,
        renderSize,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage: {
      current_page: number;
      total_page: number;
    }) => {
      if (lastPage && lastPage.current_page < lastPage.total_page) {
        return lastPage.current_page + 1;
      }
      return undefined;
    },
  });

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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-96 flex-col flex-nowrap items-start justify-start md:w-[38rem] lg:w-[58rem] xl:w-[67.5rem]">
        {searchType === 'category' ? (
          <div className="flex w-full flex-row items-center justify-start text-2xl">
            <figure className="relative m-6 flex h-32 w-32">
              <Image
                src={category.category_image[Number(searchKeyword)]}
                alt="category icon"
                className="rounded-full border border-gray-300"
                layout="fill"
                objectFit="cover"
              />
            </figure>
            <span className="text-4xl font-bold">
              #{category.category_name[Number(searchKeyword)]}
            </span>
          </div>
        ) : (
          <div className="flex w-full flex-row items-center justify-center text-2xl">
            <span className="text-4xl font-bold">
              &quot;{searchKeyword}&quot;&nbsp;
            </span>
            검색 결과
          </div>
        )}
        <div className="flex flex-row flex-wrap items-center justify-start">
          {data?.pages.map((page: any, pageIndex) =>
            page?.meeting_list.map((meeting: any, index: any) => (
              <Post
                key={`${pageIndex}-${index}`} // 각 페이지와 인덱스를 조합하여 고유 키 생성
                titleImage={
                  meeting.image_url ||
                  category.category_image[
                    searchType === 'category'
                      ? Number(searchKeyword)
                      : meeting.category_id
                  ]
                }
                title={meeting.title}
                location={meeting.road_address_name}
                meetingId={meeting.meeting_id}
                endTime={meeting.end_time}
              />
            )),
          )}
          <div ref={loadMoreRef} />
        </div>
      </div>
    </div>
  );
}

export default page;

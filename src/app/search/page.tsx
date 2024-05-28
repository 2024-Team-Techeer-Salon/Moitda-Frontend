/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import category from '@/util/category.json';
import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getSearchData } from '@/api/search.ts';

function page() {
  const renderSize = 24;
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState<string>('keyword'); // category or keyword
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // keyword or category id
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

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
    const type = searchParams?.get('searchType');
    const keyword = searchParams?.get('searchKeyword');
    if (type && keyword) {
      setSearchType(type);
      setSearchKeyword(keyword);
    }
  }, [searchParams]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
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
      getNextPageParam: (lastPage: { page: number; totalPages: number }) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[67.5rem] flex-col items-center justify-start pt-8">
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
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* <Body /> */}
        </div>
      </div>
    </div>
  );
}

export default page;

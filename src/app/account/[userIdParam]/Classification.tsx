/* eslint-disable object-curly-newline */
/* eslint-disable function-paren-newline */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */

'use client';

import React, { useEffect, useState, useRef } from 'react';
import { accountIdProps } from '@/types/account.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyMeetingList } from '@/api/user.ts';
import Post from '@/app/components/Post.tsx';
import category from '@/util/category.json';

const Classification = ({ id }: accountIdProps) => {
  const [activeTab, setActiveTab] = useState<'joined' | 'created'>('created');

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery({
    queryKey: ['myMeetingList'],
    queryFn: ({ pageParam = 0 }: { pageParam: number }) =>
      getMyMeetingList(activeTab, id, false, pageParam, 24),
    initialPageParam: 0,
    getNextPageParam: (lastPage: {
      data: {
        current_page: number;
        total_page: number;
      };
    }) => {
      if (lastPage && lastPage.data.current_page < lastPage.data.total_page) {
        return lastPage.data.current_page + 1;
      }
      return undefined;
    },
  });

  const handleTabClick = async (tab: 'joined' | 'created') => {
    setActiveTab(tab);
    await fetchNextPage();
    refetch();
  };

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

  const commonFontStyle =
    'cursor-pointer text-center font-inter text-lg font-medium border-b-2 flex flex-row justify-center items-center';
  const customStyle = 'w-1/2 h-16';

  const joinedMeetfont =
    activeTab === 'joined' ? 'text-black border-black' : 'text-gray-300';
  const createdMeetfont =
    activeTab === 'created' ? 'text-black border-black' : 'text-gray-300';

  return (
    <div className="flex w-[67.5rem] flex-col justify-center">
      {/* 탭 버튼 */}
      <div className="flex w-full flex-row justify-center p-20">
        <div
          className={`${commonFontStyle} ${customStyle} ${joinedMeetfont}`}
          onClick={() => handleTabClick('joined')}
        >
          <p>참여한 모임</p>
        </div>

        <div
          className={`${commonFontStyle} ${customStyle} ${createdMeetfont}`}
          onClick={() => handleTabClick('created')}
        >
          <p>생성한 모임</p>
        </div>
      </div>

      {/* 모임 리스트 */}
      <div className="flex flex-row flex-wrap items-center justify-start">
        {data?.pages.map((pageData: any, pageIndex) =>
          pageData?.data.meeting_list.map((meeting: any, index: any) => (
            <Post
              key={`${pageIndex}-${index}`} // 각 페이지와 인덱스를 조합하여 고유 키 생성
              titleImage={
                meeting.image_url ||
                category.category_image[meeting.category_id]
              }
              title={meeting.title}
              location={meeting.road_address_name}
              meetingId={meeting.meeting_id}
            />
          )),
        )}
        <div ref={loadMoreRef} />
      </div>
    </div>
  );
};

export default Classification;

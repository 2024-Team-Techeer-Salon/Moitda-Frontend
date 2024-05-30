/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';
import { getMeetingList } from '@/api/meetings.ts';
import category from '@/util/category.json';
import PostComponent from '../components/Post.tsx';

function Latest() {
  const renderSize = 32;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['Lastest Meeting List'],
      queryFn: ({ pageParam }) => getMeetingList(pageParam, renderSize),
      initialPageParam: 0,

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage === null) {
          return undefined;
        }
        return allPages.length;
      },
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

  return (
    <div className="flex flex-row flex-wrap items-center justify-center">
      {postList}
    </div>
  );
}

export default Latest;

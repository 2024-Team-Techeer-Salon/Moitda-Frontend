/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable operator-linebreak */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getMeetingsData, postMeetingReview } from '@/api/meetings.ts';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Image from 'next/image';
import category from '@/util/category.json';

const page = (props: any) => {
  const meetingId = Number(decodeURIComponent(props.params.reviewParam));
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ['meetings'],
    queryFn: () => getMeetingsData(meetingId),
  });

  const [ratingScore, setRatingScore] = useState<number[]>(
    Array(data?.participant_list.length).fill(10),
  );
  const [representationScore, setRepresentationScore] = useState<number>(10);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log('ratingScore', ratingScore);

  if (data && !data.end_time) {
    router.push('/home');
    Swal.fire({
      icon: 'error',
      title: '모임이 아직 종료되지 않았습니다.',
      text: '모임이 종료되면 리뷰를 작성할 수 있습니다.',
    });
  }

  const HeartRating = ({ index }: { index: number }) => (
    <div className="rating gap-1">
      <input
        type="checkbox"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        checked={
          index === -1 ? representationScore === 2 : ratingScore[index] === 2
        }
        onChange={(e) => {
          if (index === -1) {
            setRatingScore(Array(ratingScore.length).fill(2));
            setRepresentationScore(2);
          } else {
            const newRatingScore = [...ratingScore];
            newRatingScore[index] = e.target.checked ? 2 : 0;
            setRatingScore(newRatingScore);
          }
        }}
      />

      <input
        type="checkbox"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        checked={
          index === -1 ? representationScore === 4 : ratingScore[index] === 4
        }
        onChange={(e) => {
          if (index === -1) {
            setRatingScore(Array(ratingScore.length).fill(4));
            setRepresentationScore(4);
          } else {
            const newRatingScore = [...ratingScore];
            newRatingScore[index] = e.target.checked ? 4 : 0;
            setRatingScore(newRatingScore);
          }
        }}
      />
      <input
        type="checkbox"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        checked={
          index === -1 ? representationScore === 6 : ratingScore[index] === 6
        }
        onChange={(e) => {
          if (index === -1) {
            setRatingScore(Array(ratingScore.length).fill(6));
            setRepresentationScore(6);
          } else {
            const newRatingScore = [...ratingScore];
            newRatingScore[index] = e.target.checked ? 6 : 0;
            setRatingScore(newRatingScore);
          }
        }}
      />
      <input
        type="checkbox"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        checked={
          index === -1 ? representationScore === 8 : ratingScore[index] === 8
        }
        onChange={(e) => {
          if (index === -1) {
            setRatingScore(Array(ratingScore.length).fill(8));
            setRepresentationScore(8);
          } else {
            const newRatingScore = [...ratingScore];
            newRatingScore[index] = e.target.checked ? 8 : 0;
            setRatingScore(newRatingScore);
          }
        }}
      />
      <input
        type="checkbox"
        name="rating-3"
        className="mask mask-heart bg-red-400"
        checked={
          index === -1 ? representationScore === 10 : ratingScore[index] === 10
        }
        onChange={(e) => {
          if (index === -1) {
            setRatingScore(Array(ratingScore.length).fill(10));
            setRepresentationScore(10);
          } else {
            const newRatingScore = [...ratingScore];
            newRatingScore[index] = e.target.checked ? 10 : 0;
            setRatingScore(newRatingScore);
          }
        }}
      />
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="mb-8 mt-20 text-4xl font-bold">모임이 종료됐어요!</h1>
        <p className="text-xl font-bold text-gray-400">
          즐거우셨나요? 모임과 참여자의 매너를 평가해 주세요!
        </p>

        <div className="my-16 flex flex-row items-center justify-center">
          <figure className="relative h-28 w-28 rounded-lg ">
            <Image
              src={
                data?.image_list[0].imageUrl ||
                category.category_image[data?.category_id]
              }
              alt=""
              fill
              sizes="100vm"
              className="rounded-lg"
            />
          </figure>
          <div className="mx-4 text-2xl font-bold">{data?.title}</div>
          <HeartRating index={-1} />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-center">
        {data?.participant_list.map((participant: any, index: number) => (
          <div
            className="mb-5 flex w-full flex-row items-center justify-center"
            key={index}
          >
            {/* 프로필 사진 */}
            <figure className="relative h-20 w-20 rounded-full border-2 border-zinc-800">
              <Image
                src={participant.profileImage}
                alt="profile1"
                fill
                sizes="100vm"
              />
            </figure>
            {/* 닉네임 */}
            <p className="ml-8 mr-16 text-gray-600">{participant.username}</p>
            <HeartRating index={index} />
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-row items-center justify-center">
        <Link
          className="mr-20 h-9 w-28 rounded-lg border-2 border-white bg-gray-400 pb-1 pt-1 text-center text-white"
          href="/home"
        >
          취소
        </Link>
        <button
          className="h-9 w-28 rounded-lg border-2 border-white bg-red-400 pb-1 pt-1 text-center text-white"
          onClick={async () => {
            const reviews = data?.participant_list.map(
              (participant: any, index: number) => ({
                userId: 1,
                rating: ratingScore[index],
              }),
            );
            await console.log('reviews : ', reviews);
            await postMeetingReview(meetingId, reviews);
          }}
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default page;

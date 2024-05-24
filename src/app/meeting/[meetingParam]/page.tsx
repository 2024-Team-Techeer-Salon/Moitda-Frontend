/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { getMeetingsData } from '@/api/meetings.ts';
import { useQuery } from '@tanstack/react-query';
import category from '@/util/category.json';
import MeetingImage from './MeetingImage.tsx';
import MeetingHeader from './MeetingHeader.tsx';

function page(props: any) {
  const meetingId = Number(decodeURIComponent(props.params.meetingParam));

  const { isLoading, data } = useQuery({
    queryKey: ['Meeting Data', meetingId],
    queryFn: () => getMeetingsData(meetingId),
  });

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <MeetingImage
        imageURL={
          data.image_list.length === 0
            ? category.category_image[data.category_id]
            : data.image_list
        }
      />

      <div className="flex h-full w-[67.5rem] flex-col">
        {/* 모임 정보 */}
        <MeetingHeader
          title={data.title}
          meetingId={meetingId}
          userId={data.user_id}
          userName={data.username}
          userImage={
            data.profile_image === null
              ? 'https://i.ibb.co/d03Jg0k/image.png' // default image
              : data.profile_image
          }
          mannerStat={data.manner_stat}
          categoryId={data.category_id}
          address={data.road_address_name}
          place={data.place_name}
          addressDetail={data.detailed_address}
          meetingDate={data.appointment_time}
          isOwner={data.is_owner}
          participants={data.participants_count}
          endTime={data.end_time}
        />
        <div className="flex h-full w-[67.5rem] flex-col">
          <div className="mx-8 my-4 border-t border-gray-300"></div>
          <div className="flex flex-row">
            <div className="ml-12 mr-12 mt-6 flex w-3/4">
              <div
                className="basicHTML"
                dangerouslySetInnerHTML={{ __html: data.content }}
              />
            </div>
            <div className="ml-3 mt-4 flex w-1/4 flex-col">
              <h1 className="text-medium mt-2 font-semibold">참여 인원</h1>
              <div className="flex flex-col">
                <div className="mt-2 flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-pink-100"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">안나경</h1>
                </div>
                <div className="flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-zinc-200"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">정유진</h1>
                </div>
                <div className="flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-zinc-200"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">조진우</h1>
                </div>
                <div className="flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-zinc-200"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">이상훈</h1>
                </div>
                <div className="flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-zinc-200"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">윤주원</h1>
                </div>
                <div className="flex items-center">
                  <div className="mt-3 h-14 w-14 rounded-full bg-zinc-200"></div>
                  <h1 className="text-medium ml-3 mt-4 font-light">강정현</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;

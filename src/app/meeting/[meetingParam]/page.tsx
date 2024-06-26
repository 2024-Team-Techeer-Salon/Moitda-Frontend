/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { getMeetingsData } from '@/api/meetings.ts';
import { useQuery } from '@tanstack/react-query';
import category from '@/util/category.json';
import { defaultProfileImage } from '@/util/utilFunction.ts';
import BannerImage from './BannerImage.tsx';
import MeetingHeader from './MeetingHeader.tsx';
import Participants from './Participants.tsx';

function page(props: { params: { meetingParam: string } }) {
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
      <BannerImage
        imageURL={
          data.image_list.length === 0
            ? [
                {
                  imageUrl: category.category_image[data.category_id],
                  id: 99,
                  meetingId,
                },
              ]
            : data.image_list
        }
        endTime={data.end_time}
      />

      <div className="flex h-full w-[67.5rem] flex-col">
        <header>
          {/* 모임 정보 */}
          <MeetingHeader
            title={data.title}
            meetingId={meetingId}
            userId={data.user_id}
            userName={data.username}
            userImage={
              data.profile_image === null
                ? defaultProfileImage() // default image
                : data.profile_image
            }
            mannerStat={data.manner_stat}
            categoryId={data.category_id}
            address={data.road_address_name}
            place={data.place_name}
            addressDetail={data.detailed_address}
            meetingDate={data.appointment_time}
            isOwner={data.is_owner}
            endTime={data.end_time}
            isParticipant={data.participant_valid}
          />
        </header>
        <hr className="mx-8 my-4 border-t border-gray-300" />
        {/* 하단 */}
        <main className="flex flex-row">
          {/* 모임 내용 */}
          <p
            className="basicHTML ml-12 mr-12 mt-6 flex min-h-screen w-3/4 flex-col text-wrap"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* 참여자 */}
          <div className="sticky top-0 ml-3 mt-4 flex h-screen w-1/4 flex-col p-4">
            <Participants
              participantInfo={data.participant_list}
              applicantInfo={data.waiting_list}
              isOwner={data.is_owner}
              meetingId={meetingId}
              isFull={data.max_participants_count === data.participants_count}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
export default page;

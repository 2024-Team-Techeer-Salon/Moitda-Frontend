/* eslint-disable max-len */
import { participantsProps } from '@/types/meeting.ts';
import Image from 'next/image';
import { defaultProfileImage } from '@/util/utilFunction.ts';
import { useRouter } from 'next/navigation';
import { patchMeetingApproval } from '@/api/meetings.ts';
import WarningAlert from '@/app/components/WarningAlert.tsx';
import { useState } from 'react';

function Participants({
  meetingId,
  participantInfo,
  applicantInfo,
  isOwner,
  isFull,
}: participantsProps) {
  const router = useRouter();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  // 프로필 컴포넌트
  const ProfileCard = ({
    name,
    image,
    id,
  }: {
    name: string;
    image: string;
    id: number;
  }) => (
    <button
      className="flex items-center p-2"
      onClick={() => {
        router.push(`/account/${id}`);
      }}
    >
      <figure className="relative h-14 w-14 rounded-full">
        <Image
          src={image || defaultProfileImage()}
          alt="user image"
          layout="fill"
          objectFit="cover"
          className="rounded-full border-2 border-zinc-700"
        />
      </figure>
      <h1 className="text-medium pl-3">{name}</h1>
    </button>
  );

  return (
    <div className="flex h-full flex-col">
      <WarningAlert
        showAlert={alertOpen}
        errorMessage="인원이 가득 찼습니다."
      />
      <div className={`flex ${isOwner ? 'h-1/2' : 'h-full'} w-full flex-col`}>
        <h2 className="text-medium mt-2 font-semibold">참여 인원</h2>
        <ul className="hide-scrollbar flex flex-col overflow-y-auto">
          {participantInfo.map((participant, index) => (
            <li
              className="m-1 flex flex-row justify-between pr-2"
              key={participant.userId}
            >
              <ProfileCard
                name={participant.username}
                image={participant.profileImage}
                id={participant.userId}
              />
              {isOwner && index !== 0 && (
                <button
                  onClick={() => {
                    patchMeetingApproval(
                      participant.userId,
                      meetingId,
                      false,
                    ).then(() => {
                      window.location.reload(); // 페이지 새로고침
                    });
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Icon"
                      d="M18 18L54 54M54 18L18 54"
                      stroke="black"
                      stroke-width="6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      {isOwner && (
        <div className="hide-scrollbar flex h-1/2 w-full flex-col overflow-y-scroll">
          <h2 className="text-medium mt-2 font-semibold">신청 현황</h2>
          <ul className="flex flex-col overflow-y-scroll">
            {applicantInfo?.map((applicant) => (
              <li
                className="m-1 flex flex-col items-start justify-center"
                key={applicant.meetingParticipantId}
              >
                <ProfileCard
                  name={applicant.username}
                  image={applicant.profileImage}
                  id={applicant.meetingParticipantId}
                />
                <div className="flex w-full flex-row items-center justify-start">
                  <button
                    className="m-1 flex h-8 w-24 items-center justify-center rounded-md border-none bg-green-500 text-white"
                    onClick={() => {
                      if (isFull) {
                        setAlertOpen(true);
                        setTimeout(() => {
                          setAlertOpen(false);
                        }, 3000);
                      } else {
                        patchMeetingApproval(
                          applicant.meetingParticipantId,
                          meetingId,
                          true,
                        ).then(() => {
                          window.location.reload(); // 페이지 새로고침
                        });
                      }
                    }}
                  >
                    승인
                  </button>
                  <button
                    className="m-1 flex h-8 w-24 items-center justify-center rounded-md border-none bg-red-500 text-white"
                    onClick={() => {
                      patchMeetingApproval(
                        applicant.meetingParticipantId,
                        meetingId,
                        false,
                      ).then(() => {
                        window.location.reload(); // 페이지 새로고침
                      });
                    }}
                  >
                    거절
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Participants;

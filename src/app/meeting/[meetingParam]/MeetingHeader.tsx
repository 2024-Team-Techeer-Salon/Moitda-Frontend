/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable operator-linebreak */
import { meetingHeaderProps } from '@/types/meeting.ts';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mannerStatTranslate } from '@/util/utilFunction.ts';
import category from '@/util/category.json';
import {
  postMeetingJoin,
  patchEndMeeting,
  deleteMeeting,
} from '@/api/meetings.ts';
import Swal from 'sweetalert2';
import { useEffect, useRef } from 'react';

function MeetingHeader({
  title,
  meetingId,
  userId,
  userName,
  userImage,
  mannerStat,
  categoryId,
  address,
  place,
  addressDetail,
  meetingDate,
  isOwner,
  endTime,
  isParticipant,
}: meetingHeaderProps) {
  const date = new Date(meetingDate);
  const router = useRouter();
  const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  const detailsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        detailsRef.current &&
        !(detailsRef.current as HTMLElement).contains(event.target)
      ) {
        (detailsRef.current as HTMLElement).removeAttribute('open');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="flex h-full w-full flex-col items-center">
      {/* 모임 정보 상단 */}
      <div className="flex h-full w-full flex-row ">
        <div className="flex w-1/2 flex-col">
          {/* 날짜 */}
          <h1 className="ml-8 mt-8 text-lg font-bold">{formattedDate}</h1>
          {/* 제목 */}
          <h1 className="ml-8 mt-1 text-2xl">{title}</h1>
          {/* 카테고리 */}
          <p className="ml-8 mt-1 cursor-pointer text-sm font-light">
            # {category.category_name[categoryId]}
          </p>
          {/* 장소 */}
          <div className="flex flex-row">
            <p className="ml-8 mt-1 text-sm font-light">{address}</p>
            <p className="ml-1 mt-1 text-sm font-light">
              {addressDetail || place}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(address);
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                  },
                });
                Toast.fire({
                  icon: 'success',
                  title: '주소가 복사되었습니다.',
                });
              }}
              className="ml-1 mt-1 cursor-pointer text-sm font-light text-blue-500 underline"
            >
              주소복사
            </button>
          </div>
        </div>
        {/* 메뉴 버튼 */}
        {isOwner && (
          <div className="mr-10 mt-8 flex h-16 w-1/2 justify-end">
            <details
              ref={detailsRef}
              className="dropdown dropdown-end dropdown-bottom"
            >
              <summary className="btn btn-circle mt-1">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 bg-none"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* 추가된 부분: 점 세 개 */}
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="12" cy="18" r="1.5" fill="currentColor" />
                </svg>
              </summary>
              <ul className="menu dropdown-content z-[10] w-52 rounded-box bg-base-100 p-2 shadow">
                {!endTime && (
                  <li>
                    <a
                      onClick={() => {
                        router.push(`/posts?type=edit&meetingId=${meetingId}`);
                      }}
                    >
                      수정하기
                    </a>
                  </li>
                )}
                {!endTime && (
                  <li>
                    <a
                      onClick={() => {
                        Swal.fire({
                          title: '모임 완료',
                          text: '정말 모임을 완료 하시겠어요? 완료된 모임은 복구할 수 없습니다.',
                          icon: 'question',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: '완료',
                        }).then((result) => {
                          if (result.isConfirmed) {
                            patchEndMeeting(meetingId);
                            window.location.reload();
                            Swal.fire({
                              title: '모임 종료!',
                              text: '모임이 종료되었습니다.',
                              icon: 'success',
                            });
                          }
                        });
                      }}
                    >
                      모임완료
                    </a>
                  </li>
                )}
                <li>
                  <a
                    onClick={() => {
                      Swal.fire({
                        title: '모임 삭제',
                        text: '정말 모임을 삭제 하시겠어요? 삭제된 모임은 복구할 수 없습니다.',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: '삭제',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteMeeting(meetingId);
                          router.push('/home');
                          Swal.fire({
                            title: '삭제 완료!',
                            text: '모임이 삭제되었습니다.',
                            icon: 'success',
                          });
                        }
                      });
                    }}
                  >
                    모임삭제
                  </a>
                </li>
              </ul>
            </details>
          </div>
        )}
      </div>

      <div className="flew w-full flex-row ">
        <div className="flex w-full items-center">
          <div className="mt-4 flex w-5/6 flex-row items-start justify-start">
            <button
              className="flex flex-row "
              onClick={() => {
                router.push(`/account/${userId}`);
              }}
            >
              <figure className="relative ml-8 h-14 w-14 cursor-pointer rounded-full bg-pink-100">
                <Image
                  src={userImage}
                  alt="user image"
                  layout="fill"
                  objectFit="cover"
                  className="cursor-pointer rounded-full border-2 border-zinc-700"
                />
              </figure>
              <h1 className="cursur-pointer ml-3 mt-4 cursor-pointer text-lg font-light">
                {userName}
              </h1>
            </button>
            <div className="ml-10 mt-2 flex flex-col p-2">
              <div className="flex flex-row">
                <p className="w-full pl-1 text-sm font-light">매너스탯</p>
                <p className="w-full pr-2 text-right text-sm font-semibold">
                  {mannerStatTranslate(mannerStat)}
                </p>
              </div>
              <progress
                className="progress mt-1 h-1 w-60"
                value={mannerStat}
                max="100"
              />
            </div>
          </div>
          <div className="mr-12 flex w-1/6 flex-row items-center justify-end">
            {!(isOwner || endTime) && (
              <button
                className={`cursur-pointer h-10 w-32 rounded-md bg-black ${endTime ? 'bg-opacity-40' : ''} text-white`}
                disabled={Boolean(endTime || isParticipant)}
                onClick={() => {
                  Swal.fire({
                    title: '모임 신청',
                    text: '모임에 신청을 하시겠어요? 필요에 따라서 승인이 필요할 수 있어요!',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: '신청',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      postMeetingJoin(meetingId)
                        .then(() => {
                          window.location.reload();
                          Swal.fire({
                            title: '모임 신청 완료!',
                            text: '모임이 신청되었습니다. 승인이 날 때까지 기다려주세요!',
                            icon: 'success',
                          });
                        })
                        .catch(() => {
                          Swal.fire({
                            title: '모임 신청 실패!',
                            text: '모임 신청에 실패했습니다.',
                            icon: 'error',
                          });
                        });
                    }
                  });
                }}
              >
                {endTime
                  ? '모임 완료'
                  : isParticipant
                    ? '신청완료'
                    : '신청하기'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MeetingHeader;

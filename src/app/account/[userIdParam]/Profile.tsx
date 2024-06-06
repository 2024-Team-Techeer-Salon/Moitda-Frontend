/* eslint-disable no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable import/first */
/* eslint-disable no-empty */
/* eslint-disable import/no-duplicates */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */

'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { getUserInfo, putUserInfo } from '@/api/user.ts';
import { useQuery } from '@tanstack/react-query';
import { accountIdProps } from '@/types/account.ts';
import {
  defaultProfileImage,
  defaultBannerImage,
} from '@/util/utilFunction.ts';
import MannerStatBar from '@/app/components/MannerStatBar.tsx';
import { GpsIcon, CameraIcon } from '@/app/components/Icon.tsx';
import WarningAlert from '@/app/components/WarningAlert.tsx';

function Profile({ id }: accountIdProps) {
  // useState 훅
  const [previewBanner, setPreviewBanner] = useState<File | null>(null);
  const [previewProfile, setPreviewProfile] = useState<File | null>(null);
  const [name, setName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>(defaultBannerImage());
  const [profileUrl, setProfileUrl] = useState<string>(defaultProfileImage());
  const [location, setLocation] = useState<string>('');
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  // useRef 훅
  const nameRef = useRef<string>(name);
  const statusMessageRef = useRef<string>(statusMessage);
  const locationRef = useRef<string>(location);

  // useQuery 훅
  const { data, isLoading } = useQuery({
    queryKey: ['userInfo', id],
    queryFn: () => getUserInfo(id),
  });

  // useEffect 훅
  useEffect(() => {
    // 데이터 초기화
    if (data) {
      setBannerUrl(data.data.banner_image || defaultBannerImage());
      setProfileUrl(data.data.profile_image || defaultProfileImage());
      setName(data.data.username);
      setStatusMessage(data.data.introduce);
      setLocation(data.data.location);
    }
  }, [data]);

  const BannerImage = () => {
    const handleFileChange = (event: any) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setPreviewBanner(file);
      }
    };

    return (
      <div className="relative flex h-80 w-full items-center justify-center overflow-hidden">
        <figure>
          {!isLoading && (
            <Image
              src={
                previewBanner !== null
                  ? URL.createObjectURL(previewBanner)
                  : bannerUrl
              }
              alt="banner"
              layout="fill"
              objectFit="cover"
              className="absolute left-0 top-0 h-full w-full"
            />
          )}
        </figure>
        {isEdit && (
          <div className="z-10 flex h-full w-full cursor-pointer items-center justify-center bg-white bg-opacity-40">
            <label htmlFor="banner-file-upload" className="cursor-pointer">
              <CameraIcon className="cursor-pointer" />
            </label>
            <input
              id="banner-file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>
    );
  };

  const ProfileImage = () => {
    const handleFileChange = (event: any) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setPreviewProfile(file);
      }
    };

    return (
      <div className="z-10 flex w-[67.5rem] flex-col">
        <div className="-mt-2 flex h-full w-full flex-row items-end justify-start">
          <div className="flex w-2/3 flex-row items-center justify-start">
            <figure className="relative -mt-12 flex min-h-28 min-w-28 rounded-full bg-white">
              {isEdit && (
                <div className="z-20 flex h-28 w-28 cursor-pointer items-center justify-center rounded-full bg-white bg-opacity-40">
                  <label
                    htmlFor="profile-file-upload"
                    className="cursor-pointer"
                  >
                    <CameraIcon className="" />
                  </label>
                  <input
                    id="profile-file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </div>
              )}
              {!isLoading && (
                <Image
                  src={
                    previewProfile
                      ? URL.createObjectURL(previewProfile)
                      : profileUrl
                  }
                  alt=""
                  fill
                  className="z-0 rounded-full border-2 border-zinc-700"
                />
              )}
            </figure>
            <div className="flex items-center justify-center">
              {isEdit ? (
                <input
                  className="ml-3 flex h-10 max-w-44 items-center rounded-md border-2 border-zinc-300 p-2 text-2xl font-bold focus:outline-none"
                  defaultValue={name}
                  onChange={(e) => (nameRef.current = e.target.value)}
                  onBlur={() => {
                    if (nameRef.current !== '') {
                      setName(nameRef.current);
                    }
                  }}
                />
              ) : (
                <p className="ml-3 flex h-10 min-w-10 items-center border-2 border-white p-2 text-2xl font-bold">
                  {name}
                </p>
              )}
            </div>
            <div className="w-96">
              {!isEdit && <MannerStatBar mannerStat={data?.data.manner_stat} />}
            </div>
          </div>
          <div className="flex w-1/3 justify-end">
            {data?.data.owner && (
              <button
                className="flex h-10 w-32 items-center justify-center rounded-md bg-gray-200 text-gray-700"
                onClick={() => {
                  if (isEdit) {
                    const locationRegex = /^[가-힣]+시 [가-힣]+구$/;
                    if (name === '') {
                      setAlertMessage('이름을 입력해주세요');
                      setIsAlert(true);
                      setTimeout(() => {
                        setIsAlert(false);
                      }, 3000);
                      return;
                    }
                    if (!locationRegex.test(location.trim())) {
                      setAlertMessage('~시 ~구 형식으로 입력해주세요');
                      setIsAlert(true);
                      setTimeout(() => {
                        setIsAlert(false);
                      }, 3000);
                      return;
                    }
                    putUserInfo(
                      name,
                      data?.data.gender,
                      statusMessage,
                      location,
                      `"${profileUrl}"`,
                      `"${bannerUrl}"`,
                      previewProfile,
                      previewBanner,
                    ).then((data) => {
                      if (data.code === 'U004') {
                        setIsEdit(false); // 호출이 성공해야지 실행되게
                      }
                    });
                  } else {
                    setIsEdit(true);
                  }
                }}
              >
                {isEdit ? '수정 완료' : '프로필 편집'}
              </button>
            )}
          </div>
        </div>
        {/* 위치 */}
        <div
          className={`mt-2 flex items-center justify-start rounded-lg border-2 ${isEdit ? ' border-zinc-300' : 'border-white'}`}
        >
          <GpsIcon className="ml-3" />
          {isEdit ? (
            <input
              className="ml-3 h-10 w-full items-center justify-center rounded-lg p-2 font-bold focus:outline-none"
              defaultValue={location}
              onChange={(e) => (locationRef.current = e.target.value)}
              onBlur={() => {
                if (locationRef.current !== '') {
                  setLocation(locationRef.current);
                }
              }}
            />
          ) : (
            <p className="ml-3 h-10 w-full items-center p-2 font-bold">
              {location}
            </p>
          )}
        </div>

        {/* 소개 메세지 */}
        <div className="mt-2 flex justify-start">
          {isEdit ? (
            <input
              className="h-10 w-full items-center rounded-lg border-2 border-zinc-300 p-2 focus:outline-none"
              defaultValue={statusMessage}
              onChange={(e) => (statusMessageRef.current = e.target.value)}
              onBlur={() => {
                if (statusMessageRef.current !== '') {
                  setStatusMessage(statusMessageRef.current);
                }
              }}
            />
          ) : (
            <p className="h-10 w-full items-center border-2 border-white p-2">
              {statusMessage}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <WarningAlert showAlert={isAlert} errorMessage={alertMessage} />
      <BannerImage />
      <ProfileImage />
    </div>
  );
}

export default Profile;

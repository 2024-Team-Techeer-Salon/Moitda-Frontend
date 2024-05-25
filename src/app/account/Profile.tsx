/* eslint-disable import/first */
/* eslint-disable no-empty */
/* eslint-disable import/no-duplicates */
/* eslint-disable lines-around-directive */
/* eslint-disable no-unused-vars */

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { profileCheck, bannerCheck } from '@/api/check.ts';

function Profile() {
  const [uploadBannerFile, setUploadBannerFile] = useState<File | null>(null);
  const [previewBannerUrl, setPreviewBannerUrl] = useState<string | null>(null);
  const [uploadProfileFile, setUploadProfileFile] = useState<File | null>(null);
  const [previewProfileUrl, setPreviewProfileUrl] = useState<string | null>(
    null,
  );
  const [name, setName] = useState<string>('');
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [bannerUrl, setBannerUrl] = useState<string>(
    'https://i.ibb.co/vYGvV94/image.png',
  ); // 하드코딩한 상태, 추후 수정 필요
  const [profileUrl, setProfileUrl] = useState<string>(
    'https://i.ibb.co/mHD9S6z/01.png',
  ); // 하드코딩한 상태, 추후 수정 필요
  const [userProfile, setUserProfile] = useState<any>(null);
  const [bannerInfo, setBannerInfo] = useState<any>(null);

  useEffect(() => {
    async function checkData() {
      try {
        const userData = await profileCheck();
        setUserProfile(userData);
      } catch (error) {}

      try {
        const bannerData = await bannerCheck();
        setBannerInfo(bannerData);
      } catch (error) {}
    }

    checkData();
  }, []);

  const Banner = () => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setUploadBannerFile(file);
        setPreviewBannerUrl(URL.createObjectURL(file));
      }
    };

    const BannerImage = () => (
      <Image
        src={previewBannerUrl || bannerUrl}
        alt="banner"
        layout="fill"
        objectFit="cover"
        className="absolute left-0 top-0 h-full w-full"
      />
    );

    return (
      <div className="relative flex h-80 w-full items-center justify-center overflow-hidden">
        <BannerImage />
        {isEdit && (
          <div className="z-10">
            <label htmlFor="file-upload" className="cursor-pointer">
              <svg
                className="cursor-pointer"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" fill="none" />
                <path
                  d="M15.0858 3.58579C14.7107 3.21071 14.202 3 13.6716 3H10.3284C9.79799 3 9.28929 3.21071 8.91421 3.58579L8.08579 4.41421C7.71071 4.78929 7.20201 5 6.67157 5H5C3.89543 5 3 5.89543 3 7L3 17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H17.3284C16.798 5 16.2893 4.78929 15.9142 4.41421L15.0858 3.58579Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </label>
            <input
              id="file-upload"
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
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        setUploadProfileFile(file);
        setPreviewProfileUrl(URL.createObjectURL(file));
      }
    };

    const ProfileImageImage = () => (
      <Image
        src={previewProfileUrl || profileUrl}
        alt="profile"
        layout="fill"
        objectFit="cover"
        className="absolute left-0 top-0 h-full w-full"
      />
    );

    return (
      <div className="flex w-[67.5rem] flex-col">
        <div className="-mt-14 flex h-full w-full flex-row items-end justify-between">
          {/* <ProfileImageImage /> */}
          <div className="relative h-28 w-28 ">
            <Image
              src={profileUrl}
              alt="profile1"
              layout="fill"
              objectFit="cover"
              className="border-1 absolute left-0 top-0 h-full w-full rounded-full border border-zinc-800"
            />
          </div>
          {isEdit ? (
            <input
              className="ml-5 flex w-3/4 flex-row justify-start text-2xl font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <h1 className="ml-5 flex w-3/4 flex-row justify-start text-2xl font-bold">
              안나경
              {/* {name} */}
            </h1>
          )}
          <div className="flex justify-end">
            <button
              className="h-7 w-32 rounded-md bg-gray-200 text-gray-700 "
              onClick={() => {
                if (isEdit) {
                  // api호출 해야함
                  setIsEdit(false); // 호출이 성공해야지 실행되게
                } else {
                  setIsEdit(true);
                }
              }}
            >
              {isEdit ? '수정 완료' : '프로필 편집'}
            </button>
          </div>
        </div>
        <div className="mt-5">
          {isEdit ? (
            <input
              className="ml-3 w-full text-lg"
              value={statusMessage}
              onChange={(e) => setStatusMessage(e.target.value)}
            />
          ) : (
            <p className="ml-3">
              상태메시지
              {/* {statusMessage} */}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Banner />
      <ProfileImage />
    </div>
  );
}

export default Profile;

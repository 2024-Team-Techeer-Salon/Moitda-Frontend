/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable lines-around-directive */
/* eslint-disable spaced-comment */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const MainPage = () => {
  const [people, setPeople] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("대학교 MT 레전드 썰 풀어드립니다.");

  useEffect(() => {
    // 인원에 따라 이름을 추가 또는 제거하는 로직
    const generatePeople = () => {
      const totalPeople = 3;
      const newPeople = [];
      for (let i = 0; i < totalPeople; i++) {
        newPeople.push(`name${i + 1}`);
        // api 연동하면 push만
      }
      setPeople(newPeople);
    };

    generatePeople();
  }, []);

  const ProfileImage = () => (
    <img
      src="https://i.ibb.co/FKS02N6/profile.png"
      width={90}
      height={90}
      alt="profile1"
    />
  );

  const ClubImage = () => (
    <img
      src="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
      style={{ width: '6rem', height: '6rem', borderRadius: '1rem' }}
      alt="profile1"
    />
  );

  const HeartRating = () => (
    <div className="rating gap-1 mt-8">
      <input type="checkbox" name="rating-3" className="mask mask-heart bg-red-400" />
      <input type="checkbox" name="rating-3" className="mask mask-heart bg-red-400" />
      <input type="checkbox" name="rating-3" className="mask mask-heart bg-red-400" />
      <input type="checkbox" name="rating-3" className="mask mask-heart bg-red-400" />
      <input type="checkbox" name="rating-3" className="mask mask-heart bg-red-400" />
    </div>
  );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 mt-20">모임이 종료됐어요!</h1>
        <p className="text-xl text-gray-400 font-bold mb-16">즐거우셨나요? 모임과 참여자의 매너를 평가해 주세요!</p>

        <div className="flex flex-row justify-center ">
        <ClubImage />
          <div className="font-bold font-size 17 ml-10 mt-8 mb-16 mr-10">{title}</div>
          <HeartRating/>
        </div>
      </div>

      <div className="flex flex-col items-center mt-7">
        {people.map((person, index) => (
          <div className="flex flex-row justify-center w-full mb-5" key={index}>
            <ProfileImage />
              <div className="text-gray-600 mt-8 ml-8 mr-16">{person}</div>
              <HeartRating />
            </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-center mt-10">
        <Link className="w-28 h-9 border border-white rounded-lg border-2 text-center pt-1 pb-1 bg-gray-400 text-white mr-20" href="/home">
          취소
        </Link>
        <Link className="w-28 h-9 border border-white rounded-lg border-2 text-center pt-1 pb-1 bg-red-400 text-white" href="/home">
          등록
        </Link>
      </div>
    </div>
  );
};

export default MainPage;

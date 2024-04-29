/* eslint-disable lines-around-directive */
/* eslint-disable spaced-comment */
'use client';

import React, { useState, useEffect } from 'react';

const MainPage = () => {
  const [people, setPeople] = useState<string[]>([]);
  const [titile, setTitle] = useState<string>("대학교 MT 레전드 썰 풀어드립니다.");

  useEffect(() => {
    // 인원에 따라 이름을 추가 또는 제거하는 로직
    const generatePeople = () => {
      const totalPeople = 5;
      const newPeople = [];
      for (let i = 0; i < totalPeople; i++) {
        newPeople.push(`name${i + 1}`);
        // newPeople.push(heart);
        //api 연동하면 push만
      }
      setPeople(newPeople);
    };

    generatePeople();
  }, []);

  const heart = () => {
        <div className="rating gap-1">
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked />
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" />
        </div>
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-8 mt-20">모임이 종료됐어요!</h1>
        <p className="text-gray-600 mb-16">즐거우셨나요? 모임과 참여자의 매너를 평가해 주세요!</p>

        <div className="flex justify-center">
          <div className="font-bold font-size 17 mt-10 mb-16">{titile}</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {people.map((person, index) => (
          <div className="flex justify-center w-full mb-10" key={index}>
            <div className="text-gray-600 mr-20">{person}</div>
            <div className="rating gap-1">
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked />
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked/>
            <input type="radio" name="rating-3" className="mask mask-heart bg-red-400" checked/>
        </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */

'use client';

import React, { useState } from 'react';
import { accountIdProps } from '@/types/account.ts';
import CreatedComponent from './CreatedComponent.tsx';
import JoinedComponent from './JoinedComponent.tsx';

const Classification = ({ id }: accountIdProps) => {
  const [activeTab, setActiveTab] = useState<'joined' | 'created'>('joined');

  const handleTabClick = (tab: 'joined' | 'created') => {
    setActiveTab(tab);
  };

  const commonFontStyle =
    'cursor-pointer text-center font-inter text-lg font-medium border-b-2 flex flex-row justify-center items-center';
  const customStyle = 'w-1/2 h-16';

  const joinedMeetfont =
    activeTab === 'joined' ? 'text-black border-black' : 'text-gray-300';
  const createdMeetfont =
    activeTab === 'created' ? 'text-black border-black' : 'text-gray-300';

  const ClassBody = () => {
    if (activeTab === 'joined') {
      return <JoinedComponent />;
    }
    if (activeTab === 'created') {
      return <CreatedComponent />;
    }
    return null;
  };

  return (
    <div className="flex w-full flex-col justify-center">
      <div className="flex w-full flex-row justify-center p-20">
        <div
          className={`${commonFontStyle} ${customStyle} ${joinedMeetfont}`}
          onClick={() => handleTabClick('joined')}
        >
          <p>참여한 모임</p>
        </div>

        <div
          className={`${commonFontStyle} ${customStyle} ${createdMeetfont}`}
          onClick={() => handleTabClick('created')}
        >
          <p>생성한 모임</p>
        </div>
      </div>

      <div className="ml-16">
        <ClassBody />
      </div>
    </div>
  );
};

export default Classification;

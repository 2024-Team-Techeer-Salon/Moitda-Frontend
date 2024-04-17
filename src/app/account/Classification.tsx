'use client';

import React, { useState } from 'react';
import CreatedComponent from './CreatedComponent.tsx';
import JoinedComponent from './JoinedComponent.tsx';

const Classification = () => {
  const [activeTab, setActiveTab] = useState<'joined' | 'created'>('joined');

  const handleTabClick = (tab: 'joined' | 'created') => {
    setActiveTab(tab);
  };

  const commonFontStyle = 'cursor-pointer text-center font-inter text-lg font-medium border-b-2';

  const joinedMeetfont = activeTab === 'joined' ? 'text-black' : 'text-gray-300';
  const createdMeetfont = activeTab === 'created' ? 'text-black' : 'text-gray-300';

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
    <div className={`${commonFontStyle} flex justify-center`}>
      <div
        className={joinedMeetfont}
        onClick={() => handleTabClick('joined')}
      >
        <p>참여한 모임</p>
      </div>

      <div
        className={createdMeetfont}
        onClick={() => handleTabClick('created')}
      >
        <p>생성한 모임</p>
      </div>

      <div className="mt-2">
        <ClassBody />
      </div>
    </div>
  );
};

export default Classification;

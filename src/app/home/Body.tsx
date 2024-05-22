/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Latest from './Latest.tsx';
import Distance from './Distance.tsx';

function Body() {
  const [activeTab, setActiveTab] = useState<string>('latest');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const { register: registerSearch, handleSubmit: handleSubmitSearch } =
    useForm();

  const handleTabClick = (tabName: string) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
    }
  };

  const mainBody = () => {
    if (activeTab === 'latest') {
      return (
        <div className="flex w-full items-center justify-center">
          <Latest searchLocation={searchLocation} />
        </div>
      );
    }
    if (activeTab === 'distance') {
      return (
        <div className="flex w-full items-center justify-center">
          <Distance />
        </div>
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-row items-start justify-start p-12">
        {/* 탭 리스트 */}
        <div role="tablist" className="tabs tabs-bordered tabs-lg w-1/4">
          <input
            type="radio"
            name="latestTab"
            role="tab"
            className={`tab ${activeTab === 'latest' ? 'font-bold' : ''}`}
            aria-label="최신순"
            checked={activeTab === 'latest'}
            onChange={() => handleTabClick('latest')}
          />

          <input
            type="radio"
            name="distanceTab"
            role="tab"
            className={`tab ${activeTab === 'distance' ? 'font-bold' : ''}`}
            aria-label="거리순"
            checked={activeTab === 'distance'}
            onChange={() => handleTabClick('distance')}
          />
        </div>

        {/* 지역 검색 */}
        <div className="flex w-full flex-row items-center justify-end">
          {activeTab === 'latest' && (
            <form
              className="border-1 flex w-32 flex-row items-center rounded-lg border border-zinc-600"
              onSubmit={handleSubmitSearch(() => {
                setSearchLocation('localKeyword');
                console.log('localKeyword');
              })}
            >
              <input
                {...registerSearch('localKeyword', { required: true })}
                type="text"
                className="mx-2 h-full w-full focus:outline-none"
                placeholder="주소 입력"
                autoComplete="off"
              />
              <button type="submit">
                <svg
                  className="m-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-start">
        {mainBody()}
        {/* 강제로 지도 컴포넌트 렌더링 */}
        <div className="h-0 w-0 overflow-hidden">
          <Distance />
        </div>
      </div>
    </div>
  );
}

export default Body;

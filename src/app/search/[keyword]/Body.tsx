// 메인페이지 홈 바디 컴포넌트
/* eslint-disable consistent-return */

'use client';

import { useState } from 'react';
import LatestComponent from './Latest.tsx';
import DistanceComponent from './Distance.tsx';

function Body() {
  const [activeTab, setActiveTab] = useState<string>('latest');
  const [selectedTheme, setSelectedTheme] = useState<string>('지역 검색');

  const cityList = [
    '모든 지역',
    '서울',
    '경기',
    '인천',
    '강원',
    '대전/세종',
    '충남',
    '충북',
    '대구',
    '경북',
    '부산',
    '울산',
    '경남',
    '광주',
    '전남',
    '전북',
    '제주',
  ];

  const handleTabClick = (tabName: string) => {
    if (activeTab !== tabName) {
      setActiveTab(tabName);
    }
  };

  const handleThemeChange = (event: any) => {
    setSelectedTheme(event.target.value);
  };

  const mainBody = () => {
    if (activeTab === 'latest') {
      return (
        <div className="flex w-full items-center justify-center">
          <LatestComponent />
        </div>
      );
    }
    if (activeTab === 'distance') {
      return (
        <div className="flex w-full items-center justify-center">
          <DistanceComponent />
        </div>
      );
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-4 mt-10 flex w-full flex-row items-start justify-start p-2">
        {/* 탭 리스트 */}
        <div
          role="tablist"
          className="tabs tabs-bordered tabs-lg w-[20rem] sm:w-[20rem] md:w-1/2 lg:w-1/4"
        >
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

        {/* 지역 검색 드롭다운 */}
        <div className="flex w-full flex-row items-center justify-end">
          {activeTab === 'latest' && (
            <div className="dropdown dropdown-end dropdown-bottom">
              <div tabIndex={0} role="button" className="btn">
                {selectedTheme}
                <svg
                  className="inline-block h-2 w-2 fill-current opacity-60"
                  viewBox="0 0 2048 2048"
                >
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow-2xl"
              >
                {cityList.map((district, index) => (
                  <li key={`${index}`}>
                    <input
                      type="radio"
                      name="theme-dropdown"
                      className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                      aria-label={`${district}`}
                      value={`${district}`}
                      onChange={handleThemeChange}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-start justify-start">
        {mainBody()}
        {/* 강제로 지도 컴포넌트 렌더링 */}
        <div className="h-0 w-0 overflow-hidden">
          <DistanceComponent />
        </div>
      </div>
    </div>
  );
}

export default Body;

/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */

'use client';

import React, { useState, useEffect } from 'react';

function RegionList() {
  const [sidoList, setSidoList] = useState([]);
  const [selectedSido, setSelectedSido] = useState('');
  const [guGunList, setGuGunList] = useState([]);

  useEffect(() => {
    const allSido = [
      '서울특별시',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '경기도',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도',
    ];
    setSidoList(allSido);
  }, []);

  const handleSidoChange = (event) => {
    const selected = event.target.value;
    setSelectedSido(selected);
    const allGuGun = {
      서울특별시: [
        '강남구',
        '강동구',
        '강북구',
        '강서구',
        '관악구',
        '광진구',
        '구로구',
        '금천구',
        '노원구',
        '도봉구',
        '동대문구',
        '동작구',
        '마포구',
        '서대문구',
        '서초구',
        '성동구',
        '성북구',
        '송파구',
        '양천구',
        '영등포구',
        '용산구',
        '은평구',
        '종로구',
        '중구',
        '중랑구',
      ],
      부산광역시: [
        '강서구',
        '금정구',
        '남구',
        '동구',
        '동래구',
        '부산진구',
        '북구',
        '사상구',
        '사하구',
        '서구',
        '수영구',
        '연제구',
        '영도구',
        '중구',
        '해운대구',
      ],
      // 나머지 시/도와 구/군 데이터를 추가
    };
    setGuGunList(allGuGun[selected] || []);
  };

  return (
    <div>
      <h1>대한민국 행정구역 정보</h1>

      <label>
        시/도 선택:
        <select value={selectedSido} onChange={handleSidoChange}>
          <option value="">시/도를 선택하세요</option>
          {sidoList.map((sido) => (
            <option key={sido} value={sido}>
              {sido}
            </option>
          ))}
        </select>
      </label>

      {selectedSido && (
        <div onChange={(e) => setSidoList(e.target.value)}>
          <h2>{selectedSido}의 구/군 리스트</h2>
          <ul>
            {guGunList.map((guGun) => (
              <li key={guGun}>{guGun}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RegionList;

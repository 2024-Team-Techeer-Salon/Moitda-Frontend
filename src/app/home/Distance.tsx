/* eslint-disable operator-linebreak */
/* eslint-disable @next/next/no-sync-scripts */

'use client';

import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';
import Image from 'next/image'; // Import the Image component

function DistanceComponent() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex flex-row justify-center items-center">
        <div className="flex flex-col w-60 h-[28rem] border m-4 border-zinc-300">
          <div className="flex w-60 h-60">
            <Image
              src="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
              width={1000}
              height={1000}
              className="relative object-cover"
              alt="Image"
            />
          </div>
          <div className="flex flex-col h-full justify-around p-2 py-8">
            {' '}
            <p className="text-lg font-bold">4월 8일 월요일 16:00</p>
            <p className="text-xl">모각코 할 사람!</p>
            <p className="text-sm text-zinc-400">
              경기 수원시 장안구 경수대로 831
            </p>
            <p className="text-sm text-zinc-400">(스타벅스 수원조원 DT점)</p>
            <p className="text-sm text-zinc-400">#공부</p>
          </div>
        </div>
        <div
          className="w-[50rem] h-[28rem] border border-zinc-300 m-4"
          id="map"
        >
          <Script
            src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
            strategy="beforeInteractive"
          />
          <Map
            center={{ lat: 33.450701, lng: 126.570667 }}
            style={{ width: '100%', height: '100%' }}
          ></Map>
        </div>
      </div>
    </div>
  );
}

export default DistanceComponent;

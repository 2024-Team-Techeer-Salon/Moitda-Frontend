/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable no-console */

'use client';

import Script from 'next/script';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Image from 'next/image';
import { useEffect, useState } from 'react';

function Distance() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

    function successCallback(position) {
      console.log('Latitude: ' + position.coords.latitude);
      console.log('Longitude: ' + position.coords.longitude);
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    }

    function errorCallback(error) {
      console.error('Error Code = ' + error.code + ' - ' + error.message);
    }
  }, []);

  const locPosition =
    latitude && longitude ? { lat: latitude, lng: longitude } : null;

  return (
    <div className="mt-[-0.5rem] flex h-full w-[30rem] flex-col sm:w-[30rem] md:w-[43rem] lg:w-[65rem]">
      <div className="flex flex-row items-center justify-center">
        <div className="m-4 flex h-[28rem] w-60 flex-col border border-zinc-300">
          <div className="relative flex h-60 w-60">
            <Image
              src="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
              layout="fill"
              objectFit="cover"
              alt="Image"
            />
          </div>
          <div className="flex h-full flex-col justify-around p-2 py-8">
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
          className="m-4 h-[28rem] w-[50rem] border border-zinc-300"
          id="map"
        >
          <Script
            src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
            strategy="beforeInteractive"
          />
          {locPosition ? (
            <Map
              center={locPosition}
              style={{ width: '100%', height: '100%' }}
              level={3}
            >
              <MapMarker position={locPosition} />
            </Map>
          ) : (
            <p className="flex items-center justify-center">Loading map...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Distance;

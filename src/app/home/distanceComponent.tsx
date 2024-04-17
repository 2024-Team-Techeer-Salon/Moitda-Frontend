/* eslint-disable operator-linebreak */
/* eslint-disable @next/next/no-sync-scripts */

'use client';

import Script from 'next/script';
import { Map } from 'react-kakao-maps-sdk';

function DistanceComponent() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-96 h-96" id="map">
        <Script
          src={process.env.NEXT_PUBLIC_KAKAO_SDK_URL}
          strategy="beforeInteractive"
        />
        <Map
          center={{ lat: 33.450701, lng: 126.570667 }}
          style={{ width: '100%', height: '100%' }}
        ></Map>
        asdf
      </div>
    </div>
  );
}

export default DistanceComponent;

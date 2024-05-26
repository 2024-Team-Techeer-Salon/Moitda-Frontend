import { bannerImageProps } from '@/types/meeting.ts';
import Image from 'next/image';
import { useState } from 'react';

function BannerImage({ imageURL, endTime }: bannerImageProps) {
  const [pageIndex, setPageIndex] = useState<number>(0);

  return (
    <div className="flex h-96 w-full items-center justify-between bg-zinc-200">
      <button
        className="absolute left-12 z-20 flex h-12 w-12 items-center justify-center rounded-full border-none bg-black bg-opacity-20 text-white hover:bg-opacity-30"
        onClick={() => {
          if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
          }
        }}
      >
        <svg
          className="h-6 w-6 rotate-180 transform"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="relative h-full w-full flex-shrink-0 overflow-hidden ">
        {endTime && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-70 text-3xl text-zinc-200">
            이미 종료된 모임입니다.
          </div>
        )}
        <div
          className="absolute flex h-full w-full transform flex-row transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${pageIndex * 100}%)` }}
        >
          {imageURL.map((url, index) => (
            <button
              onClick={() => {
                window.location.href = url.imageUrl;
              }}
              key={index}
              className="relative h-full w-full flex-shrink-0"
            >
              <Image
                src={url.imageUrl}
                alt={`meeting image ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      </div>
      <button
        className="absolute right-12 z-20 flex h-12 w-12 items-center justify-center rounded-full border-none bg-black bg-opacity-20 text-white hover:bg-opacity-30"
        onClick={() => {
          if (pageIndex < imageURL.length - 1) {
            setPageIndex(pageIndex + 1);
          }
        }}
      >
        <svg className="h-6 w-6 transform" fill="none" stroke="currentColor">
          <path strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default BannerImage;

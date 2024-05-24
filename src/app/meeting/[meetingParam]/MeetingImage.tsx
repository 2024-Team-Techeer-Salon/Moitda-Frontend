import { meetingImageProps } from '@/types/meeting.ts';
import Image from 'next/image';

function MeetingImage({ imageURL }: meetingImageProps) {
  return (
    <div className="flex h-96 w-full items-center justify-between bg-zinc-200 px-4">
      <button className="btn btn-circle border-none bg-black bg-opacity-20 text-white">
        <svg
          className="h-6 w-6 rotate-180 transform"
          fill="none"
          stroke="currentColor"
        >
          <path strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <div className="relative flex h-96 w-full overflow-hidden">
        {/* <Image
          src={imageURL}
          alt="meeting image"
          layout="fill"
          objectFit="cover"
        /> */}
      </div>
      <button className="btn btn-circle border-none bg-black bg-opacity-20 text-white">
        <svg className="h-6 w-6 transform" fill="none" stroke="currentColor">
          <path strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default MeetingImage;

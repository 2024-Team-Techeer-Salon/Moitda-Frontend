/* eslint-disable object-curly-newline */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { postProps } from '../../types/post.ts';

function Post({ titleImage, title, location, meetingId, endTime }: postProps) {
  return (
    <Link
      className="m-4 flex cursor-pointer flex-col justify-center"
      href={`/meeting/${meetingId}`}
    >
      <figure className="relative flex h-32 w-32 rounded-lg shadow-xl sm:h-40 sm:w-40 md:h-48 md:w-48 lg:h-56 lg:w-56">
        <Image
          src={titleImage}
          alt={titleImage}
          className="relative rounded-lg object-cover"
          fill
          sizes="100vm"
        />
        {endTime && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-70 text-xl text-zinc-200">
            이미 종료된 모임입니다.
          </div>
        )}
      </figure>
      <p className="pt-1 text-lg font-bold">{title}</p>
      <p className="text-sm">{location}</p>
    </Link>
  );
}

export default Post;

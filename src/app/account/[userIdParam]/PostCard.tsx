'use client';

import Image from 'next/image';
import Link from 'next/link';
import { postProps } from '../../../types/post.ts';

function PostCard({ titleImage, title, location, like }: postProps) {
  return (
    <Link
      className="m-4 flex cursor-pointer flex-col justify-center"
      href={`/meetingdetails/${title}`}
    >
      <div className="flex h-56 w-56">
        <Image
          src={titleImage}
          alt={titleImage}
          className="relative rounded-lg object-cover"
          width={10000}
          height={10000}
          //   layout="responsive"
        />
      </div>
      <p className="pt-1 text-lg font-bold">{title}</p>
      <p className="text-sm">{location}</p>

      <div className="flex flex-row items-center">
        <svg className="h-4 w-4 fill-current text-red-300" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <p className="pl-1 text-sm">{like}</p>
      </div>
    </Link>
  );
}

export default PostCard;

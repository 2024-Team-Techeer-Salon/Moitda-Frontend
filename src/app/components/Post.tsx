/* eslint-disable object-curly-newline */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { postProps } from '../../types/post.ts';

function Post({ titleImage, title, location, like }: postProps) {
  return (
    <Link
      className="m-2 flex cursor-pointer flex-col justify-center"
      href={`/meetingdetails/${title}`}
    >
      <figure className="relative flex h-32 w-32 sm:h-52 sm:w-52 md:h-52 md:w-52 lg:h-60 lg:w-60">
        <Image
          src={titleImage}
          alt={titleImage}
          className="relative rounded-lg object-cover "
          layout="fill"
          objectFit="cover"
        />
      </figure>
      <p className="pt-1 text-lg font-bold ">{title}</p>
      <p className="text-sm ">{location}</p>

      <div className="flex flex-row items-center">
        <svg
          className="h-4 w-4 fill-current text-pink-200 "
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
        <p className="pl-1 text-sm">{like}</p>
      </div>
    </Link>
  );
}

export default Post;

/* eslint-disable object-curly-newline */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { postProps } from '../../types/post.ts';

function Post({ titleImage, title, location, meetingId }: postProps) {
  return (
    <Link
      className="m-4 flex cursor-pointer flex-col justify-center"
      href={`/meeting/${meetingId}`}
    >
      <figure className="relative flex h-32 w-32 sm:h-52 sm:w-52 md:h-52 md:w-52 lg:h-60 lg:w-60">
        <Image
          src={titleImage}
          alt={titleImage}
          className="relative rounded-lg object-cover "
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="pt-1 text-lg font-bold">{title}</p>
      <p className="text-sm">{location}</p>
    </Link>
  );
}

export default Post;

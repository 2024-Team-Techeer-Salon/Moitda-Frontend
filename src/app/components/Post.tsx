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
      <div className="flex h-56 w-56">
        <Image
          src={titleImage}
          alt={titleImage}
          className="relative rounded-lg object-cover"
          width={10000}
          height={10000}
        />
      </div>
      <p className="pt-1 text-lg font-bold">{title}</p>
      <p className="text-sm">{location}</p>
    </Link>
  );
}

export default Post;

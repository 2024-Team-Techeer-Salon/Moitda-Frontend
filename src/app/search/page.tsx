/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import category from '@/util/category.json';
import Image from 'next/image';

function page() {
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState<string>('keyword'); // category or keyword
  const [searchKeyword, setSearchKeyword] = useState<string>(''); // keyword or category id

  useEffect(() => {
    const type = searchParams?.get('searchType');
    const keyword = searchParams?.get('searchKeyword');
    if (type && keyword) {
      setSearchType(type);
      setSearchKeyword(keyword);
    }
  }, [searchParams]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[67.5rem] flex-col items-center justify-start pt-8">
        {searchType === 'category' ? (
          <div className="flex w-full flex-row items-center justify-start text-2xl">
            <figure className="relative m-6 flex h-32 w-32">
              <Image
                src={category.category_image[Number(searchKeyword)]}
                alt="category icon"
                className="rounded-full border border-gray-300"
                layout="fill"
                objectFit="cover"
              />
            </figure>
            <span className="text-4xl font-bold">
              #{category.category_name[Number(searchKeyword)]}
            </span>
          </div>
        ) : (
          <div className="flex w-full flex-row items-center justify-center text-2xl">
            <span className="text-4xl font-bold">
              &quot;{searchKeyword}&quot;&nbsp;
            </span>
            검색 결과
          </div>
        )}
        <div className="flex h-full w-full flex-col items-center justify-center">
          {/* <Body /> */}
        </div>
      </div>
    </div>
  );
}

export default page;

// header(네비게이션) 컴포넌트

'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import category from '@/util/category.json';
import ignorePath from '../styles/ignorePath.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Header() {
  const [isLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const path = usePathname() || '';

  if (ignorePath().includes(path)) {
    return null;
  }

  // input 값이 변경될 때마다 상태 업데이트
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchQuery(event.target.value);
  };

  // form 제출 시 검색 실행
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault(); // 기본 제출 동작 방지
    if (searchQuery) {
      // 검색 실행 시 /search/{사용자가 작성한 글} 경로로 이동
      router.push(`/search/${searchQuery}`);
    }
  };

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <div>
      {/* 메뉴가 열렸을 때, 메뉴 영역 외의 배경을 어둡게 처리하기 위한 div */}
      <div
        onClick={() => setOpenMenu(false)}
        className={'fixed left-0 top-0 h-full w-full bg-zinc-600'}
        style={{
          opacity: openMenu ? '0.7' : '0',
          transition: 'opacity 0.4s ease-in-out',
          zIndex: openMenu ? 60 : -1,
        }}
      />

      {/* 메뉴 */}
      <div
        className={'fixed left-0 top-0 flex h-full w-80 flex-col bg-white'}
        style={{
          transform: openMenu ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s ease-in-out', // 추가: 슬라이딩 애니메이션 효과를 위한 transition
          zIndex: 70,
        }}
      >
        {/* 메뉴 헤더 */}
        <div>
          <div className="flex h-20 w-full flex-row items-center">
            <button
              className="ml-4 flex h-12 w-12 items-center justify-center rounded-full font-bold hover:bg-zinc-500 hover:bg-opacity-5"
              onClick={() => setOpenMenu(false)}
            >
              <svg className="h-6 w-6 cursor-pointer" viewBox="0 0 512 512">
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>
            <Link
              className="flex cursor-pointer flex-row items-center pl-4 text-xl"
              href="/"
              onClick={() => setOpenMenu(false)}
            >
              <h1 className={mont.className}>MOITDA</h1>
            </Link>
          </div>
        </div>

        {/* 메뉴 바디 */}
        <div className="flex h-full w-full flex-col px-4 pt-[20%]">
          <Link
            className="p-2 text-lg font-bold"
            href="/posts"
            onClick={() => setOpenMenu(false)}
          >
            모임 생성
          </Link>
          <Link
            className="p-2 text-lg font-bold"
            href="/chat"
            onClick={() => setOpenMenu(false)}
          >
            채팅
          </Link>
          <div
            className="flex cursor-pointer flex-row items-center p-2 text-lg font-bold"
            onClick={toggleCategories}
          >
            <p className="flex w-full">카테고리</p>
            <span
              className={`flex transform justify-end transition-transform duration-300 ${
                openCategories ? 'rotate-180' : ''
              }`}
            >
              <svg
                className="inline-block h-2 w-2 fill-current opacity-60"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
              </svg>
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openCategories ? 'max-h-48' : 'max-h-0'
            } overflow-y-scroll`}
          >
            <div className="flex flex-col">
              {category.category_name.map((item: string, index: number) => (
                <Link
                  key={index}
                  href={`/category/${index}`}
                  className="text-md p-2"
                  onClick={() => setOpenMenu(false)}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <Link
            className="p-2 text-lg font-bold"
            href="/account"
            onClick={() => setOpenMenu(false)}
          >
            마이페이지
          </Link>
        </div>

        {/* 메뉴 푸터 */}
        <Link
          href={isLogin ? '/logout' : '/login'}
          className="m-8 flex h-12 w-full flex-col"
        >
          {isLogin ? '로그아웃' : '로그인'}
        </Link>
      </div>
      {/* 헤더 */}
      <div className="flex h-20 w-full flex-row items-center justify-center">
        <div className="flex w-1/6 items-center justify-start">
          <button
            className="ml-4 flex h-12 w-12 items-center justify-center rounded-full font-bold hover:bg-zinc-500 hover:bg-opacity-5"
            onClick={() => setOpenMenu(true)}
          >
            <svg className="h-6 w-6 cursor-pointer" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </button>
          <Link
            className="flex cursor-pointer flex-row items-center pl-4 text-xl"
            href="/"
          >
            <h1 className={mont.className}>MOITDA</h1>
          </Link>
        </div>
        <div className="flex w-full items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex h-12 w-1/2 items-center rounded-lg bg-gray-300 bg-opacity-15 px-2 hover:bg-opacity-25"
          >
            {/* 돋보기 아이콘 */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              className="w-full bg-transparent px-2 outline-none"
              placeholder="어떤 모임을 찾으시나요?"
              value={searchQuery}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="flex w-1/6 items-center justify-end pr-8">
          {isLogin ? (
            <Image
              src="https://i.ibb.co/kyrZGk4/fhrh.png"
              alt="profile"
              width={50}
              height={50}
              className="rounded-full"
            />
          ) : (
            <Link href="/login"> 로그인 </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

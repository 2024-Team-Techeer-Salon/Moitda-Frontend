// header(네비게이션) 컴포넌트

'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ignorePath from '../styles/ignorePath.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Header() {
  const [isLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const logo = 'https://i.ibb.co/kyrZGk4/fhrh.png';
  const router = useRouter();
  const path = usePathname();

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
        className={'fixed top-0 left-0 w-full h-full bg-zinc-600'}
        style={{
          opacity: openMenu ? '0.7' : '0',
          transition: 'opacity 0.4s ease-in-out',
          zIndex: openMenu ? 60 : -1,
        }}
      />

      {/* 메뉴 */}
      <div
        className={'fixed top-0 left-0 h-full w-80 bg-white flex flex-col'}
        style={{
          transform: openMenu ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s ease-in-out', // 추가: 슬라이딩 애니메이션 효과를 위한 transition
          zIndex: 70,
        }}
      >
        {/* 메뉴 헤더 */}
        <div>
          <div className="flex flex-row items-center w-full h-20">
            <button
              className="w-12 h-12 ml-4 font-bold flex justify-center items-center rounded-full hover:bg-zinc-500 hover:bg-opacity-5"
              onClick={() => setOpenMenu(false)}
            >
              <svg className="w-6 h-6 cursor-pointer" viewBox="0 0 512 512">
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </button>
            <Link
              className="pl-4 flex flex-row items-center text-xl cursor-pointer"
              href="/"
              onClick={() => setOpenMenu(false)}
            >
              <Image src={logo} alt="logo" width={50} height={50} />
              <h1 className={mont.className}>MOITDA</h1>
            </Link>
          </div>
        </div>
        {/* 메뉴 바디 */}
        <div className="flex flex-col w-full h-full px-4 pt-[20%]">
          <Link className="text-lg p-2 font-bold" href="/write">
            모임 생성
          </Link>
          <Link className="text-lg p-2 font-bold" href="/chat">
            채팅
          </Link>
          <div
            className="flex flex-row text-lg p-2 font-bold cursor-pointer items-center"
            onClick={toggleCategories}
          >
            <p className="flex w-full">카테고리</p>
            <span
              className={`flex justify-end transition-transform duration-300 transform ${
                openCategories ? 'rotate-180' : ''
              }`}
            >
              <svg
                className="h-2 w-2 fill-current opacity-60 inline-block"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
              </svg>
            </span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openCategories ? 'max-h-48' : 'max-h-0'
            }`}
          >
            <div className="flex flex-col">
              <Link className="text-md text-gray-500 p-2" href="/category1">
                - 카테고리 1
              </Link>
              <Link className="text-md text-gray-500 p-2" href="/category2">
                - 카테고리 2
              </Link>
              <Link className="text-md text-gray-500 p-2" href="/category3">
                - 카테고리 3
              </Link>
              <Link className="text-md text-gray-500 p-2" href="/category4">
                - 카테고리 4
              </Link>
            </div>
          </div>
          <Link className="text-lg p-2 font-bold" href="/account">
            마이페이지
          </Link>
        </div>

        {/* 메뉴 푸터 */}
        <Link
          href={isLogin ? '/logout' : '/login'}
          className="flex flex-col w-full h-12 m-8"
        >
          {isLogin ? '로그아웃' : '로그인'}
        </Link>
      </div>
      {/* 헤더 */}
      <div className="flex flex-row justify-center items-center w-full h-20">
        <div className="flex justify-start items-center w-1/6">
          <button
            className="w-12 h-12 ml-4 font-bold flex justify-center items-center rounded-full hover:bg-zinc-500 hover:bg-opacity-5"
            onClick={() => setOpenMenu(true)}
          >
            <svg className="w-6 h-6 cursor-pointer" viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </button>
          <Link
            className="pl-4 flex flex-row items-center text-xl cursor-pointer"
            href="/"
          >
            <Image src={logo} alt="logo" width={50} height={50} />
            <h1 className={mont.className}>MOITDA</h1>
          </Link>
        </div>
        <div className="flex w-full justify-center items-center">
          <form
            onSubmit={handleSubmit}
            className="flex bg-opacity-15 items-center rounded-lg h-12 hover:bg-opacity-25 w-1/2 bg-gray-300 px-2"
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
              className="w-full bg-transparent outline-none px-2"
              placeholder="어떤 모임을 찾으시나요?"
              value={searchQuery}
              onChange={handleChange}
            />
          </form>
        </div>
        <div className="flex justify-end items-center w-1/6 pr-8">
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

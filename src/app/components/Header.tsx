'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { Montserrat } from 'next/font/google';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import category from '@/util/category.json';
import { useQuery } from '@tanstack/react-query';
import { login, logout } from '@/api/user.ts';
import ignorePath from '../styles/ignorePath.ts';
import { removeCookie } from '../cookies.tsx';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const path = usePathname() || '';

  const { data } = useQuery({
    queryKey: ['login'],
    queryFn: login,
  });

  if (ignorePath().includes(path)) {
    return null;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) {
      // 검색 실행 시 /search/{사용자가 작성한 글} 경로로 이동
      router.push(`/search?searchType=keyword&searchKeyword=${searchQuery}`);
    }
    setIsModalOpen(false); // 검색 시 모달 닫기
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            href="/posts?type=create"
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
            onClick={() => {
              setOpenCategories(!openCategories);
            }}
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
                  href={`search?searchType=category&searchKeyword=${index}`}
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
        <button
          className="m-8 flex h-12 w-full flex-col"
          onClick={() => {
            if (data) {
              logout();
              removeCookie('accessToken');
              removeCookie('refreshToken');
              window.location.reload();
            } else {
              router.push('/login');
            }
          }}
        >
          {data ? '로그아웃' : '로그인'}
        </button>
      </div>

      {/* 검색 모달 */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative rounded-lg bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않도록 함
          >
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                className=" rounded-lg border border-gray-300 p-2"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="ml-2 rounded-lg bg-black p-2 text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

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
            className="hidden h-12 items-center rounded-lg bg-opacity-15 px-2 sm:flex sm:w-1/2 sm:bg-gray-100 md:bg-gray-100 lg:w-1/2 lg:bg-gray-100"
          >
            {/* 돋보기 아이콘 */}
            <svg
              className="ml-44 h-6 w-6 sm:ml-0 lg:ml-0"
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
              className="w-0 text-zinc-100 sm:w-full sm:bg-transparent md:w-full lg:w-full lg:bg-transparent lg:px-2 lg:outline-none"
              placeholder="어떤 모임을 찾으시나요?"
              value={searchQuery}
              onChange={handleChange}
            />
          </form>
          <svg
            className="ml-4 h-6 w-6 cursor-pointer sm:hidden"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={openModal} // 모바일에서 아이콘 클릭 시 모달 열기
          >
            <path
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex w-[28] items-center justify-end pr-8 sm:w-1/6 lg:w-1/6">
          <button
            onClick={() => {
              if (data) {
                logout();
                removeCookie('accessToken');
                removeCookie('refreshToken');
                window.location.reload();
              } else {
                router.push('/login');
              }
            }}
          >
            {data ? '로그아웃' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

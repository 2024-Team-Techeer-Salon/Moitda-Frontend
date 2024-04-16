// header(네비게이션) 컴포넌트

'use client';

import { ThemeProvider } from '@emotion/react';
import { Montserrat } from 'next/font/google';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import theme from '../styles/muiTheme.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Header() {
  const [isLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const logo = 'https://i.ibb.co/kyrZGk4/fhrh.png';
  const router = useRouter();
  const path = usePathname();

  // 만약 로그인 페이지이면 Header를 숨깁니다.
  if (path === '/login' || path === '/signup' || path === '/introduce') {
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

    // 검색 실행 시 /search/{사용자가 작성한 글} 경로로 이동
    router.push(`/search/${searchQuery}`);
  };

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  return (
    <ThemeProvider theme={theme}>
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
            <IconButton
              onClick={() => setOpenMenu(false)}
              className="ml-2"
              size="large"
              aria-label="open menu"
            >
              <CloseIcon />
            </IconButton>
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
            className="flex flex-row text-lg p-2 font-bold cursor-pointer"
            onClick={toggleCategories}
          >
            <p className="flex w-full">카테고리</p>
            <span
              className={`flex justify-end transition-transform duration-300 transform ${
                openCategories ? 'rotate-180' : ''
              }`}
            >
              <ArrowDropDownIcon />
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
          <IconButton
            onClick={() => setOpenMenu(true)}
            className="ml-2"
            size="large"
            aria-label="open menu"
          >
            <MenuIcon />
          </IconButton>
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
            <SearchIcon />
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
    </ThemeProvider>
  );
}

export default Header;

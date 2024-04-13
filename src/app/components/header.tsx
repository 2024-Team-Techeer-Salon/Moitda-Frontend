// header(네비게이션) 컴포넌트

'use client';

import { ThemeProvider } from '@emotion/react';
import { Montserrat } from 'next/font/google';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import theme from '../styles/muiTheme.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const path = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-row justify-center items-center w-full h-20">
        <div className="flex justify-start items-center w-1/6">
          <IconButton className="ml-2" size="large" aria-label="open menu">
            <MenuIcon />
          </IconButton>
          <Link
            className="pl-8 flex flex-row items-center text-xl cursor-pointer"
            href="/"
          >
            <Image
              src="https://i.ibb.co/kyrZGk4/fhrh.png"
              alt="logo"
              width={50}
              height={50}
            />
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

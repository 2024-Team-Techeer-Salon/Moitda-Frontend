'use client';

import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import ignorePath from '../styles/ignorePath.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Footer() {
  const path = usePathname();
  if (ignorePath().includes(path) || path === '/chat') {
    return null;
  }
  return (
    <div className="mt-20 flex h-60 w-full flex-col justify-center bg-zinc-200 px-10 sm:px-20 md:px-40 lg:px-64">
      <h1 className={mont.className}>
        <span className="text-lg sm:text-lg md:text-2xl">MOITDA</span>
      </h1>
      <div className="text-sm md:text-base">
        <br />
        모임을 만들고 <br />
        잇다
        <br />
        간편 만남 서비스, 모잇다
      </div>
      <div className="flex w-full justify-end text-sm font-extrabold sm:text-lg md:text-xl">
        <span className="text-sm font-medium sm:text-lg md:text-xl">
          Team&nbsp;
        </span>
        Techeer Salon
      </div>
    </div>
  );
}

export default Footer;

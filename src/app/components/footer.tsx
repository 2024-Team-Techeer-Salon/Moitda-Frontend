'use client';

import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import ignorePath from '../styles/ignorePath.ts';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

function Footer() {
  const path = usePathname();
  if (ignorePath().includes(path)) {
    return null;
  }
  return (
    <div className="flex flex-col mt-20 px-64 justify-center bg-zinc-200 w-full h-60">
      <h1 className={mont.className}>
        <span className="text-2xl">MOITDA</span>
      </h1>
      <br />
      모임을 만들고 <br />
      잇다 <br />
      간편 만남 서비스, 모잇다
      <div className="flex w-full justify-end text-xl font-extrabold">
        <span className="text-xl font-medium">Team&nbsp;</span>
        Techeer Salon
      </div>
    </div>
  );
}

export default Footer;

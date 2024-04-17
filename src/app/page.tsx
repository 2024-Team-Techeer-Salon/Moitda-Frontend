// 메인 페이지 컴포넌트

'use server';

import Link from 'next/link';

const Home = async () => (
  <div className="flex flex-col w-full h-screen">
    <h1 className="text-2xl">Moitda 프로젝트입니다.</h1>
    <Link className="text-blue-600" href="/home">
      home으로 가기
    </Link>
  </div>
);

export default Home;

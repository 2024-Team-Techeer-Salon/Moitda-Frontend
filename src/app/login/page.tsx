import { Montserrat } from 'next/font/google';
import Google from './Google.tsx';
import Kakao from './Kakao.tsx';
import Naver from './Naver.tsx';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

async function page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className={`mt-28 text-center text-8xl ${mont.className}`}>MOITDA</h1>
      <div className="mt-4 flex items-center">
        <div className="mb-10 w-40 border-b border-gray-300"></div>
        <p className="mx-4 mb-10 text-center text-gray-300">소셜 로그인</p>
        <div className="mb-10 w-40 border-b border-gray-300"></div>
      </div>

      {/* 구글 로그인 버튼 */}
      <Google />

      {/* 카카오 로그인 버튼 */}
      <Kakao />

      {/* 네이버 로그인 버튼 */}
      <Naver />
    </div>
  );
}

export default page;

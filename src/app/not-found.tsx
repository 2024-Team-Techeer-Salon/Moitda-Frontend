/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable quotes */
import Link from 'next/link';
import Head from 'next/head';
import { Montserrat } from 'next/font/google';

const mont = Montserrat({ subsets: ['latin'], weight: ['500'] });

export default function Notfound() {
  return (
    <div className="-mb-20 flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-blue-200">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={mont.className}>
        <div className="text-center">
          <h1 className="animate-bounce font-montserrat text-9xl text-black">
            404
          </h1>
          <h2 className="font-montserrat text-5xl text-black">
            Page Not Found
          </h2>
          <p className="mt-8 text-xl font-semibold text-black">
            죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.
          </p>
          <p className="mt-4 text-zinc-400">
            존재하지 않는 주소를 입력하셨거나,
          </p>
          <p className="text-zinc-400">
            요청하신 주소의 페이지가 변경, 삭제되어 찾을 수 없습니다.
          </p>
        </div>
      </div>
      <div className="mt-10 flex flex-row items-center justify-center">
        <Link href="/">
          <p className="ml-2 mr-2 flex h-12 w-40 items-center justify-center border-2 border-black transition duration-300 hover:bg-zinc-900 hover:text-white">
            메인으로
          </p>
        </Link>
      </div>
    </div>
  );
}

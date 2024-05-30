// 홈 페이지 컴포넌트

'use server';

import Banner from './Banner.tsx';
import Body from './Body.tsx';

async function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <Header />
      <div className="flex h-full w-[20rem] flex-col items-center justify-center sm:w-[30rem] md:w-[42rem] lg:w-[67.5rem]">
        <Body />
      </div>
    </div>
  );
}

export default page;

// 홈 페이지 컴포넌트

'use server';

import Header from './Header.tsx';
import Body from './Body.tsx';

async function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <Header />
      <div className="flex h-full w-96 flex-col items-center justify-center sm:w-[30rem] md:w-[46rem] lg:w-[58rem] xl:w-[67.5rem]">
        <Body />
      </div>
    </div>
  );
}

export default page;

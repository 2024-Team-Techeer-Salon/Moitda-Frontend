// 홈 페이지 컴포넌트

'use server';

import Header from './Header.tsx';
import Body from './Body.tsx';

async function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Header />
      <div className="flex h-full w-[67.5rem] flex-col items-center justify-center">
        <Body />
      </div>
    </div>
  );
}

export default page;

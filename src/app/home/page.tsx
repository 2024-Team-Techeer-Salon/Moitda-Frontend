// 홈 페이지 컴포넌트

'use server';

import HomeHeaderComponent from './homeHeaderComponent.tsx';
import HomeBodyComponent from './homeBodyComponent.tsx';

async function page() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <HomeHeaderComponent />
      <div className="flex flex-col justify-center items-center w-4/6 h-full">
        <HomeBodyComponent />
      </div>
    </div>
  );
}

export default page;

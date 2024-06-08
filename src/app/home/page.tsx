'use server';

import Header from './Header.tsx';
import Distance from './Body.tsx';

async function page() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <Header />
      <div className="mt-10 flex w-full flex-row items-center justify-center p-5 sm:p-5 md:p-2 lg:p-8">
        <Distance />
      </div>
    </div>
  );
}

export default page;

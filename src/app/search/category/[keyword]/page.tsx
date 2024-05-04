/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import Body from './Body.tsx';

async function page(props: any) {
  const searchKeyword = decodeURIComponent(props.params.keyword);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[67.5rem] flex-col items-center justify-start pt-8">
        <div className="flex w-full flex-row items-center justify-start text-2xl">
          <Image
            src="https://i.ibb.co/qNrTSH7/free-icon-exercise-7750230.png"
            width={128}
            height={128}
            alt="arrow-left"
            className="m-6 flex rounded-full border border-gray-300"
          />
          <span className="text-4xl font-bold">#{searchKeyword}</span>
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Body />
        </div>
      </div>
    </div>
  );
}

export default page;

/* eslint-disable react/no-unescaped-entities */
import Body from './Body.tsx';

async function page(props: any) {
  const searchKeyword = decodeURIComponent(props.params.keyword);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[28rem] flex-col items-center justify-start pt-8 sm:w-[28rem] md:w-[42rem] lg:w-[64rem]">
        <div className="flex w-full flex-row items-center justify-center text-2xl">
          <span className="text-4xl font-bold">"{searchKeyword}"&nbsp;</span>
          검색 결과
        </div>
        <div className="flex h-full w-full flex-col items-center justify-center">
          <Body />
        </div>
      </div>
    </div>
  );
}

export default page;

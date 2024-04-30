/* eslint-disable react/no-unescaped-entities */
import Body from './Body.tsx';

async function page(props: any) {
  const searchKeyword = decodeURIComponent(props.params.keyword);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-full w-[67.5rem] flex-col items-center justify-start pt-8">
        <div className="flex w-full flex-row items-center justify-start text-2xl">
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

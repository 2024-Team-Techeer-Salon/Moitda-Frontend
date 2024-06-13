import { mannerStatTranslate } from '@/util/utilFunction.ts';

function MannerStatBar({ mannerStat }: { mannerStat: number }) {
  return (
    <div className="ml-10 mt-2 flex w-full flex-col p-2">
      <div className="flex flex-row">
        <p className="w-full pl-1 text-sm text-black">매너스탯</p>
        <p className="w-full pr-2 text-right text-sm font-semibold">
          {mannerStatTranslate(mannerStat)}
        </p>
      </div>
      <progress className="progress mt-1 h-1" value={mannerStat} max="100" />
    </div>
  );
}

export default MannerStatBar;

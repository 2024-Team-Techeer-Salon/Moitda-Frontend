import ChatList from './ChatList.tsx';
import ChatWindow from './ChatWindow.tsx';

function page() {
  return (
    <div
      className="absolute flex w-full flex-row items-center justify-center overflow-y-hidden"
      style={{ height: 'calc(100% - 5rem)' }} // 채팅창 높이 = 전체 높이 - 헤더 높이(5rem)
    >
      <div className="fix flex h-full w-96 flex-col items-center justify-start border border-r-0 border-zinc-200">
        <ChatList />
      </div>
      <div className="fix flex h-full w-full flex-col items-center justify-start border border-r-0 border-zinc-200">
        <ChatWindow />
      </div>
    </div>
  );
}

export default page;

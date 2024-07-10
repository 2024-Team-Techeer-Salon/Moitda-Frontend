/* eslint-disable import/no-unresolved */
import Image from 'next/image';
import { chatListProps } from '@/types/chat.ts';

// 마지막 채팅 시간을 문자열로 변환하는 함수 ( "yyyy-MM-dd HH:mm:ss" 형식의 문자열을 입력받음 )
function lastTimeStr(lastTime: string) {
  const lastTimeDate = new Date(lastTime);
  const now = new Date();

  const differenceInMinutes = Math.floor(
    (now.getTime() - lastTimeDate.getTime()) / (1000 * 60),
  );

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes}분 전`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours}시간 전`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  return `${differenceInDays}일 전`;
}

// function unreadCountStr(unreadCount: number) {
//   if (unreadCount < 100) {
//     return unreadCount;
//   }
//   return '99+';
// }

function ChatElement({
  titleImage,
  title,
  peopleCount,
  lastTime,
  lastChat,
}: chatListProps) {
  return (
    <div className="flex w-full cursor-pointer flex-row items-center justify-center py-2 hover:bg-zinc-50">
      {/* 대표 이미지 */}
      <div className="m-4 flex h-12 w-12">
        <Image
          src={titleImage}
          width={1024}
          height={1024}
          alt="profile"
          className="relative rounded-full object-cover"
        />
      </div>

      {/* 채팅방 정보 */}
      <div className="flex h-full w-2/3 flex-col items-start justify-center p-2">
        {/* 정보 윗 줄 : 채팅방 이름, 인원수, 시간 */}
        <div className="mb-2 flex w-full items-center justify-start">
          <div className="flex w-2/3 items-center justify-start">
            <span className="text-l truncate font-bold">{title}</span>
            <span className="text-md ml-2 text-zinc-400">{peopleCount}</span>
          </div>
          <div className="flex w-1/3 justify-end p-2 text-right text-sm text-zinc-400">
            {lastTimeStr(lastTime)}
          </div>
        </div>

        {/* 정보 아랫 줄 : 마지막 채팅, 안 읽은 채팅 수 */}
        <div className="flex w-full items-center justify-start">
          <span className="w-5/6 truncate pr-8 text-zinc-400">{lastChat}</span>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black text-[10px] text-white"></span>
        </div>
      </div>
    </div>
  );
}

function ChatList() {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start">
      <ChatElement
        titleImage="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
        title="모각코 할 사람!"
        peopleCount={3}
        lastTime="2024-05-04 18:00:58"
        lastChat="그럼 그 때 봬요!"
      />
      <ChatElement
        titleImage="https://i.ibb.co/556bLCN/image.png"
        title="새로 나온 와퍼 먹으러 가 볼 사람"
        peopleCount={2}
        lastTime="2024-05-03 18:00:58"
        lastChat="후추가 좀 더 있었으면 좋겠어요. 향이 조금 약한게 아쉽네요 ㅠㅠ"
      />
      <ChatElement
        titleImage="https://i.ibb.co/KDg6p1L/image.png"
        title="배드민턴 치러갈 사람"
        peopleCount={16}
        lastTime="2024-05-02 18:00:58"
        lastChat="자리는 어떡하죠?"
      />
    </div>
  );
}

export default ChatList;

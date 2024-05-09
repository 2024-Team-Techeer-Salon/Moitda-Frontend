import { chatProps } from '@/types/chat.ts';
import Image from 'next/image';

function unreaderCountStr(unreaderCount: number) {
  if (unreaderCount < 100) {
    if (unreaderCount === 0) {
      return '';
    }
    return unreaderCount;
  }
  return '99+';
}

function timeStr(time: string) {
  return time.slice(11, 16);
}

// 채팅창 내 나의 채팅
function MyChat({ time, chat, unreaderCount }: chatProps) {
  return (
    <div className="flex w-full flex-row items-end justify-end">
      {/* 채팅 내용 */}
      <div className="mt-2 flex h-full w-2/3 flex-col items-end justify-center p-2">
        {/* 채팅 내용 */}
        <div className="flex w-full flex-row items-center justify-end">
          <div className="mr-2 flex flex-col items-end justify-end">
            <span className="mr-2 text-sm text-zinc-400">
              {unreaderCountStr(unreaderCount)}&nbsp;
            </span>
            <span className="mr-2 text-sm text-zinc-200">{timeStr(time)}</span>
          </div>
          <span className="flex items-center justify-end rounded-2xl bg-black px-4 py-3 text-white">
            {chat}
          </span>
        </div>
      </div>
    </div>
  );
}

// 채팅창 내 상대방 채팅
function OpponentChat({
  profileImage,
  name,
  time,
  chat,
  unreaderCount,
}: chatProps) {
  return (
    <div className="flex w-full flex-row items-start justify-start">
      {/* 프로필 사진 */}
      <div className="m-4 flex h-12 w-12">
        <Image
          src={profileImage}
          width={1024}
          height={1024}
          alt="profile"
          className="relative rounded-2xl border border-zinc-50 object-cover"
        />
      </div>

      {/* 채팅 내용 */}
      <div className="mt-2 flex h-full w-2/3 flex-col items-start justify-center p-2">
        <span className="text-l flex w-full items-center justify-start font-bold">
          {name}
        </span>
        {/* 채팅 내용 */}
        <div className="flex w-full flex-row items-center justify-start">
          <span className="flex items-center justify-start rounded-2xl bg-zinc-100 px-4 py-3">
            {chat}
          </span>
          <div className="ml-2 flex flex-col items-start justify-start">
            <span className="ml-2 text-sm text-zinc-400">
              {unreaderCountStr(unreaderCount)}&nbsp;
            </span>
            <span className="ml-2 text-sm text-zinc-200">{timeStr(time)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex w-full flex-row items-center justify-center">
      <span className="flex w-5/12 border-b border-zinc-200"></span>
      <span className="flex w-1/12 justify-center bg-white text-zinc-200">
        {date.slice(0, 10)}
      </span>
      <span className="flex w-5/12 border-b border-zinc-200"></span>
    </div>
  );
}

function ChatWindow() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {/* 채팅창 헤더 */}
      <div className="flex h-16 w-full flex-row items-center justify-center border-b border-zinc-200 text-xl">
        <span className="font-bold">새로 나온 와퍼 먹으러 갈 사람?</span>
        <span className="text-md ml-2 text-zinc-200">2</span>
      </div>

      {/* 채팅창 */}
      <div className="hide-scrollbar flex h-full w-full flex-col-reverse items-center justify-start overflow-y-auto pt-2">
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 19:55:00"
          chat="후추가 좀 더 있었으면 좋겠어요. 향이 조금 약한게 아쉽네요 ㅠㅠ"
          unreaderCount={1}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 19:55:00"
          chat="그런데"
          unreaderCount={1}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 19:54:00"
          chat="확실히 맛있었어요!"
          unreaderCount={1}
        />
        <MyChat
          time="2024-05-04 19:53:00"
          chat="맛은 어떠셨어요??"
          unreaderCount={0}
          profileImage={''}
          name={''}
        />
        <MyChat
          time="2024-05-04 19:52:00"
          chat="네 잘 들어왔습니다!"
          unreaderCount={0}
          profileImage={''}
          name={''}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 19:50:00"
          chat="잘 들어가셨나요?"
          unreaderCount={0}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 19:35:00"
          chat="아 잘 먹었네요"
          unreaderCount={0}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:05:30"
          chat="좀 이따가 뵈어요!"
          unreaderCount={0}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:05:00"
          chat="네 그러면 지금 바로 나갈게요!"
          unreaderCount={0}
        />
        <MyChat
          time="2024-05-04 18:04:30"
          chat="네 괜찮습니다! 버거킹 송죽 DT점에서 만날까요?"
          unreaderCount={0}
          profileImage={''}
          name={''}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:04:00"
          chat="딱 저녁시간이네요!"
          unreaderCount={0}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:03:30"
          chat="그럼 지금 혹시 시간 괜찮으신가요?"
          unreaderCount={0}
        />
        <MyChat
          time="2024-05-04 18:02:58"
          chat="네 좋아요!"
          unreaderCount={0}
          profileImage={''}
          name={''}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:00:58"
          chat="이번에 버거킹에서 와퍼 새로 나왔대요! 그래서 먹어보고 싶은데 혹시 같이 가실래요?"
          unreaderCount={0}
        />
        <OpponentChat
          profileImage="https://i.ibb.co/7CTsFJF/image.png"
          name="정유진"
          time="2024-05-04 18:00:58"
          chat="안녕하세요! 반갑습니다!"
          unreaderCount={0}
        />
        <DateDivider date="2024-05-04" />
      </div>

      {/* 채팅 입력창 */}
      <div className="m-2 flex h-52 w-[99%] flex-col items-end justify-start rounded-2xl border border-zinc-200">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          className="text-md flex h-3/5 w-full flex-wrap items-center justify-start rounded-full px-4 focus:outline-none"
        />
        <button className="m-4 h-8 w-20 rounded-lg bg-black text-white">
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;

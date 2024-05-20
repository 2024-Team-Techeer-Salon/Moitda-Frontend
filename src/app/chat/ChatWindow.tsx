'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { chatProps } from '@/types/chat.ts';
// import StompJs from '@stomp/stompjs';
import { Client } from '@stomp/stompjs';

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

// 클라이언트
const client: Client = new Client({
  brokerURL: 'ws://localhost:8080/ws',
  connectHeaders: {
    login: 'user',
    passcode: 'password',
  },
  debug: (str: string) => {
    // 디버그 함수를 arrow function으로 변경하고 매개변수에 타입을 지정합니다.
    console.log(str);
  },
  reconnectDelay: 5000, // 자동 재 연결
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

client.onConnect = function (frame) {
  console.log('Connected');
};

client.onStompError = function (frame) {
  console.log('Broker reported error: ' + frame.headers['message']);
  console.log('Additional details: ' + frame.body);
};

client.activate(); // 클라이언트 활성화
// client.deactivate();   // 클라이언트 비활성화

// 메시지 보내기
// client.publish({
//   destination: '/sub/chat/room/1', // 어디로 메세지를 보낼지
//   body: 'Hello world', // 보낼 내용
//   headers: { priority: '9' },
// });

// 메시지 받기
// const subscription = client.subscribe('/pub/chat/room/1', callback);

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
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (client.connected) {
      setMessage(message);
      client.publish({
        destination: '/sub/chat/room/1',
        body: message,
        headers: { priority: '9' },
      });
    } else {
      console.error('STOMP 연결이 되어 있지 않습니다.');
    }
    console.log('Message sent:', message);
  };

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
        <MyChat
          time="2024-05-04 19:53:00"
          chat="맛은 어떠셨어요??"
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
        <DateDivider date="2024-05-04" />
      </div>

      {/* 채팅 입력창 */}
      <div className="m-2 flex h-52 w-[99%] flex-col items-end justify-start rounded-2xl border border-zinc-200">
        <input
          type="text"
          placeholder="메시지를 입력하세요"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="text-md flex h-3/5 w-full flex-wrap items-center justify-start rounded-full px-4 focus:outline-none"
        />
        <button
          className="m-4 h-8 w-20 rounded-lg bg-black text-white"
          onClick={handleSend}
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;

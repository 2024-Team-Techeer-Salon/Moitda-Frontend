/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable no-console */

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as StompJs from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import { chatProps } from '@/types/chat.ts';

export default function ChatRoom() {
  const [chatroomId, setChatroomId] = useState('1');
  const [client, setClient] = useState<any>('');
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState<any>([]); // 채팅 기록
  const [headerName, setHeaderName] = useState('새로 나온 와퍼 먹으러 갈 사람'); // 채팅방 이름

  const userId = useSelector<any>((state) => state.user?.userCode ?? '');
  const [readCount, setReadCount] = useState(1);
  // const [userId, setUserId] = useState('1');
  // const userId = useSelector((state) => {
  //   return state.user.userCode;
  // });
  const [senders, setSenders] = useState('발신자');

  const callback = function (message: { body?: string }) {
    if (message.body) {
      const msg: { [key: string]: any } = JSON.parse(message.body);
      setChatList((chats: any[]) => [...chats, msg]);
    }
  };

  const connect = () => {
    try {
      const clientdata = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          login: '',
          passcode: 'password',
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe('/sub/channels/' + chatroomId, callback);
      };

      // StompError 에러 났을 때
      clientdata.onStompError = function (frame) {
        console.log('Additional details: ', frame.body);
      };

      clientdata.activate();
      setClient(clientdata);
    } catch (err) {
      console.log(err);
    }
  };

  // 클라이언트 연결 해제
  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const sendChat = () => {
    if (chat === '') {
      return;
    }

    client.publish({
      destination: `/sub/chat/room/${chatroomId}`,
      body: JSON.stringify({
        userid: userId,
        sender: senders,
        profile_image: null,
        content: chat,
        send_date: new Date().toISOString(),
      }),
    });

    setChat('');
  };

  useEffect(() => {
    connect();

    return () => disConnect();
  }, []);

  const onChangeChat = (e: any) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  function timeStr(time: string) {
    return time.slice(11, 16);
  }
  // Define MyChat component
  function MyChat({ time, chat, unreaderCount }: chatProps) {
    return (
      <div className="flex w-full flex-row items-end justify-end">
        <div className="mt-2 flex h-full w-2/3 flex-col items-end justify-center p-2">
          <div className="flex w-full flex-row items-center justify-end">
            <div className="mr-2 flex flex-col items-end justify-end">
              <span className="mr-2 text-sm text-zinc-400">
                {unreaderCount}&nbsp;
              </span>
              <span className="mr-2 text-sm text-zinc-200">
                {timeStr(time)}
              </span>
            </div>
            <span className="flex items-center justify-end rounded-2xl bg-black px-4 py-3 text-white">
              {chat}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Define OpponentChat component
  function OpponentChat({
    profileImage,
    name,
    time,
    chat,
    unreaderCount,
  }: chatProps) {
    return (
      <div className="flex w-full flex-row items-start justify-start">
        <div className="m-4 flex h-12 w-12">
          <Image
            src={profileImage}
            width={1024}
            height={1024}
            alt="profile"
            className="relative rounded-2xl border border-zinc-50 object-cover"
          />
        </div>

        <div className="mt-2 flex h-full w-2/3 flex-col items-start justify-center p-2">
          <span className="text-l flex w-full items-center justify-start font-bold">
            {name}
          </span>
          <div className="flex w-full flex-row items-center justify-start">
            <span className="flex items-center justify-start rounded-2xl bg-zinc-100 px-4 py-3">
              {chat}
            </span>
            <div className="ml-2 flex flex-col items-start justify-start">
              <span className="ml-2 text-sm text-zinc-400">
                {unreaderCount}&nbsp;
              </span>
              <span className="ml-2 text-sm text-zinc-200">
                {timeStr(time)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render chat messages using the appropriate component
  const msgBox = chatList.map((item: any, idx: number) => {
    if (Number(item.sender) !== userId) {
      return (
        <OpponentChat
          key={idx}
          profileImage="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
          // profileImage={item.profile_image}
          name={item.sender}
          time={item.send_date}
          chat={item.content}
          unreaderCount={readCount} // 임시
        />
      );
    }
    return (
      <MyChat
        key={idx}
        time={item.send_date}
        chat={item.content}
        unreaderCount={readCount} // 임시
        profileImage={''}
        name={''}
      />
    );
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-16 w-full flex-row items-center justify-center border-b border-zinc-200 text-xl">
        <span className="font-bold">{headerName}</span>
        <span className="text-md ml-2 text-zinc-200">2</span>
      </div>
      <div
        className="hide-scrollbar flex h-full w-full flex-col-reverse justify-start overflow-y-auto pt-2"
        onSubmit={handleSubmit}
      >
        <div>{msgBox}</div>
      </div>

      <div className="m-2 flex h-52 w-[99%] flex-col items-end justify-start rounded-2xl border border-zinc-200">
        <input
          type="text"
          id="msg"
          value={chat}
          placeholder="메시지 보내기"
          onChange={onChangeChat}
          onKeyDown={(ev) => {
            if (ev.keyCode === 13) {
              sendChat();
            }
          }}
          className="text-md flex h-3/5 w-full flex-wrap items-center justify-start rounded-full px-4 focus:outline-none"
        />
        <button
          className="m-4 h-8 w-20 rounded-lg bg-black text-white"
          onClick={sendChat}
        >
          전송
        </button>
      </div>
    </div>
  );
}

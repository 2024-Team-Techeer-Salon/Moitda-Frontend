'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import * as StompJs from '@stomp/stompjs';

export default function ChatRoom() {
  const [chatroomId, setChatroomId] = useState('1');
  const [client, setClient] = useState(null);
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState([]); // 채팅 기록
  const [headerName, setHeaderName] = useState('새로 나온 와퍼 먹으러 갈 사람'); // 채팅방 이름

  // const userId = useSelector((state) => state.user?.userCode ?? '');
  const [userId, setUserId] = useState('1');
  const [senders, setSenders] = useState('발신자');

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

      clientdata.onConnect = function () {
        clientdata.subscribe('/sub/chat/room/' + chatroomId, callback);
      };

      clientdata.onStompError = function (frame) {
        console.log('Broker reported error: ' + frame.headers['message']);
        console.log('Additional details: ' + frame.body);
      };

      clientdata.activate();
      setClient(clientdata);
    } catch (err) {
      console.log(err);
    }
  };

  const disConnect = () => {
    if (client === null) {
      return;
    }
    client.deactivate();
  };

  const callback = function (message) {
    if (message.body) {
      let msg = JSON.parse(message.body);
      setChatList((chats) => [...chats, msg]);
    }
  };

  const sendChat = () => {
    if (chat === '') {
      return;
    }

    client.publish({
      destination: '/sub/chat/room/' + chatroomId,
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

  const onChangeChat = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  function timeStr(time: string) {
    return time.slice(11, 16);
  }
  // Define MyChat component
  function MyChat({ time, chat, unreaderCount }) {
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
  function OpponentChat({ profileImage, name, time, chat, unreaderCount }) {
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
  const msgBox = chatList.map((item, idx) => {
    if (Number(item.sender) !== userId) {
      return (
        <OpponentChat
          key={idx}
          profileImage="https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg"
          name={item.sender}
          time={item.send_date}
          chat={item.content}
          unreaderCount={0} // 임시
        />
      );
    } else {
      return (
        <MyChat
          key={idx}
          time={item.send_date}
          chat={item.content}
          unreaderCount={0} // 임시
        />
      );
    }
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex h-16 w-full flex-row items-center justify-center border-b border-zinc-200 text-xl">
        <span className="font-bold">{headerName}</span>
        <span className="text-md ml-2 text-zinc-200">2</span>
      </div>
      <div
        className="hide-scrollbar flex h-full w-full flex-col-reverse items-center justify-start overflow-y-auto pt-2"
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

/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable curly */
/* eslint-disable no-unused-expressions */
/* eslint-disable nonblock-statement-body-position */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable import/no-unresolved */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import * as StompJs from '@stomp/stompjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCookie } from '../cookies.tsx';
import { chatProps } from '@/types/chat.ts';
import { login } from '@/api/user.ts';
import category from '@/util/category.json';
import { chatlists } from '@/api/chat.ts';

export default function ChatRoom() {
  const [chatroomId, setChatroomId] = useState<number>(1);
  const [client, setClient] = useState<any>('');
  const [chat, setChat] = useState(''); // 입력된 chat을 받을 변수
  const [chatList, setChatList] = useState<any>([]); // 채팅 기록
  const [headerName, setHeaderName] = useState('새로 나온 와퍼 먹으러 갈 사람'); // 채팅방 이름

  const [userId, setUserId] = useState(null);
  const [senders, setSenders] = useState('발신자');

  const callback = function (message: { body?: string }) {
    if (message.body) {
      const msg: { [key: string]: any } = JSON.parse(message.body);
      setChatList((chats: any[]) => [...chats, msg]);
    }
  };

  const connect = async () => {
    try {
      const token = await getCookie('accessToken');
      console.log('쿠키에 저장된 액세스 토큰:', token);

      const clientdata = new StompJs.Client({
        brokerURL: 'ws://localhost:8080/ws',
        connectHeaders: {
          Authorization: `Bearer ${token}`,
        },
        debug(str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        clientdata.subscribe(`/sub/chat/room/${chatroomId}`, callback);
        setClient(clientdata); // 클라이언트 설정 완료 후 상태 업데이트
      };

      // StompError 에러 났을 때
      clientdata.onStompError = function (frame) {
        console.log('Additional details: ', frame.body);
      };

      clientdata.activate();
      // setClient(clientdata);
    } catch (err) {
      console.log(err);
    }
  };

  // 클라이언트 연결 해제
  const disConnect = () => {
    if (client) {
      client.deactivate();
    }
  };

  const sendChat = async () => {
    if (chat === '') {
      return;
    }

    if (!client.connected) {
      console.log('STOMP client is not connected.');
      return;
    }

    //TODO 보내기
    try {
      const token = await getCookie('accessToken');
      // console.log('쿠키에 저장된 액세스 토큰:', token);

      client.publish({
        destination: `/pub/chat/room/${chatroomId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          //   userid: userId,
          // sender: senders,
          //   profile_image:
          //     'https://i.ibb.co/0GtvPDT/Kakao-Talk-Photo-2024-04-17-21-26-58.jpg',
          message: chat,
          type: 1,
          // send_date: new Date().toISOString(),
        }),
      });

      setChat('');
      console.log('쿠키에 저장된 액세스 토큰:', token);
    } catch (error) {
      console.error('Failed to send chat message:', error);
    }
  };

  //TODO 쿠키값
  useEffect(() => {
    const fetchUserId = async () => {
      const getUserId = await login();
      return getUserId;
    };
    fetchUserId().then((data) => {
      if (data.code === 'U003') {
        setUserId(data.data.user_id);
        // console.error('id값 읽기 성공');
      } else {
        console.error('id값 읽기 실패');
      }
    });
  }, []);

  useEffect(() => {
    // setClient('');
    connect();

    return () => disConnect();
  }, []);

  const onChangeChat = (e: any) => {
    setChat(e.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  function timeStr(time: string | any[]) {
    if (!time) {
      return '00:00'; // 기본값을 반환하거나 다른 적절한 값을 반환
    }
    return time.slice(11, 16);
  }

  // 채팅 불러오기

  const roomId = 1; // 필요한 room_id 값 설정
  const pageSize = 32; // 페이지 크기 설정

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['Chat List', roomId],
      queryFn: async ({ pageParam = 0 }) =>
        chatlists(roomId, pageParam, pageSize),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage || lastPage.length === 0) {
          return undefined; // 마지막 페이지일 경우 다음 페이지 파라미터 없음
        }
        return allPages.length; // 다음 페이지 파라미터 설정
      },
      initialPageParam: 0,
    });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage) return; // 다음 페이지가 없으면 아무것도 하지 않음

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // 무한 스크롤 시 다음 페이지 로드
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2,
      },
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current); // 로드 더 링크에 observer 등록

    return () => {
      if (loadMoreRef.current)
        observer.disconnect(); // 컴포넌트가 언마운트될 때 observer 해제
      else;
    };
  }, [hasNextPage, fetchNextPage, loadMoreRef.current]);

  //TODO 스크롤 중복
  // const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  // const [fetchingMore, setFetchingMore] = useState<boolean>(false);

  // const handleScroll = () => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (scrollContainer) {
  //     // 스크롤이 가장 위로 도달했을 때 새로운 페이지를 로드
  //     if (scrollContainer.scrollTop === 0 && !fetchingMore) {
  //       setFetchingMore(true);
  //       console.log('good');
  //       fetchNextPage().then(() => {
  //         setFetchingMore(false);
  //       });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (scrollContainer) {
  //     scrollContainer.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     if (scrollContainer) {
  //       scrollContainer.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, []);

  // 내 채팅
  function MyChat({ time, chat }: chatProps) {
    return (
      <div className="flex w-full flex-row items-end justify-end">
        <div className="mt-2 flex h-full w-2/3 flex-col items-end justify-center p-2">
          <div className="mb-1 flex w-full flex-row items-end justify-end">
            <span className="mr-2 flex h-full flex-col items-end justify-end text-sm text-zinc-200">
              {timeStr(time)}
            </span>
            <span className="flex items-center justify-end rounded-2xl bg-black px-4 py-3 text-white">
              {chat}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 상대 채팅
  function OpponentChat({ profileImage, name, time, chat }: chatProps) {
    return (
      <div className="flex w-full flex-row items-start justify-start">
        <div className="m-4 flex h-12 w-12">
          <Image
            src={profileImage || category.basic_image[4]}
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
          <div className="flex h-full w-full flex-row items-end justify-start">
            <span className="flex items-end justify-start rounded-2xl bg-zinc-100 px-4 py-3">
              {chat}
            </span>
            <span className="mb-1 ml-2  flex flex-col items-end justify-start text-sm text-zinc-200">
              {timeStr(time)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Render chat messages using the appropriate component
  const msgBox = chatList.map((item: any, index: number) => {
    if (userId !== Number(item.userid)) {
      return (
        <OpponentChat
          key={index}
          profileImage={item.profile_image}
          name={item.sender}
          time={item.send_date}
          chat={item.content}
        />
      );
    }
    return (
      <MyChat
        key={index}
        time={item.send_date}
        chat={item.content}
        profileImage={''}
        name={''}
      />
    );
  });

  //TODO 채팅 박스
  function renderChat(data: any, index: number) {
    if (data?.user_id && userId !== Number(data.user_id)) {
      return (
        <OpponentChat
          key={index}
          profileImage={data.profile_image}
          name={data.sender}
          time={data.send_date}
          chat={data.content}
        />
      );
    }
    // return (
    //   <MyChat
    //     key={data.id}
    //     time={data.send_date}
    //     chat={data.content}
    //     profileImage={''}
    //     name={''}
    //   />
    // );
  }

  const msgListBox = data?.pages.map(renderChat);

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
        <div ref={loadMoreRef} />
        <div>
          {msgBox}
          {msgListBox}
          {isFetchingNextPage && <div>Loading...</div>}
        </div>
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

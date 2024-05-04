export interface chatListProps {
  titleImage: string; // 채팅방 이미지 URL
  title: string; // 채팅방 제목
  peopleCount: number; // 채팅방 인원 수
  lastTime: string; // 마지막 채팅 시간
  lastChat: string; // 마지막 채팅 내용
  unreadCount: number; // 읽지 않은 메시지 수
}

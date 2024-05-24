export interface meetingImageProps {
  imageURL: string[];
}

export interface meetingHeaderProps {
  title: string;
  meetingId: number;
  userId: string;
  userName: string;
  userImage: string;
  mannerStat: number;
  categoryId: number;
  address: string;
  place: string;
  addressDetail: string;
  meetingDate: string;
  isOwner: boolean;
  participants: string[];
  endTime: string;
}

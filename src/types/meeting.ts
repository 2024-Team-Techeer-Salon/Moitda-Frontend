export interface bannerImageProps {
  imageURL: {
    imageUrl: string;
  }[];
  endTime: string;
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
  endTime: string;
  isParticipant: boolean;
}

export interface participantsProps {
  meetingId: number;
  participantInfo: {
    userId: number;
    username: string;
    profileImage: string;
  }[];
  applicantInfo: {
    meetingParticipantId: number;
    username: string;
    profileImage: string;
  }[];
  isOwner: boolean;
  isFull: boolean;
}

export interface meetingListProps {
  title: string;
  road_address_name: string;
  meeting_id: number;
  end_time: string;
  category_id: number;
  image_url: string;
}

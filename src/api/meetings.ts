import { formApi, api } from './axios.config.ts';

export const postMeetings = async (
  categoryId: number,
  title: string,
  editorHTML: string,
  placeName: string,
  roadAddressName: string,
  addressDetail: string,
  lat: number,
  lng: number,
  numPeople: number,
  needsApproval: boolean,
  meetingTime: string,
  images: File[],
) => {
  const formData = new FormData();
  formData.append(
    'createMeetingReq',
    new Blob(
      [
        JSON.stringify({
          category_id: categoryId,
          title,
          content: editorHTML,
          place_name: placeName,
          road_address_name: roadAddressName,
          detailed_address: addressDetail,
          latitude: lat,
          longitude: lng,
          max_participants_count: numPeople,
          approval_required: needsApproval,
          appointment_time: meetingTime,
        }),
      ],
      { type: 'application/json' },
    ),
  );
  images.forEach((img) => {
    formData.append('meeting_images', img); // 'meeting_images' 배열 형태로 추가
  });
  try {
    const response = await formApi.post('/meetings', formData);
    return response.data;
  } catch (error) {
    throw new Error('meeting post api request error : ', error || '');
  }
};

export const getMeetingList = async (page: number, size: number) => {
  try {
    const response = await api.get(
      `/meetings/search/latest?page=${page}&size=${size}`,
    );
    return response.data;
  } catch (error) {
    throw new Error('meeting list get api request error : ', error || '');
  }
};

export const getMeetingsData = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data.data;
  } catch (error) {
    throw new Error('meeting data get api request error : ', error || '');
  }
};

export const postMeetingJoin = async (meetingId: number) => {
  try {
    const response = await api.post(`/meetings/participant/${meetingId}`);
    return response.data;
  } catch (error) {
    throw new Error('meeting join post api request error : ', error || '');
  }
};

export const patchEndMeeting = async (meetingId: number) => {
  try {
    const response = await api.patch(`/meetings/end/${meetingId}`);
    return response.data;
  } catch (error) {
    throw new Error('meeting end patch api request error : ', error || '');
  }
};

export const deleteMeeting = async (meetingId: number) => {
  try {
    const response = await api.delete(`/meetings/${meetingId}`);
    return response.data;
  } catch (error) {
    throw new Error('meeting delete api request error : ', error || '');
  }
};

export const editMeeting = async (
  meetingId: number,
  categoryId: number,
  title: string,
  editorHTML: string,
  placeName: string,
  roadAddressName: string,
  addressDetail: string,
  numPeople: number,
  meetingTime: string,
) => {
  try {
    const response = await api.put(`/meetings/${meetingId}`, {
      category_id: categoryId,
      title,
      content: editorHTML,
      place_name: placeName,
      road_address_name: roadAddressName,
      detailed_address: addressDetail,
      max_participants_count: numPeople,
      appointment_time: meetingTime,
    });
    return response.data;
  } catch (error) {
    throw new Error('meeting edit api request error : ', error || '');
  }
};

export const getMeetingApplicants = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/${meetingId}/participants`);
    return response.data.data;
  } catch (error) {
    throw new Error('meeting applicants get api request error : ', error || '');
  }
};

export const patchMeetingApproval = async (
  participantId: number,
  meetingId: number,
  isApproval: boolean,
) => {
  try {
    const response = await api.patch('/meetings/participant', {
      participant_id: participantId,
      meeting_id: meetingId,
      is_approval: isApproval,
    });
    return response.data;
  } catch (error) {
    throw new Error('meeting approval patch api request error : ', error || '');
  }
};

export const postMeetingReview = async (
  meetingId: number,
  reviews: {
    userId: number;
    rating: number;
  }[],
) => {
  try {
    const response = await api.post('/meetings/reviews', {
      meeting_id: meetingId,
      reviews,
    });
    return response.data;
  } catch (error) {
    throw new Error('meeting review post api request error : ', error || '');
  }
};

// 리뷰 참여 여부 확인
export const getReviewParticipation = async (meetingId: number) => {
  try {
    const response = await api.get(`/meetings/reviews/${meetingId}`);
    return response.data;
  } catch (error) {
    throw new Error(
      'meeting review participation get api request error : ',
      error || '',
    );
  }
};

import instance from '@/lib/apis/axios';
import { ActivityResponse as ActivityDetailResponse } from '@/types/activityDetailPageTypes';
import { ActivityReviewsResponse } from '@/types/activityReviewTypes';
import { ActivityResponse } from '@/types/activityTypes';
import {
  ReservationDetailsResponse,
  ReservationStatusResponse,
} from '@/types/get/ReservationDashboardPageGetTypes';
import { MyReservationsResponse } from '@/types/get/reservationTypes';
import { MyActivityListResponse } from '@/types/myActivitiesTypes';
import {
  MyActivitiesResponse,
  ReservationDashboardResponse,
} from '@/types/page/ReservationDashboardPageTypes';

export const getMyActivities = async (): Promise<{
  data: MyActivitiesResponse;
}> => {
  const response = await instance.get<MyActivitiesResponse>('/my-activities');
  return { data: response.data };
};

export const getReservationDashboard = async (
  activityId: number,
  year: string,
  month: string,
): Promise<{ data: ReservationDashboardResponse[] }> => {
  const response = await instance.get<ReservationDashboardResponse[]>(
    `/my-activities/${activityId}/reservation-dashboard`,
    {
      params: { year, month },
    },
  );
  return { data: response.data };
};

// 예약 상세 조회
export const getActivityDetail = async (
  activityId: number,
): Promise<{ data: ActivityDetailResponse }> => {
  const response = await instance.get<ActivityDetailResponse>(
    `/activities/${activityId}`,
  );
  return { data: response.data };
};

// 체험 상세 조회
export const getActivity = async (
  activityId: number,
): Promise<{ data: ActivityResponse }> => {
  const response = await instance.get<ActivityResponse>(
    `/activities/${activityId}`,
  );
  return { data: response.data };
};

// 특정 날짜에 등록된 예약 상태를 조회한다. 신청, 승인, 거절...
export const getReservationStatus = async (
  activityId: number,
  date: string,
): Promise<{ data: ReservationStatusResponse[] }> => {
  const response = await instance.get<ReservationStatusResponse[]>(
    `/my-activities/${activityId}/reserved-schedule`,
    {
      params: { date },
    },
  );
  return { data: response.data };
};

// 특정 날짜의 예약자 정보를 조회한다. 닉네임, 인원수...
export const getReservationDetails = async ({
  activityId,
  scheduleId,
  status,
  cursorId,
  size,
}: {
  activityId: number;
  scheduleId: number;
  status: string;
  cursorId?: number;
  size?: number;
}): Promise<{ data: ReservationDetailsResponse }> => {
  const response = await instance.get<ReservationDetailsResponse>(
    `/my-activities/${activityId}/reservations`,
    {
      params: {
        cursorId,
        size,
        scheduleId,
        status,
      },
    },
  );
  return { data: response.data };
};

/**
 * 주소를 좌표로 변환하는 함수
 * @param address - 변환할 주소
 * @returns { lat: number, lng: number } - 좌표 또는 오류 발생 시 null
 */
export const geocodeAddress = async (address: string) => {
  try {
    // 카카오 주소 검색 API 요청
    const response = await instance.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(address)}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
        },
      },
    );

    const data = response.data;

    if (data.documents.length > 0) {
      // 첫 번째 주소 좌표 추출
      const { x: lng, y: lat } = data.documents[0].address;
      return { lat: parseFloat(lat), lng: parseFloat(lng) };
    }
  } catch (error) {
    console.error('주소-좌표 변환 중 에러가 발생했습니다.', error);
  }
};

// 체험 상세 리뷰 조회
export const getActivityReview = async (activityId: number, page: number) => {
  const response = await instance.get<ActivityReviewsResponse>(
    `/activities/${activityId}/reviews`,
    {
      params: { page },
    },
  );
  return response.data;
};

export const getActivities = async (
  cursorId: string | null = null,
): Promise<MyActivityListResponse> => {
  const response = await instance.get('/my-activities', {
    params: {
      size: 10,
      cursorId,
    },
  });
  return response.data;
};

export const getMyReservations = async (
  cursorId: string | null = null,
  status: string | null = null,
): Promise<MyReservationsResponse> => {
  const response = await instance.get('/my-reservations', {
    params: {
      size: 10,
      status,
      cursorId,
    },
  });
  return response.data;
};

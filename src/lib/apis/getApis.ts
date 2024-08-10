import instance from '@/lib/apis/axios';
import { ActivityResponse as ActivityDetailResponse } from '@/types/activityDetailPageTypes';
import { ActivityResponse } from '@/types/activityTypes';
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
